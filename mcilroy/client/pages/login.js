const React = require('react');
const { hydrate } = require('react-dom');
const { Provider } = require('react-redux');
const configureStore = require('../../common/configureStore');
const reducer = require('../../common/reducers/flash');
const LoginPage = require('../../lib/components/LoginPage');

const preloaded = window.__PRELOADED_STATE__;

const store = configureStore(reducer, preloaded);

// This doesn't return anything. It just *does* it.
hydrate(
  <Provider store={store}>
    <LoginPage />
  </Provider>,
  document.getElementById('app')    
);

console.log('dispatching set flash');
store.dispatch({type: 'SET_FLASH', message: 'Hello client!'});

const state = store.getState();
console.log('STATE');
console.log(state);


