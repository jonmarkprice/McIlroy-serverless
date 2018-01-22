// SavePrograms :: index.js

const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  // Parse body
  console.log("body:");
  console.log(JSON.stringify(event.body));

  addItem(event.body)
  .then(() => {
    // Send response
    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "Saved program", item: event.body}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Creditials': true,
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Content-Type': 'application/json'
      }
    };
    callback(null, response);
  })
  .catch(err => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "Error saving program", error: err}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Creditials': true,
        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Content-Type': 'application/json'
      }
    };
    callback(null, response);
  });
};

function addItem(programJSON) {
  return ddb.put({
    TableName: 'McIlroyPublic',
    Item: {
      ProgramId: generateId(),
      Expansion: programJSON
    }
  }).promise();
}

function toUrlString(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateId() {
  return toUrlString(randomBytes(16));
}
