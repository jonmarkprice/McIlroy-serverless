require('dotenv').config();

const express = require('express');
const path = require('path');
const loginPage = require('../../server/pages/login');

const app = express();
const port = 3000;

//process.env.S3_URL = 'http://localhost:' + port;

// Serve static resources
app.use('/s3/scripts',
  express.static(path.resolve(__dirname, '../../dist')));
app.use('/s3/styles',
  express.static(path.resolve(__dirname, '../../../S3/styles')));

// Load the main app
app.get('/login', function(req, res) {
  res.send(loginPage());
});

// TODO:
// need to use different config files (i.e. urls) for different env. 
// testing vs. prod.
// server/renderPage.js uses aws-config, but I want to be able to have
// it to do: urls[env].s3

// I think I can set env vars from serverless.
// They should be the same as 

console.log('Listening on port ' + port + '...');
app.listen(port);
