const ACI = require('amazon-cognito-identity-js');
const { createCognitoUser, toUsername} = require('../helpers/cognito');

// async action
function handleLogIn(email, password) {
  return function (dispatch) {
    new Promise(function (resolve, reject) {
      return signIn(email, password,
        function succ(val) { resolve(val); }, 
        function fail(err) { reject(err); }
      );
    })
    .then(
      value => {
        console.log('Sign in successful');
        window.location.href = 'profile';
      },
      error => {
        dispatch({type: 'SET_FLASH', message: error.message});
      }
    );
  }
}

// helper
function signIn(email, pw, onSuccess, onFailure) { 
  const authDetails = new ACI.AuthenticationDetails({
    Username: toUsername(email),
    Password: pw
  });

  createCognitoUser(email)
    .authenticateUser(authDetails, {onSuccess, onFailure});
}

module.exports = {
  handleLogIn
};
