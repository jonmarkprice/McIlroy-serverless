// Create a new session
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function genId() {
  return Math.random().toString(36).substring(7);
}

function createSession(username, token) {
  console.log("Adding username: %s", username);
  console.log("Got token: %s", token); // undef.
  return new Promise((resolve, reject) => {
    const session = genId();
    ddb.put({
      TableName: "McIlroySessions",
      Item: {session, username, token}
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

const getSession = (id) => ddb.get({
  TableName: 'McIlroySessions',
  Key: {'session': id}
}).promise();

const endSession = (id) => ddb.delete({
  TableName: 'McIlroySessions',
  Key: {'session': id}
}).promise();

module.exports = {
  createSession,
  getSession,
  endSession
}
