const { combineReducers } = require('redux');
const inputReducer    = require('./input');
const programReducer  = require('./canvas');
const displayReducer  = require('./display');
const savedReducer    = require('./saved');
const editReducer     = require('./edit');
const userReducer     = require('./user');
const flashReducer    = require('./flash');

const reducer = combineReducers({
  input     : inputReducer,
  program   : programReducer,
  displayed : displayReducer,
  saved     : savedReducer,
  edit      : editReducer,
  user      : userReducer,
  flash     : flashReducer
});

module.exports = reducer;
