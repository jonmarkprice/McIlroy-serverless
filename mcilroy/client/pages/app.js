const React           = require('react');
const { hydrate }     = require('react-dom');
const { Provider }    = require('react-redux');
const Interpretter    = require('../../common/containers/Interpretter');
const configureStore  = require('../../common/configureStore');
const dbg = require('../../common/dbgconf')('client');
const reducer = require('../../common/reducers/appRoot');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(reducer, preloadedState);

hydrate(
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('app')
);
