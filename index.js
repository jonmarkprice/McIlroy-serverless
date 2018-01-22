const S = require('sanctuary');
const display    = require('./parser/display');
const { result } = require('./parser/helpers');

exports.handler = (event, context, callback) => {
  let responseBody = {
    result: 'No program specified.'
  };
 
  // Parse body
  console.log("body:")
  console.log(JSON.stringify(event.body))
  
  if (event.body !== null && event.body !== undefined) {
    const program = JSON.parse(event.body);
    if (program) {
      console.log('Program: ');
      console.log(program);
      
      // responseBody = { message: 'Running program: ' + body.program + '.' };
      const output = result(...program);
      responseBody = {
        result: S.either(S.I, S.compose(display, S.prop('value')), output)
      };
    }
  }
  
  console.log("Response body: ")
  console.log(responseBody);
  
  // Send response
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Creditials': true,
      'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Content-Type': 'application/json'
    }
  };
  callback(null, response);
};
