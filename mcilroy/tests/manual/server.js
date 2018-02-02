// Load from .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const loginPage = require('../../server/pages/login');
const registrationPage = require('../../server/pages/register');
const profilePage = require('../../server/pages/profile');
const apiPage = require('../../server/pages/api');

const app = express();
const port = 3000;

// Serve static resources
app.use('/s3/scripts',
  express.static(path.resolve(__dirname, '../../dist')));
app.use('/s3/styles',
  express.static(path.resolve(__dirname, '../../../S3/styles')));

app.get('/profile', function (req, res) {
  res.send(profilePage());
});

// Load the main app
app.get('/login', function (req, res) {
  res.send(loginPage());
});

app.get('/register', function (req, res) {
  res.send(registrationPage())
});

app.get('/api', function (req, res) {
  res.send(apiPage());
});

console.log('Listening on port ' + port + '...');
app.listen(port);
