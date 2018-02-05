'use strict';

const loginPage = require('./server/pages/login');
const registrationPage = require('./server/pages/register');
const apiPage = require('./server/pages/api');
const app = require('./server/pages/app');

// TODO: move jsonResponse to database/helpers or something
const addItem = require('./server/database/save-program');
const getUserPrograms = require('./server/database/fetch-programs');
const deleteProgram = require('./server/database/delete-program');
const { jsonResponse } = require('./server/database/helpers');

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

module.exports.api = (event, context, callback) => {
  sendOk(apiPage(), callback);
};

module.exports.saveProgram = (event, context, callback) => {
  const parsed = JSON.parse(event.body);
  const { UserId, ProgramName, ProgramJSON } = parsed;
  addItem(UserId, ProgramName, ProgramJSON)
  .then(() => {
    callback(null, jsonResponse({
      message: "Saved program"
    })); 
  })  
  .catch(err => {
    callback(err); 
  }); 
};

module.exports.fetchPrograms = (event, context, callback) => {
  const { UserId } = JSON.parse(event.body);
  getUserPrograms(UserId)
  .then(programs => {
    callback(null, jsonResponse({
      list: programs
    }));
  })
  .catch(err => {
    callback(err);
  });
};

module.exports.deleteProgram = (event, context, callback) => {
  const { UserId, ProgramName } = JSON.parse(event.body);
  deleteProgram(UserId, ProgramName)
  .then(() => {
    callback(null, jsonResponse({
      message: "Deleted Program"
    }));
  })
  .catch(err => {
    callback(err);
  });
};

module.exports.app = (event, context, callback) => {
  sendOk(app(), callback);
};
