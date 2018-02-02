// SavePrograms :: index.js
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function addItem(UserId, ProgramName, ProgramJSON) {
  console.log("UserId, ProgramName, and ProgramJSON");
  console.log(UserId)
  console.log(ProgramName)
  console.log(ProgramJSON)

  return ddb.put({
    TableName: 'McIlroyPrograms',
    Item: {
      UserId,
      ProgramName,
      Expansion: ProgramJSON
    }
  }).promise();
}

const jsonResponse = bodyObject => ({
  statusCode: 200,
  headers:  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Creditials': true,
    'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bodyObject)
});

module.exports = {
  addItem, 
  jsonResponse
};
