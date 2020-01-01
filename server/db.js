const {Pool} = require('pg');
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

const pgClient = new Pool({connectionString: PG_URL});

let mongoColl;

MongoClient.connect(MONGO_URL, {useUnifiedTopology: true}).then((client) => {
  const db = client.db(client.s.options.dbName);
  mongoColl = db.collection('radiks-server-data');

});

export const getUserAppFileUrl = async (username) => {
  const filter = {radiksType: 'BlockstackUser', username};
  const resp = await mongoColl.find(filter).limit(1).toArray();
  if (resp.length === 0) {
    return null
  }

  const row = resp[0];

  if (!(row.profile.apps && row.profile.apps[appOrigin])) {
    return null;
  }

  return row.profile.apps[appOrigin] + publishedFile;
};

export const getUsernameFromAlias = async (alias) => {
  const filter = {radiksType: 'alias', alias};
  const resp = await mongoColl.find(filter).sort({createdAt: 1}).limit(1).toArray();
  return resp.length > 0 ? resp[0].username : null;
};

export const getBucketUrl = async (username) => {
  const filter = {radiksType: 'user_bucket_url', username};
  const resp = await mongoColl.find(filter).sort({createdAt: 1}).limit(1).toArray();
  return resp.length > 0 ? resp[0].url : null;
};

export const getFileContents = async (url) => {
  const resp = await pgClient.query('SELECT contents FROM file_cache WHERE url=$1', [url]);
  if (resp.rows.length === 0) {
    return null;
  }

  return JSON.parse(resp.rows[0].contents);
};
