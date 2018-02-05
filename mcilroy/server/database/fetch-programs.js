const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function getUserPrograms(UserId) {
  console.log("--- DEBUGGING ---");
  console.log("UserId: ");
  console.log(UserId);
  console.log(typeof UserId);
  console.log("--- END DEBUGGING ---");

  // need to specify which columns we want?
  const params = {
    TableName: 'McIlroyPrograms',
    KeyConditionExpression: 'UserId = :user',
    ExpressionAttributeValues: {
      ':user': UserId //{S: UserId}
    }
    // 
  };
  return ddb.query(params).promise();
}

module.exports = getUserPrograms;
