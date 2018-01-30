// PORT registration here
// IDEA: try to *import* a function defined elsewhere, e.g. in dist/
// from webpack...
'use strict';

const loginPage = require('./server/pages/login');

module.exports.login = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: loginPage(),
        headers: {
          "Content-Type": "text/html"
        }
    };
    callback(null, response);
};
