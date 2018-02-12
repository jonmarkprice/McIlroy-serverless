// const { ENV } = require('../actions/env');
module.exports = function (state = null, action) {
  switch (action.type) {
    case 'SET_STAGE':
      return {
        stage: action.stage
      };
    default:
      return state;
  }
};
