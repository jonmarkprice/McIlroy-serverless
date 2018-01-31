const ACI = require('amazon-cognito-identity-js');
//const appConfig = require('../../client/cognito/config');
// const { Config } = require('aws-sdk'); 
const createCognitoUser = require('../../create-cognito-user');

// async action
function handleLogIn(email, password) {
  console.log(email);


  // XXX:
  // This may be broken by design, I can't seem to get something like
  // this to work in the node repl either.
  return function (dispatch) {
    // opt. dispatch sync actions
    //return signIn(email, password, Promise.resolve, Promise.reject)
    //.then(
    new Promise((resolve, reject) => {
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

function toUsername(email) {
  return email.replace('@', '-at-');
}

module.exports = {
  handleLogIn
};
