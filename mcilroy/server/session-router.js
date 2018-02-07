const express = require('express');
const session = require('express-session');
const AWS = require('aws-sdk');
const DynamoStore = require('connect-dynamodb')({session: session});

const app = express();

// AWS.config.region = 'us-east-1'; 
/*
const options = {
  AWSConfigJSON: {
    region: 'us-east-1',
    accessKeyId: 'fakeid',
    secretAccessKey: 'sosecret'
  },
  client: new AWS.DynamoDB({
    endpoint: new AWS.Endpoint('http://localhost:8000')
  })
};
*/

app.use(session({
  store: new DynamoStore({}),
  secret: 'keyboard dog',
  resave: true,             // TODO Lookup
  saveUninitialized: false, // TODO Lookup
}));

app.get('/users/home', (req, res) => {
  if (req.session.known) {
    res.send('<p>Welcome friend!</p><a href="logout">logout</a>');
  } else {
    res.write('<p>')
    res.write('  Your mother was a newt...');
    res.write('  and your father smelt of elderberries.');
    res.write('</p>');
    res.write('<a href="login">login</a>');
    res.end();
  }
});

app.get('/users/login', (req, res) => {
  req.session.known = true;
  res.redirect('/users/home');
});

app.get('/users/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/home');
});

module.exports = app;
