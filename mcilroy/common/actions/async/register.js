const ACI = require('amazon-cognito-identity-js');
const { poolData } = require('../../cognito');
const { toUsername } = require('../../misc');
const dbg = require("../../dbgconf")("async-actions:register");

function handleRegistration(email, pw, conf) {
  return function (dispatch) {
    new Promise(function (resolve, reject) {
      if (pw === conf) {
        return register(email, pw,
          function succ(val) { resolve(val); },
          function fail(err) { reject(err); }
        );
      } else {
        // XXX: Need to wrap in an Error?
        reject('Passwords do not match');
      }
    })
    .then(
      function () { // val ignored
        dbg('Logged in ' + res.user.getUsername());
        window.location.href = '.';
      },
      function (err) {
        console.error(err);
        if (err.message) {
          dispatch({type: 'SET_FLASH', message: err.message});
        } else {
          dispatch({type: 'SET_FLASH', message: 'Unknown error.'});
        }
      }
    );
  }
}

function register(email, pw, onSuccess, onFailure) {
  const attributeEmail = new ACI.CognitoUserAttribute({
    Name: 'email',
    Value: email
  });

  const userPool = new ACI.CognitoUserPool(poolData);
  userPool.signUp(toUsername(email), pw, [attributeEmail], null,
    // Don't have to split case into two functions if I don't want to.
    // Unlike with signIn above.
    function (err, result) {
      if (!err) {
        onSuccess(result);
      }
      else {
        onFailure(err);
      }
    }
  );
}

module.exports = {
  handleRegistration
};
