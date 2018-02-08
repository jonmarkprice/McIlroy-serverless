// Create a new session
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

function genId() {
  return Math.random().toString(36).substring(7);
}

function addCookie(username) {
  console.log("Adding username: %s", username);
  return new Promise((resolve, reject) => {
    const session = genId();
    ddb.put({
      TableName: "McIlroySessions",
      Item: {session, username}
    })
    .promise()
    .then(() => { // returns empty object
      resolve({session, username})
    })
    .catch(err => {
      reject(err);
    });
  });
}

module.exports = addCookie;
