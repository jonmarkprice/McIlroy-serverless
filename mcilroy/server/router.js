// External dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

// Local dependencies
const cookieHome = require("./pages/home");
const { createSession,
        getSession,
        endSession } = require("./database/session");
const api = require("./api");
const getUserPrograms = require("./database/fetch-programs");

// React Pages
const loginPage = require("./pages/login");
const mainPage  = require("./pages/app");
const registrationPage = require("./pages/register");

const router = express.Router();
router.use("/api", api);

const app = express();
app.use(cookieParser()); // will this affect the router?

app.use('/sessions', router);

// Helper(s):
function loggedOn(cookies) {
  return cookies.session !== undefined;
}

// Routes
router.get('/', (req, res) => {
  if (req.cookies.username && req.cookies.session) {
    // Check the database for the session id.
    getSession(req.cookies.session) // TODO: try a 'fake' one.
    // TODO return user id
    // TODO: what does this return?
    .then(result => {
      // TODO: we probably need to do something similar to before
      // where we append (async) a username to the result.
      const username = result.Item.username; 
      console.log(result.Item);
      console.log("Username: ", username);

      return new Promise(function (resolve, reject) {
        getUserPrograms(username)
        .then(programs => {
          console.log('GOT USER PROGRAMS:');
          console.log(programs);
          return programs;
        })
        .then(programs => resolve({username, programs: programs.Items}))
        .catch(reject);
      });
    })
    .then(function ({username, programs}) {
      // TODO: use programs 
      // TODO: get username!
      // Will need to dispatch actions somewhere...
      console.log('username: ', username);
      console.log('programs');
      console.log(programs);

      res.send(mainPage(username, programs));
    })
    .catch(function (err) {
      console.error("Couldn't get session", err);
      res.redirect("login");
    });
  } else {
    res.redirect("login");
  }
});

router.get('/login', function (req, res) {
  if (loggedOn(req.cookies)) {
    res.redirect(".");
  } else {
    res.send(loginPage());
  }
});

router.get("/register", function (req, res) {
  if (loggedOn(req.cookies)) {
    res.redirect(".");
  } else {
    res.send(registrationPage());
  }
});

// Authentication-required request
router.get('/home', (req, res) => {
  if (loggedOn(req.cookies)) {
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
      res.write('<p>Error: could not find session.</p>');
      res.send('<a href="login">Log In</a>');
    });
  } else {
    res.redirect("login");
  }
});

router.get('/logout', (req, res) => {
  // Mb. check cookies set?
  endSession(req.cookies.session)
  .then(data => {
    res.clearCookie("username", {path: "/dev/"});
    res.clearCookie("session", {path: "/dev/"});
    res.redirect('login');
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
