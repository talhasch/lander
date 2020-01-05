import path from 'path';

import fs from 'fs';

import express from 'express';

import {aliasRe, publishedFile} from '../src/constants';

import isRealUsername from '../src/helper/is-real-username';

import {getUsernameFromAlias, getBucketUrl, getFileContents, getUserAppFileUrl} from './db';

const indexHtml = fs.readFileSync(path.resolve('./build-live/index.html'), 'utf8');

const PORT = 3000;
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("can't-be-evil", 'true');
  next();
});

const router = express.Router();

router.use('^/favicon.ico$', (req, res) => {
  res.send('ok');
});

const robotsTxt = fs.readFileSync(path.resolve('./robots.txt'), 'utf8');
router.use('^/robots.txt', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(robotsTxt);
  res.end();
});

router.use('^/sitemap.xml', (req, res) => {
  const resp = fs.readFileSync(path.resolve('./sitemap.xml'), 'utf8');
  res.header('Content-Type', 'text/xml');
  res.send(resp);
});

const manifestJson = JSON.parse(fs.readFileSync(path.resolve('./build-live/manifest.json'), 'utf8'));
router.use('^/manifest.json', (req, res) => {
  res.json(manifestJson);
});

const reservedUserJson = JSON.parse(fs.readFileSync(path.resolve('./build-live/reserved-user-names.json'), 'utf8'));
router.use('^/reserved-user-names.json', (req, res) => {
  res.json(reservedUserJson);
});

const showcaseJSON = JSON.parse(fs.readFileSync(path.resolve('./build-live/showcase.json'), 'utf8'));
router.use('^/showcase.json', (req, res) => {
  res.json(showcaseJSON);
});


const escape = (s) => {
  return s.replace(/</g, '&lt;').replace(/>/g, '&ht;');
};

const prepareMeta = (title, description, url, image) => {
  const items = [];

  items.push(`<title>${title}</title>`);
  items.push(`<meta property="og:title" content="${escape(title)}"/>`);
  items.push(`<meta name="twitter:title" content="${escape(title)}"/>`);

  items.push(`<meta name="description" content="${escape(description)}">`);
  items.push(`<meta property="og:description" content="${escape(description)}"/>`);
  items.push(`<meta name="twitter:description" content="${escape(description)}"/>`);

  if (image) {
    items.push(`<meta property="og:image" content="${escape(image)}"/>`);
    items.push(`<meta name="twitter:image" content="${escape(image)}"/>`);
    items.push(`<meta itemprop="image" content="${escape(image)}"/>`);
  }

  items.push(`<link rel="canonical" href="${escape(url)}" />`);
  items.push(`<meta property="og:url" content="${escape(url)}"/>`);
  items.push(`<meta property="og:site_name" content="Lander"/>`);
  items.push(`<meta name="twitter:card" content="summary_large_image"/>`);

  return items.join('');
};

const defaultRenderer = (req, res) => {

  const title = 'Lander';
  const description = 'Your personal home page on decentralized internet';
  const url = 'https://landr.me';
  const image = 'https://landr.me/images/og.jpg';
  const metas = prepareMeta(title, description, url, image);

  const resp = indexHtml.replace('<meta name="replace" content="here">', metas);

  res.send(resp);
};

router.use(['^/$', '^/app/auth/?$', '^/app/welcome/?$', '^/app/editor/?$'], defaultRenderer);

const pageRenderer = async (req, res) => {
  const {username} = req.params;

  // Alias check
  if (aliasRe.test(username)) {
    const realUsername = await getUsernameFromAlias(username);
    if (realUsername) {
      res.redirect(`/${realUsername}`);
    } else {
      res.send(indexHtml);
    }
    return;
  }

  let fileUrl;

  if (isRealUsername(username)) {
    // Handle blockstack ids
    fileUrl = await getUserAppFileUrl(username);
  } else {
    // Handle non-username accounts
    const bUrl = await getBucketUrl(username);

    if (bUrl) {
      fileUrl = `${bUrl}${publishedFile}`;
    } else {
      res.send(indexHtml);
      return;
    }
  }

  const published = await getFileContents(fileUrl);

  if (!published) {
    res.send(indexHtml);
    return;
  }

  const {name, photo} = published;
  let {description} = published;
  if (!description) {
    description = `${name}'s personal home page`;
  }

  const title = `${name} | Lander`;
  const url = `https://landr.me/${username}`;
  const metas = prepareMeta(title, description, url, photo);
  const script = `<script>window.__p = ${escape(JSON.stringify(published))}</script>`;
  const inject = `${metas}${script}`;

  const resp = indexHtml.replace('<meta name="replace" content="here">', inject);

  res.send(resp);
};

router.use('^/:username/?$', pageRenderer);

router.use(
  express.static(path.resolve(__dirname, '..', 'build-live'), {maxAge: '30d'})
);

app.use(router);
app.disable('x-powered-by');

app.listen(PORT, '127.0.0.1', () => {
  console.log(`SSR running on port ${PORT}`);
});
