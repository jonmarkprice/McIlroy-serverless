const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
// const rootReducer = require('./reducers');

function configureStore(reducer, state) {
  return createStore(
    reducer,
    state,
    applyMiddleware(thunkMiddleware)
  );
}

module.exports = configureStore;
