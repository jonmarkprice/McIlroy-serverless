const ACI = require('amazon-cognito-identity-js');
const { createCognitoUser } = require('../../../client/helpers/cognito');
const { toUsername } = require('../../../client/helpers/misc');

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
    .then(() => {
      console.log("Authentication successful.");
      return storeCookie(email);
    })
    /* Debugging
    .then(res => {
      console.log("type: ", typeof res);
      console.log("is Response: ", res instanceof Response);
      console.log("Response");
      console.log(res);
      return  res;
    }) */
    .then(res => res.json())
    /* Debugging 
    .then(res => {
      res.text()
      .then(parsed => {
        console.log("Text: ");
        console.log(parsed);
        return parsed;
      })
      .catch(err => {
        console.log("Read error");
        //console.error(error);
        throw error;
      })
    }) */
    .then(
      body => {
        // TEMP XXX // const body = JSON.parse(text);

        console.log(body);
        console.log("Setting cookies");
        // Paths and other options need to be the same as
        // cookies on the server, or log-out will fail.
        document.cookie=`username=${body.username};path=/dev/`;
        document.cookie=`session=${body.session};path=/dev/`;
        
        console.log('Redirecting...');
        window.location.href = "/dev/sessions/home";
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

function storeCookie(email) {
  const opts = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    mode: 'cors',
    body: JSON.stringify({username: email})
  };
  console.log('Saving session...');
  return fetch('/dev/sessions/api/save', opts)
}

module.exports = {
  handleLogIn
};
