import path from 'path';
import fs from 'fs';

import express from 'express';
import * as blockStack from 'blockstack';
import * as axios from 'axios';

import {publishedFile} from '../src/constants';

const indexHtml = fs.readFileSync(path.resolve('./build/index.html'), 'utf8');
const manifestJson = fs.readFileSync(path.resolve('./build/manifest.json'), 'utf8');

const getBaseUrl = (req) => {
  return req.protocol + '://' + req.get('host');
};

const PORT = process.env.SERVER_PORT || 80;
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const router = express.Router();

router.use('^/favicon.ico$', (req, res, next) => {
  res.send('ok');
});

router.use('^/manifest.json', (req, res, next) => {
  res.send(manifestJson);
});

const prepareMeta = (title, description, url, image) => {
  const items = [];

  items.push(`<title>${title}</title>`);
  items.push(`<meta property="og:title" content="${title}"/>`);
  items.push(`<meta name="twitter:title" content="${title}"/>`);

  items.push(`<meta name="description" content="${description}">`);
  items.push(`<meta property="og:description" content="${description}"/>`);
  items.push(`<meta name="twitter:description" content="${description}"/>`);

  if (image) {
    items.push(`<meta property="og:image" content="${image}"/>`);
    items.push(`<meta name="twitter:image" content="${image}"/>`);
    items.push(`<meta itemprop="image" content="${image}"/>`);
  }

  items.push(`<link rel="canonical" href="${url}" />`);
  items.push(`<meta property="og:url" content="${url}"/>`);
  items.push(`<meta property="og:site_name" content="Lander"/>`);
  items.push(`<meta name="twitter:card" content="summary_large_image"/>`);

  return items.join('');
};
const defaultRenderer = (req, res, next) => {

  const title = 'Lander';
  const description = 'Your personal home page on decentralized internet';
  const url = 'https://landr.me';
  const image = 'https://landr.me/images/og.jpg';
  const metas = prepareMeta(title, description, url, image);

  const resp = indexHtml.replace('<meta name="replace" content="here">', metas);

  res.send(resp);
};

router.use(['^/$', '^/app/auth/?$', '^/app/welcome/?$', '^/app/editor/?$'], defaultRenderer);

const pageRenderer = async (req, res, next) => {
  const {username} = req.params;

  let fileUrl;
  let published;

  try {
    fileUrl = await blockStack.getUserAppFileUrl(publishedFile, username, getBaseUrl(req));
  } catch (e) {
    res.status(404).send('404 - Not found');
    return;
  }

  try {
    published = await axios.get(fileUrl).then(x => x.data);
  } catch (e) {
    res.status(404).send('404 - Not found');
    return;
  }

  const {name, photo} = published;

  const title = `${name} - Lander`;
  const description = `${name}'s personal home page`;
  const url = `https://landr.me/${username}`;
  const metas = prepareMeta(title, description, url, photo);

  const resp = indexHtml.replace('<meta name="replace" content="here">', metas);

  res.send(resp);
};

router.use('^/:username/?$', pageRenderer);

router.use(
  express.static(path.resolve(__dirname, '..', 'build'), {maxAge: '30d'})
);

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
});