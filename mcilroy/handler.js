// PORT registration here
// IDEA: try to *import* a function defined elsewhere, e.g. in dist/
// from webpack...
'use strict';

const loginPage = require('./server/pages/login');
const registrationPage = require('./server/pages/register');

function sendOk(body, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: body
  });
}

module.exports.login = (event, context, callback) => {
  sendOk(loginPage(), callback);
};

module.exports.register = (event, context, callback) => {
  sendOk(registrationPage(), callback);
};

module.exports.profile = (event, context, callback) => {
  sendOk('<p>Profile under construction</p>', callback);
};

 
