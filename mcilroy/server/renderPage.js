const { renderToString } = require('react-dom/server');
const PropTypes = require('prop-types');
const dbg = require('debug')('routes:render-page');

const stringify = s => JSON.stringify(s).replace(/</g, '\\u003c');

const { S3_URL } = process.env;

const optTypes = {
  title: PropTypes.string,
  bundles: PropTypes.array,
  stylesheets: PropTypes.array,
  state: PropTypes.object
};

function renderPage(element, opts) {
  // Check prop types
  PropTypes.checkPropTypes(optTypes, opts, 'option', 'renderPage');

  const title = (opts.title !== undefined) ? opts.title : 'McIlroy';

  const stylesheets = opts.stylesheets || [];
  const links = stylesheets.map(name => 
    `<link rel="stylesheet" href="${S3_URL}/styles/${name}.css" />`
  );

  const html = renderToString(element);

  const bundles = opts.bundles || [];
  const scripts = bundles.map(name => // need type=text/js?
    `<script src="${S3_URL}/scripts/${name}.bundle.js"></script>`
  );

  const preloaded = (opts.state !== undefined)
    ? `<script type="text/javascript">
        window.__PRELOADED_STATE__ = ${stringify(opts.state)}
      </script>`
    : '';

  dbg("INITIAL STATE:");
  dbg(stringify(opts.state));

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      ${links.join('')}
    </head>
    <body>
      <div id="app">${html}</div>
      ${preloaded}
      ${scripts.join('')}
    </body>
  </html>`;
}

module.exports = renderPage;
