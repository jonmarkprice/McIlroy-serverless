// PORT registration here
// IDEA: try to *import* a function defined elsewhere, e.g. in dist/
// from webpack...
'use strict';

// XXX DEPRECATED
// const { renderToString } = require('react-dom/server');

const React = require('react');
const renderPage = require('../renderPage');
const LoginPage = require('../../lib/components/LoginPage');

// TODO: do the same a mcilroy..?
// McIlroy EB used req.flash and I passed {flash: ...} into 
// window.__INITIAL_STATE__ just as one would do with Redux.

// TODO: this will need state as well eventually
const page = React.createElement(LoginPage, null, null);
// const appHtml = renderToString(page);

/* // Old version
const html = `
    <h1>SSR Test</h1>
    <form>
        <input type="text" name="test" />
    </form>`;
*/

const component = page;
const styles = ['common', 'banner', 'form', 'login', 'flash'];
const state = {flash: null};

module.exports = () => 
  // TODO use param. object!
  renderPage(
    component,          // component
    'Log In - McIlroy', // title
    'login',            // css
    styles,
    state);
/*
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
*/

