const ACI = require('amazon-cognito-identity-js');
const { poolData } = require('../../common/actions/helpers/cognito');
const appConfig = require('../cognito/config');
const userPool = new ACI.CognitoUserPool(poolData);

function getAuthToken() {
  return new Promise(function (resolve, reject) {
    const user = userPool.getCurrentUser();
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

// TODO
// function getUserName

module.exports = { getAuthToken };
