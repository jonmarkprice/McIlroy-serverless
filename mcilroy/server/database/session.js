// Create a new session
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

const genId = () => Math.random().toString(36).substring(7);

const addSession = () => ddb.put({
  TableName: 'McIlroySessions',
  Item: {
    session: genId(),
    username: 'testuser'
  }
}).promise();

getSession = (id) => ddb.get({
  TableName: 'McIlroySessions',
  Key: {'session': id}
}).promise();

const endSession = (id) => ddb.delete({
  TableName: 'McIlroySessions',
  Key: {'session': id}
}).promise();

module.exports = {
  addSession,
  getSession,
  endSession
}
