'use strict';
const React = require('react');
const { Provider } = require('react-redux');
const configureStore = require('../../common/configureStore');
const renderPage = require('../renderPage');
const reducer = require('../../common/reducers/appRoot');
const Interpretter = require('../../lib/containers/Interpretter'); // or common
const { pushInput } = require('../../common/actions/input');
const { login } = require('../../common/actions/user');
const { addProgram } = require("../../common/actions/saved");
const dbg = require("debug")("server-pages:app");

const stylesheets = ['common', 'banner', 'index', 'flash'];
const { STAGE } = process.env;

module.exports = function (username, programs) { 
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

  store.dispatch(login(username));

  dbg("PROGRAMS: ")
  dbg(programs)

  programs.forEach(function (item) {
    dbg('- %s', item);
    store.dispatch(addProgram(item.ProgramName, item.Expansion));
  });

  store.dispatch({type: 'SET_STAGE', stage: STAGE || 'unset'});

  const provider = React.createElement(Provider, {store},
    React.createElement(Interpretter, null, null)
  );
  return renderPage(provider, {
    title: 'McIlroy',
    stylesheets,
    state: store.getState(),
    bundles: ['app']
  });
}

