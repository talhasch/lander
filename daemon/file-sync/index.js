const {Client: PGClient} = require('pg');
const {MongoClient} = require('mongodb');
const axios = require('axios');

['MONGO_URL', 'PG_URL'].forEach(x => {
  if (!process.env[x]) {
    console.error(x + ' environment variable required!');
    process.exit(1);
  }
});

const appOrigin = 'https://landr.me';
const publishedFile = 'lander.public.file.db.json';

const {MONGO_URL, PG_URL} = process.env;

let pgClient;
let mgColl;

const init = async () => {
  pgClient = new PGClient({connectionString: PG_URL});
  await pgClient.connect();
  console.log('Connected to postgres');

  const mgClient = await MongoClient.connect(MONGO_URL, {useUnifiedTopology: true});
  const mgDb = mgClient.db(mgClient.s.options.dbName);
  mgColl = mgDb.collection('radiks-server-data');

  console.log('Connected to mongo');
};

const getUsers = async (uDate) => {
  const filter = {radiksType: 'BlockstackUser', updatedAt: {'$gt': uDate}};
  return await mgColl.find(filter).sort({updatedAt: 1}).limit(10).toArray();
};


const getMinDate = async () => {
  const sql = 'SELECT updated FROM file_cache ORDER BY updated DESC LIMIT 1';
  return await pgClient.query(sql).then(r => {
    const [row,] = r.rows;
    return Number(row && row.updated ? row.updated : 0);
  });
};

const worker = async () => {
  const minDate = await getMinDate();
  const users = await getUsers(minDate);

  pgClient.query('BEGIN');

  for (let row of users) {
    if (!(row.profile.apps && row.profile.apps[appOrigin])) {
      console.info(row.username + ': app definition not found');
      continue;
    }

    const url = row.profile.apps[appOrigin] + publishedFile;
    let contents;

    try {
      contents = await axios.get(url).then(x => x.data);
    } catch (e) {
      console.error(row.username + ': ' + String(e));
      continue;
    }

    // More than 1 user with same file can be exists due to https://github.com/blockstack/radiks/issues/61
    await pgClient.query('DELETE FROM file_cache WHERE url=$1', [url]);
    await pgClient.query('INSERT INTO file_cache (url, contents, updated) VALUES ($1, $2, $3)', [url, contents, row.updatedAt]);

    console.log(row.username + ': ok');
  }

  try {
    await pgClient.query('COMMIT');
  } catch (e) {
    await pgClient.query('ROLLBACK');
    throw e
  }

  // If there is nothing new then wait some
  if (users.length === 0) {
    await new Promise(r => setTimeout(r, 1000));
  }

  await worker();
};

const main = async () => {
  await init();
  await worker();
  return null;
};

main().catch((e) => {
  console.error(String(e));
}).finally(() => {
  console.log("Shutting down");
  process.exit(1);
});
