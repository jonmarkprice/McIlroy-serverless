const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function getUserPrograms(UserId) {
  const params = {
    TableName: 'McIlroyPrograms',
    KeyConditionExpression: 'UserId = :user',
    ExpressionAttributeValues: {
      ':user': UserId
    }
  };
  return ddb.query(params).promise();
}

module.exports = getUserPrograms;
