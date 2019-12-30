const path = require('path');
const fs = require('fs');
const blockStack = require('blockstack');
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');

const baseUrl = 'https://landr.me';
const publishedFile = 'lander.public.file.db.json';

if (!process.env.MONGO_URL) {
  console.error('MONGO_URL environment variable required!');
  process.exit(1);
}

const {MONGO_URL} = process.env;

const getData = async () => {
  const client = await MongoClient.connect(MONGO_URL, {useUnifiedTopology: true});
  const db = client.db(client.s.options.dbName);

  const collection = db.collection('radiks-server-data');
  return await collection.find({radiksType: 'BlockstackUser'}).toArray();
};


const findUser = async (username) => {
  let file;

  try {
    file = await blockStack.getUserAppFileUrl(publishedFile, username, baseUrl);
    // can be null
    if (!file) {
      return;
    }
  } catch (e) {
    console.error(String(e));
    return;
  }

  let resp;
  try {
    resp = await axios.get(file);

    // deleted by user
    if (resp.data === '') {
      return;
    }
  } catch (e) {
    console.error(String(e));
    return;
  }

  return {username, lastMod: resp.headers['last-modified'] || null}
};

const findUsers = async () => {
  const data = await getData();
  const allNames = data.map(x => x.username).filter(x => x);
  let rv = [];


  while (allNames.length > 0) {
    const names = allNames.splice(0, 4);
    const promises = names.map(x => findUser(x));

    const resp = await Promise.all(promises);
    rv = [...rv, ...resp.filter(x => x)]
  }

  return rv;
};


const main = () => {
  findUsers().then(list => {

    const urls = [];

    for (let item of list) {
      const url = 'https://landr.me/' + item.username;
      const lastMod = new Date(item.lastMod).toISOString();

      const u = '<url>' +
        '<loc>' + url + '</loc>' +
        '<lastmod>' + lastMod + '</lastmod>' +
        '<changefreq>weekly</changefreq>' +
        '<priority>0.9</priority>' +
        '</url>';

      urls.push(u);
    }

    const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      urls.join('') +
      '</urlset>';

    const savePath = path.join(__dirname, '..', '..', 'sitemap.xml');
    fs.writeFileSync(savePath, xml);

    console.log('ok');
    process.exit(0);
  })
};

main();

