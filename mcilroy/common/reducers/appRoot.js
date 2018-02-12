const { combineReducers } = require('redux');
module.exports = combineReducers({
  input     : require('./input'),
  program   : require('./canvas'),
  displayed : require('./display'),
  saved     : require('./saved'),
  edit      : require('./edit'),
  user      : require('./user'),
  flash     : require('./flash'),
  env       : require('./env')
});

