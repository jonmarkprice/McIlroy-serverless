const S = require('sanctuary');
const display    = require('./parser/display');
const { result } = require('./parser/helpers');

exports.handler = (event, context, callback) => {
  let responseBody = {
    message: 'No program specified.'
  };
 
  // Parse body
  if (event.body !== null && event.body !== undefined) {
    const body = JSON.parse(event.body);
    if (body.program) {
      // responseBody = { message: 'Running program: ' + body.program + '.' };
      const output = result(...body.program);
      responseBody = {
        result: S.either(S.I, S.compose(display, S.prop('value')), output)
      }
    }
  }
  
  // Send response
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
  callback(null, response);
};
