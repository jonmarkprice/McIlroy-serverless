const React           = require('react');
const { hydrate }     = require('react-dom');
const { Provider }    = require('react-redux');
const Interpretter    = require('../../common/containers/Interpretter');
const configureStore  = require('../../common/configureStore');
const dbg = require('../../common/dbgconf')('client');
const reducer = require('../../common/reducers/appRoot');
const loadPrograms = require('../../common/actions/async/loadPrograms');
const { login } = require('../../common/actions/user');
const { getUser } = require('../helpers/cognito');

const user = getUser();
if (user === null) {
  document.write("Permission denied");
  window.location.href = "login";
} else {
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
  store.dispatch(login(user.username));
  store.dispatch(loadPrograms(user.username));
  console.log('...actions dispatched.');
}
