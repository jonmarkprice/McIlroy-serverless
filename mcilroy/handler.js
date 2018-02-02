// PORT registration here
// IDEA: try to *import* a function defined elsewhere, e.g. in dist/
// from webpack...
'use strict';

const loginPage = require('./server/pages/login');
const registrationPage = require('./server/pages/register');
const profilePage = require('./server/pages/profile');
const apiPage = require('./server/pages/api');

const { addItem, jsonResponse } = require('./server/database/save-program');

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
  sendOk(profilePage(), callback);
};

module.exports.auth = (event, context, callback) => {
  sendOk('<p>Authorization successful</p>', callback);
};

module.exports.api = (event, context, callback) => {
  sendOk(apiPage(), callback);
};

module.exports.saveProgram = (event, context, callback) => {
  console.log("--- from the handler ---")
  console.log(event.body);
  console.log(typeof event.body);
  
  const parsed = JSON.parse(event.body);
  const { UserId, ProgramName, ProgramJSON } = parsed;

  addItem(UserId, ProgramName, ProgramJSON)
  .then(function () {
    callback(null, jsonResponse({
      message: "Saved program",
      item: event.body
    })); 
  })  
  .catch(err => {
    callback(err); 
  }); 
};
