const { getUser } = require('../../../client/helpers/cognito');

// async action
module.exports = function() {
  return function (dispatch) {
    getUser().signOut();
    window.location.href = "login";
  }
};

