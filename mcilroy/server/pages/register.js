'use strict';
const React = require('react');
const { Provider } = require('react-redux');
const configureStore = require('../../common/configureStore');
const renderPage = require('../renderPage');
const reducer = require('../../common/reducers/flash');
const RegistrationPage = require('../../lib/components/RegistrationPage');

const stylesheets = ['common', 'banner', 'form', 'flash'];
const store = configureStore(reducer, {flash: null});
const provider = React.createElement(Provider, {store},
  React.createElement(RegistrationPage, null, null)
);

module.exports = () => 
  renderPage(provider, {
    title: 'Register - McIlroy',
    stylesheets,
    state: store.getState(),
    bundles: ['register']
  });

