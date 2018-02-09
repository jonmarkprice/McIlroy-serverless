// External dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// Local dependencies
const cookieHome = require("./pages/home");
const { createSession,
        getSession } = require("./database/session");

const jsonParser = bodyParser.json();
const router = express.Router();
const app = express();
app.use(cookieParser()); // will this affect the router?
app.use('/sessions', router);

// XXX: Only for GET/HTTP
// Unconditional middleware (for router)
// router.use(function (req, res, next) {
//  res.write("<p>You requested " + req.path + ".</p>");
//  next();
// });

// Routes
router.get('/', function (req, res) {
  res.send(cookieHome());
});

router.post('/api/save', jsonParser, function (req, res) {
  const username = req.body.username; // others?
  console.log("USERNAME: ", username)
  createSession(username)
  .then(data => {
    const payload = {
      session: data.session,
      username: data.username
    };
    res.json(payload);
  })
  .catch(err => {
    res.status(400).json({
      message: 'Could not save session',
      error: err
    });
  });
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
    res.send('<a href="login">login</a>');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie("username", {path: "/dev/"});
  res.clearCookie("session", {path: "/dev/"});

  // res.cookie("logged-out", "true", {path: "/dev/"});
  res.redirect('home');
});

// handle 404 more elegantly
// TODO: may only want to do for GET
router.use(function (req, res, next) {
  res.send("<p>These aren't the droids your looking for.</p>");
});

// Could even move 'app' to end, and avoid declaring.
// module.exports = express().use('/sessions', router);
module.exports = app;
