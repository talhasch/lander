const path = require('path');
const fs = require('fs');
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

    const url = appOrigin + '/' + row.username;
    const lastMod = new Date(Number(r.updated)).toISOString();

    urlList.push({url, lastMod});
  }

  const strUrls = urlList.map(x => '<url>' +
    '<loc>' + x.url + '</loc>' +
    '<lastmod>' + x.lastMod + '</lastmod>' +
    '<changefreq>weekly</changefreq>' +
    '<priority>0.9</priority>' +
    '</url>').join('');


  const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + strUrls + '</urlset>';

  const savePath = path.join(__dirname, '..', '..', 'sitemap.xml');
  fs.writeFileSync(savePath, xml);
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
