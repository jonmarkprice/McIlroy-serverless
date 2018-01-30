'use strict';

const React = require('react');
const renderPage = require('../renderPage');
const LoginPage = require('../../lib/components/LoginPage');

// McIlroy EB used req.flash and I passed {flash: ...} into 
// window.__INITIAL_STATE__ just as one would do with Redux.

// const component = page;
const stylesheets = ['common', 'banner', 'form', 'login', 'flash'];
const state = {flash: null};
module.exports = () => 
  renderPage(React.createElement(LoginPage, state, null), {
    title: 'Log In - McIlroy',
    stylesheets,
    state,
    bundles: ['cognito']
  });

