const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function updateProgramExpansion(UserId, ProgramName, ProgramJSON) {
  console.log("UserId, ProgramName, and ProgramJSON");
  console.log(UserId)
  console.log(ProgramName)
  console.log(ProgramJSON)

  return ddb.update({
    TableName: 'McIlroyPrograms',
    Key: {UserId, ProgramName},
    UpdateExpression: 'set #exp = :newProgram',
    ExpressionAttributeNames: {'#exp', 'Expansion'},
    ExpressionAttributeValues: {':newProgram': ProgramJSON}
  }).promise();
}

module.exports = updateProgramExpansion;
