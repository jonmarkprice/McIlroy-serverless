// ListPrograms :: index.js

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  listItems()
  .then((items) => {
    // Send response
    const response = {
      statusCode: 200,
      body: JSON.stringify(items),
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
      statusCode: 200, // if we change will it still display?
      body: JSON.stringify({message: "Error reading programs", error: err}),
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

function listItems() {
  return ddb.scan({
    TableName: 'McIlroyPublic',
    AttributesToGet: ['Expansion']
  }).promise();
}
