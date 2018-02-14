const ACI = require('amazon-cognito-identity-js');
const { createCognitoUser,
        getAuthToken  } = require('../../cognito');
const { toUsername } = require('../../misc');
const dbg = require("../../dbgconf")("async-actions:login");

// async action
function handleLogIn(email, password) {
  return function (dispatch) {
    new Promise(function (resolve, reject) {
      // Coginto authentication
      return signIn(email, password,
        function succ(val) { resolve(val); }, 
        function fail(err) { reject(err); }
      );
    })
    .then(getAuthToken) // ignores args
    .then(token => storeCookie(email, token))
    .then(res => res.json())
    .then(
      body => {
        dbg(body);
        dbg("Setting cookies");
        // Paths and other options need to be the same as
        // cookies on the server, or log-out will fail.
        document.cookie=`session=${body.session};path=/dev/`;
        
        dbg('Redirecting...');
        window.location.href = "/dev/sessions/";
      },
      error => {
        console.error(error);
        dispatch({type: 'SET_FLASH', message: error.message});
      }
    );
  }
}

// helpers ////////////////////////////////////////////////////////////////////
function signIn(email, pw, onSuccess, onFailure) { 
  const authDetails = new ACI.AuthenticationDetails({
    Username: toUsername(email),
    Password: pw
  });

  createCognitoUser(email)
    .authenticateUser(authDetails, {onSuccess, onFailure});
}

function storeCookie(email, token) {
  dbg('Got token: ', token);
  const opts = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    mode: 'cors',
    body: JSON.stringify({username: toUsername(email), token})
  };
  dbg('Saving session...');
  return fetch('/dev/sessions/api/save', opts)
}

module.exports = {
  handleLogIn
};
