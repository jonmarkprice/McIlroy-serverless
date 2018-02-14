const ACI = require('amazon-cognito-identity-js');
const appConfig = require('./config');
const { toUsername } = require('./misc');

// What about region?
const { config } = require('aws-sdk');
config.region = appConfig.cognito.region;

const poolData = {
  UserPoolId: appConfig.cognito.userPoolId,
  ClientId: appConfig.cognito.userPoolClientId
};

function getUser() {
  return new ACI.CognitoUserPool(poolData).getCurrentUser();
}

function getAuthToken() {
  return new Promise(function (resolve, reject) {
    const user = getUser();
    if (user) {
      user.getSession(function(err, session) {
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
}

function createCognitoUser(email) {
  return new ACI.CognitoUser({
    Username: toUsername(email),
    Pool: new ACI.CognitoUserPool(poolData)
  });
}

module.exports = {
  createCognitoUser,
  getAuthToken,
  getUser,
  poolData
}
