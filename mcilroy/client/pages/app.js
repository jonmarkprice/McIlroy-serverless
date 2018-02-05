const React           = require('react');
const { hydrate }     = require('react-dom');
const { Provider }    = require('react-redux');
const Interpretter    = require('../../common/containers/Interpretter');
const configureStore  = require('../../common/configureStore');
const dbg = require('../../common/dbgconf')('client');
const reducer = require('../../common/reducers/appRoot');

const loadPrograms = require('../../common/actions/async/loadPrograms');
const { login } = require('../../common/actions/user');

const ACI = require('amazon-cognito-identity-js');
const { poolData } = require('../../common/actions/helpers/cognito');
const appConfig = require('../cognito/config');

dbg('Started successfully!');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = configureStore(reducer, preloadedState);

hydrate( // was render
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('app')
);

// Now fire off async actions...
console.log('Firing off async actions...');

const userPool = new ACI.CognitoUserPool(poolData);
const username = userPool.getCurrentUser().username;
store.dispatch(login(username));
store.dispatch(loadPrograms(username));

console.log('...actions dispatched.');
