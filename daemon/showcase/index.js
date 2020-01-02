const {Client: PGClient} = require('pg');
const {MongoClient} = require('mongodb');

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


const getUsers = async () => {
  const filter = {radiksType: 'BlockstackUser'};
  return await mgColl.find(filter).toArray();
};


const worker = async () => {
  const users = await getUsers();
  const urlList = [];

  for (let row of users) {
    // ignore non-username accounts
    if (!row.username) {
      continue;
    }

    // app definition not found
    if (!(row.profile.apps && row.profile.apps[appOrigin])) {
      continue;
    }

    const fileUrl = row.profile.apps[appOrigin] + publishedFile;

    const res = await pgClient.query('SELECT updated, contents FROM file_cache WHERE url=$1 LIMIT 1', [fileUrl]);
    const [r,] = res.rows;

    // file not found for the user
    if (!r) {
      continue;
    }

    // not published
    if (!r.contents) {
      continue;
    }

    const data = JSON.parse(r.contents);
    let eligible = Object.values(data.accounts).filter(x => x).length > 1 &&
      data.photo &&
      data.bg.image !== 'wave.jpg' &&
      data.description.length > 10;

    if (!eligible) {
      continue;
    }

    console.log({
      username: row.username,
      name: data.name,
      description: data.description,
      photo: data.photo,
      url: 'https://landr.me/' + row.username
    })
  }
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
