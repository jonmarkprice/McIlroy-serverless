const ACI = require('amazon-cognito-identity-js');
const appConfig = require('../../../client/cognito/config');

const poolData = {
  UserPoolId: appConfig.cognito.userPoolId,
  ClientId: appConfig.cognito.userPoolClientId
};

// TODO: check that each prop of _config.cognito is defined, or display msg
// const userPool = new ACI.CognitoUserPool(poolData);

function createCognitoUser(email) {
  return new ACI.CognitoUser({
    Username: toUsername(email),
    Pool: new ACI.CognitoUserPool(poolData)
  });
}

function toUsername(email) {
  return email.replace('@', '-at-');
}

module.exports = { 
  createCognitoUser,
  toUsername,
  poolData
}
