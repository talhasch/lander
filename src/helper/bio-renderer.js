const Remarkable = require('remarkable');
const sanitizeHtml = require('sanitize-html');

const md = new Remarkable({html: true, breaks: true, linkify: true});

export default (input) => {
  const rendered = md.render(input);

  const sanitized = sanitizeHtml(rendered, {
    allowedTags: ['b', 'strong', 'iframe', 'i', 'em', 'a', 'p', 'br'],
    allowedAttributes: {
      'a': ['href'],
      'iframe': ['src', 'frameborder', 'allowfullscreen', 'width', 'height'],
    },
    allowedSchemes: ['https'],
    transformTags: {
      'iframe': function (tagName, attribs) {

        const emptyEl = {
          tagName: 'span',
          attribs: {}
        };

        const src = attribs.src ? attribs.src : null;
        if (!src) {
          return emptyEl;
        }

        if (src.indexOf('https://') !== 0) {
          return emptyEl;
        }

        let u;
        try {
          u = new URL(src);
        } catch (e) {
          return emptyEl;
        }

        const allowedHosts = ['www.youtube.com', 'youtube.com', 'player.vimeo.com',
          'www.dailymotion.com', 'dailymotion.com'];

        if (!allowedHosts.includes(u.host)
        ) {
          return emptyEl;
        }

        const attr = Object.assign({}, attribs, {width: '100%', height: '200px'});

        return {
          tagName: 'iframe',
          attribs: attr
        };
      }
    }
  });

  return sanitized.trim();
}