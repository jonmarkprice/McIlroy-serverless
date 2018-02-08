const express = require('express');
// const AWS = require('aws-sdk');

// Use cookie parser instead of express-session
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser()); // no secret needed for now

app.get('/users/home', (req, res) => {
  if (req.cookies.username === 'monty') {
    res.send('<p>Welcome friend!</p><a href="logout">logout</a>');
  } else {
    res.write('<p>')
    res.write('  Your mother was a newt...');
    res.write('  and your father smelt of elderberries.');
    res.write('</p>');
    res.send('<a href="login">login</a>');
  }
});

app.get('/users/login', (req, res) => {
  res.cookie("username", "monty");
  res.redirect('home');
});

app.get('/users/logout', (req, res) => {
  res.clearCookie("username");
  res.redirect('home');
});

module.exports = app;
