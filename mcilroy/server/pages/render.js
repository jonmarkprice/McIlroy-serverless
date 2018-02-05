'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
// const dbg = require('debug')('render');
const { Provider } = require('react-redux');

// TODO: rename from index to app, or something
const reducer = require('../../commmon/reducers/appRoot');

// TODO: these will all need to change
// const configureStore  = require('../../lib/configureStore');
const configureStore = require('../../common/configureStore');

// const Interpretter    = require('../../lib/containers/Interpretter');
const Interpretter = require('../../common/containers/Interpretter');

// Each of these paths was ../../lib/* instead of ../../commmon/*.
const { pushInput }   = require('../../common/actions/input');
const { addProgram }  = require('../../common/actions/saved');
const { login }       = require('../../common/actions/user');

function setup(username) {
  // TODO: this is a *different* configure store
  const store = configureStore(reducer, undefined); 
  // Start with undefined, so get from individual reducers.

  // Dispatch some actions
  store.dispatch(pushInput({
    label : '1',
    data  : 1
  }));
  store.dispatch(pushInput({
    label : '[1, 2, 3, 4]',
    data  : [1, 2, 3, 4]
  }));
  store.dispatch(pushInput({
    label : '[true, false]',
    data  : [true, false]
  }));
  store.dispatch(pushInput({
    label : '"hello"',
    data  : ['h', 'e', 'l', 'l', 'o']
  }));
  store.dispatch(pushInput({
    label : "'A'",
    data  : 'A'
  }));

  dbg('Logging in %s.', username);
  store.dispatch(login(username));

  return store;
}

function addAliases(programs, store) {
  dbg('Store: %O', store);
  dbg('Got programs: %O', programs);

  programs.map(({name, expansion}) => 
    store.dispatch(addProgram(name, expansion)));
  return store;
}

function renderInterpretter(programs, username) {
  let store = setup(username);  // This is not as performant as if we had used a
                        // closure, but it is safer.
  store = addAliases(programs, store);
  const finalState = store.getState();

  dbg('State: %O', finalState);

  const stateString = JSON.stringify(finalState).replace(/</g, '\\u003c');
  const html = ReactDOMServer.renderToString(
    React.createElement(Provider, {store}, 
      React.createElement(Interpretter, null, null)));

  // See http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>McIlroy</title>
      <link rel="stylesheet" href="public/index.css" />
      <link rel="stylesheet" href="public/common.css" />
      <link rel="stylesheet" href="public/banner.css" />
      <link rel="shortcut icon" href="public/favicon.ico" />
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${stateString}
      </script>
      <script type="text/javascript" src="static/app.bundle.js"></script>
    </body>
  </html>`;
}

module.exports = renderInterpretter;
