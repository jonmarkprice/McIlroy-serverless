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
  jsonResponse
}
