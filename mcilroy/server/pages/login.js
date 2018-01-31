'use strict';

const React = require('react');
const { Provider } = require('react-redux');

// XXX: not sure if I should use from common, or lib...
// I don't think it will matter at the moment.
// Really, I should consider moving some of this so I can use JSX
const configureStore = require('../../common/configureStore');
const renderPage = require('../renderPage');

// TODO: make
const reducer = require('../../common/reducers/login');

// React components
const LoginPage = require('../../lib/components/LoginPage');

// McIlroy EB used req.flash and I passed {flash: ...} into 
// window.__INITIAL_STATE__ just as one would do with Redux.

// const component = page;
const stylesheets = ['common', 'banner', 'form', 'login', 'flash'];

const store = configureStore(reducer, {flash: null});
const provider = React.createElement(Provider, {store},
  React.createElement(LoginPage, null, null)
);

module.exports = () => 
  renderPage(provider, {
    title: 'Log In - McIlroy',
    stylesheets,
    state: store.getState(),
    bundles: ['cognito']
  });

