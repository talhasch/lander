import path from 'path';
import fs from 'fs';

import express from 'express';
import * as blockStack from 'blockstack';
import * as axios from 'axios';

import {aliasRe, publishedFile} from '../src/constants';

import isRealUsername from '../src/helper/is-real-username';

const indexHtml = fs.readFileSync(path.resolve('./build-live/index.html'), 'utf8');
const manifestJson = fs.readFileSync(path.resolve('./build-live/manifest.json'), 'utf8');
const reservedUserJson = fs.readFileSync(path.resolve('./build-live/reserved-user-names.json'), 'utf8');

const getBaseUrl = (req) => {
  return (req.get('x-from-nginx') ? 'https' : 'http') + '://' + req.get('host');
};

const PORT = 3000;
const app = express();

if (!process.env.RADIKS_URL) {
  console.error('RADIKS_URL environment variable required!');
  process.exit(1);
}
const radiskUrl = process.env.RADIKS_URL;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("can't-be-evil", 'true');
  next();
});

const router = express.Router();

router.use('^/favicon.ico$', (req, res, next) => {
  res.send('ok');
});

router.use('^/manifest.json', (req, res, next) => {
  res.send(manifestJson);
});

router.use('^/reserved-user-names.json', (req, res, next) => {
  res.send(reservedUserJson);
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

  // Alias check
  if (aliasRe.test(username)) {
    const u = `${radiskUrl}/radiks/models/find?alias=${username}&radiksType=alias&sort=createdAt`;

    try {
      const resp = await axios.get(u).then(x => x.data);
      if (resp.total > 0) {
        // Redirect to real username
        res.redirect(`/${resp.results[0].username}`);
        return;
      }
    } catch (e) {
      res.send(indexHtml);
      return;
    }
  }

  let fileUrl;

  if (isRealUsername(username)) {
    fileUrl = await blockStack.getUserAppFileUrl(publishedFile, username, getBaseUrl(req));
  } else {
    const u = `${radiskUrl}/radiks/models/find?username=${username}&radiksType=user_bucket_url&sort=createdAt`;
    try {
      const resp = await axios.get(u).then(x => x.data);
      if (resp.total > 0) {
        fileUrl = `${resp.results[0].url}${publishedFile}`;
      }
    } catch (e) {
      res.send(indexHtml);
      return;
    }
  }

  try {
    const published = await axios.get(fileUrl).then(x => x.data);

    const {name, photo} = published;

    const title = `${name} - Lander`;
    const description = `${name}'s personal home page`;
    const url = `https://landr.me/${username}`;
    const metas = prepareMeta(title, description, url, photo);
    const script = `<script>window.__p = ${JSON.stringify(published)}</script>`;
    const inject = `${metas}${script}`;

    const resp = indexHtml.replace('<meta name="replace" content="here">', inject);

    res.send(resp);
    return;

  } catch (e) {
    // Client side will handle 404
    // res.status(404).send('404 - Not found');
  }

  res.send(indexHtml);
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
