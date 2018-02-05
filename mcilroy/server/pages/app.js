'use strict';
const React = require('react');
const { Provider } = require('react-redux');
const configureStore = require('../../common/configureStore');
const renderPage = require('../renderPage');
const reducer = require('../../common/reducers/appRoot');
const Interpretter = require('../../lib/containers/Interpretter'); // or common
const { pushInput } = require('../../common/actions/input');

const stylesheets = ['common', 'banner', 'index'];
const store = setupStore();
const provider = React.createElement(Provider, {store},
  React.createElement(Interpretter, null, null)
);

function setupStore() {
  const store = configureStore(reducer, undefined);

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

  return store; //.getState();
}

module.exports = () => 
  renderPage(provider, {
    title: 'McIlroy',
    stylesheets,
    state: store.getState(),
    bundles: ['app']
  });

