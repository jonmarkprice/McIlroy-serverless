// PORT registration here
// IDEA: try to *import* a function defined elsewhere, e.g. in dist/
// from webpack...
'use strict';

const React = require('react');
const { renderToString } = require('react-dom/server');
const LoginPage = require('../../lib/components/LoginPage');

// TODO: do the same a mcilroy..?
// McIlroy EB used req.flash and I passed {flash: ...} into 
// window.__INITIAL_STATE__ just as one would do with Redux.
const page = React.createElement(LoginPage, null, null);
const appHtml = renderToString(page);

/* // Old version
const html = `
    <h1>SSR Test</h1>
    <form>
        <input type="text" name="test" />
    </form>`;
*/

module.exports = () => 
`<!DOCTYPE html>
<html>
  <head>
    <title>McIlroy</title>
    <link rel="stylesheet" href="https://mcilroy.s3-us-west-1.amazonaws.com/index.css" />
    
    <!-- Render these from renderPage -->
    <!-- <link rel="stylesheet" href="..." /> -->
  </head>
  <body>
    ${appHtml}
  </body>
</html>`;
