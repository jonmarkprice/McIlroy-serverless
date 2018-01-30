const { renderToString } = require('react-dom/server');
const { urls } = require('../aws-config');
const dbg = console.log;
// const dbg = require('debug')('routes:helpers');

const stringify = s => JSON.stringify(s).replace(/</g, '\\u003c');

// TODO: Use an arguments object -- 5 arguments is probably too many...
function renderPage(element, title, bundle = null, stylesheets = [], preloaded = null) {
  const links = stylesheets.map(
    name => `<link rel="stylesheet" href=${urls.s3}/styles/${name}.css />`
  );
  const html = renderToString(element);
  const script = (bundle !== null)
    ? `<script type="text/javascript" src="${urls.s3}/scripts/${bundle}.bundle.js"></script>`
    : ''; 
  const state = (preloaded !== null)
    ? `<script type="text/javascript">
        window.__PRELOADED_STATE__ = ${stringify(preloaded)}
      </script>`
    : '';

  dbg("element %O", element);
  dbg("rendered: %O", html);
  
  dbg('preloaded %o', preloaded);
  dbg('state %o', state)

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links.join('\n')}
    </head>
    <body>
      <div id="app">${html}</div>
      ${state}
      ${script}
    </body>
  </html>`;
}

module.exports = renderPage;
