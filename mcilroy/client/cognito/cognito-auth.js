/* See:
 https://github.com/aws/amazon-cognito-identity-js
/blob/master/examples/babel-webpack/src/main.jsx
*/
const config = require('./config'); // TODO: possbily rename to appConfig
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// TODO
const { Config } = require('aws-sdk');


////////////////////////////////
// GOAL: Break this file up into a less monolithic
// This section should look similar to mcilroy:src/client/index.js

require('../../lib/login-hydrated');

///////////////////////////////

// TODO
// const AWSCognito = require('./vendor/aws-cognito-sdk.min.js');
// const AWSCognitoIdentity = require('./vendor/amazon-cognito-identity.min.js');

// TODO: deprecated
var App = window.App || {}; // Reuse window.App if defined.

console.log('Loaded cognito authentication script');

(function scope() {
  // const siginUrl = '/login.html';
  const poolData = {
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.userPoolClientId
  };

  // TODO: check that each prop of _config.cognito is defined, or display msg
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  if (typeof AWSCognito !== undefined) {
    Config.region = config.cognito.region;
  }

  App.signOut = function(){}; // TODO

  App.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession(function sessionCallback(err, session) {
        if (err) {
          reject(err);
        } else if (!session.isValid()) {
          resolve(null);
        } else {
          resolve(session.getIdToken().getJwtToken());
        } 
      });
    } else {
      resolve(null);
    }
  });


  //// COGNITO USER POOL FUNCTIONS ////
  function register(email, pw, onSuccess, onFailure) {
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: email
    });

    userPool.signUp(toUsername(email), pw, [attributeEmail], null,
      function signUpCallback(err, result) {
        if (!err) {
          onSuccess(result);
        }
        else {
          onFailure(err);
        }
      }
    );
  }

  function signIn(email, pw, onSuccess, onFailure) {
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: toUsername(email),
      Password: pw
    });

    createCognitoUser(email).authenticateUser(authDetails, {
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  }

  function verify(email, code, onSuccess, onFailure) {
    createCognitoUser(email).confirmRegistration(code, true, 
      function confirmCallback(err, result) {
        if (!err) {
          onSuccess(result);
        } else {
          onFailure(err);
        }
      }
    );
  }

  function createCognitoUser(email) {
    return new AmazonCognitoIdentity.CognitoUser({
      Username: toUsername(email),
      Pool: userPool
    });
  }

  function toUsername(email) {
    return email.replace('@', '-at-');
  }
  
  //// EVENT HANDLERS ////
  function handleSignIn(event) {
    const email = document.getElementById('email').value;
    const pw    = document.getElementById('password').value;

    event.preventDefault();

    signIn(email, pw,
      function() {
        console.log('Sign in successful.');
        window.location.href = '/profile';
      },
      function(err) {
        alert(err);
      }
    );
  }

  function handleRegister(event) {
    const email = document.getElementById('email').value;
    const pw    = document.getElementById('pw').value;
    const conf  = document.getElementById('pw-conf').value;
    const onSuccess = function registerSuccess(result) {
      console.log('User name is ' + result.user.getUsername());
      window.location.href = 'verify.html'; // Redirect
    };
    const onFailure = function registerFailure(err) {
      alert(err);
    };

    event.preventDefault();
    
    if (pw === conf) {
      register(email, pw, onSuccess, onFailure);
    } else {
      alert('Passwords do not match');
    }
  }

  function handleVerify(event) {
    const email = document.getElementById('email').value;
    const code  = document.getElementById('code').value;

    event.preventDefault();

    const onSuccess = function verifySuccess(result) {
      console.log(result);
      console.log('Verified!');
      window.location.href = 'signin.html'
    }

    const onFailure = function verifyFailure(err) {
      alert(err);
    }

    verify(email, code, onSuccess, onFailure);
  }

  // Attach handlers
  // checking before each is super annoying... easier way (pref. w/out jquery)?
  const reg = document.getElementById('registration-form');
  if (reg) { reg.onsubmit = handleRegister; }

  const ver = document.getElementById('verification-form');
  if (ver) { ver.onsubmit = handleVerify; }

  // TODO: sign in
  const sign = document.getElementById('login-form');
  if (sign) { sign.onsubmit = handleSignIn; }
 
})();
