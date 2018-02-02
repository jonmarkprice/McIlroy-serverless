const React = require('react');
const { hydrate } = require('react-dom');
const { Provider } = require('react-redux');
const configureStore = require('../../common/configureStore');
const reducer = require('../../common/reducers/flash');
const LoginPage = require('../../lib/components/LoginPage');

const preloaded = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(reducer, preloaded);

hydrate(
  <Provider store={store}>
    <LoginPage />
  </Provider>,
  document.getElementById('app')    
);

