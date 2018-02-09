// External dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

// Local dependencies
const cookieHome = require("./pages/home");
const { createSession,
        getSession,
        endSession } = require("./database/session");
const api = require("./api");

// React Pages
const loginPage = require("./pages/login");
const mainPage  = require("./pages/app");
const registrationPage = require("./pages/register");

const router = express.Router();
router.use("/api", api);

const app = express();
app.use(cookieParser()); // will this affect the router?

app.use('/sessions', router);

// Routes
router.get('/', (req, res) => {
  if (req.cookies.username && req.cookies.session) {
    getSession(req.cookies.session)
    .then(function (){ // Don't need data
      res.send(mainPage());
    })
    .catch(function (err) { // Ignoring for now
      res.redirect("/login"); // set flash?
    });
  } else {
    res.send("You are not logged in");
  }
});

router.get('/login', function (req, res) {
  // res.send(cookieHome());
  res.send(loginPage());
});

// Authentication-required request
router.get('/home', (req, res) => {
  if (req.cookies.username && req.cookies.session) {
    getSession(req.cookies.session)
    .then(data => {
      res.write("<h2>Server data</h2>");
      res.write("<pre>");
      res.write(JSON.stringify(data));
      res.write("</pre>"); 
      res.write('<p>Welcome ' + req.cookies.username + '!</p>');
      res.send('<a href="logout">logout</a>');
      // I am tempted to "touch" the cookies here to ensure that
      // they are correct in terms of options..
      // Could verify that username is the same here.
    })
    .catch(err => {
      res.send('<p>Error: could not find session</p>');
      // res.redirect("/") ?
    });
  } else {
    res.write('<p>')
    res.write('Your mother was a newt...');
    res.write('and your father smelt of elderberries.');
    res.write('</p>');
    res.send('<a href="..">login</a>'); //XXX
  }
});

router.get('/logout', (req, res) => {
  endSession(req.cookies.session)
  .then(data => {
    res.clearCookie("username", {path: "/dev/"});
    res.clearCookie("session", {path: "/dev/"});
    res.redirect('home');
  })
  .catch(err => {
    res.write("<h2>ERROR logging out</h2>");
    res.send("<pre>" + JSON.stringify(err) + "</pre>");
  });
});

// handle 404 more elegantly
// TODO: may only want to do for GET
router.use(function (req, res, next) {
  res.send("<p>These aren't the droids your looking for.</p>");
});

////////////////////////////////////////////////////////////////

// Could even move 'app' to end, and avoid declaring.
// module.exports = express().use('/sessions', router);
module.exports = app;
