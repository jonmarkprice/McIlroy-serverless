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

const cookieProfile = require('./server/pages/profile');
const cookieHome = require('./server/pages/home');

const serverlessHttp = require('serverless-http');
const router = require('./server/router');
const sessionRouter = require('./server/session-router');

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

module.exports.pathTest = (event, context, callback) => {
  console.log(event.pathParameters);
  const rendered = 'You went to: ' + event.pathParameters.foo;
  sendOk(rendered, callback);
};

// TODO: figure out how to get path parameters, etc.
module.exports.sessions = serverlessHttp(router);
//  (event, context, callback) => { sendOk('hello!', callback); }

module.exports.users = serverlessHttp(sessionRouter);

module.exports.addSession = (event, context, callback) => {
  addSession()
  .then(() => {
    callback(null, jsonResponse({message: 'Session added'}));
  })
  .catch(err => {
    callback(err);
  });
};

module.exports.cookieHome = (event, context, callback) => {
  sendOk(cookieHome(), callback);
};

module.exports.cookieProfile = (event, context, callback) => {
  // parse cookie
  // TODO: later verify
  const cookie = {username: "Uh oh!"};

  const loggedIn = false; 
  if (loggedIn) {
    const username = cookie.username; //TODO
    sendOk(cookieProfile(username), callback);
  } else {
    // redirect(); // make function?
    callback(null, {
      statusCode: 303,
      headers: {
        "Content-Type": "text/html",
        "Location": "home"
      },
      body: "<p>You must be logged in to view this page.</p>"
    });
  }
};
/*
module.exports.storeCookie = (event, context, callback) => {
  const { username } = JSON.parse(event.body);
  console.log("username: %s :: %s", username, typeof username);

  addCookie(username) // responds with the sessionId
  .then(res => {
    callback(null, jsonResponse(res));
  })
  .catch(err => {
    callback(err);
  });
};
*/

// TODO: do I need to test these at all? 
/*
module.exports.getSession = (event, context, callback) => {
  const { id } = JSON.stringify(event.body);
  getSession(id)
  .then(data => {
    callback(null, jsonResponse({data}));
  })
  .catch(err => {
    callback(err);
  });
};

module.exports.endSession = (event, context, callback) => {
  const { id } = JSON.stringify(event.body);
  endSession(id)
  .then(() => {
    callback(null, jsonResponse({message: 'Session deleted'}));
  })
  .catch(err => {
    callback(err);
  });
};
*/

