// External dependencies
const express = require('express');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

// Local dependencies
const cookieHome = require("./pages/home");
const addCookie = require("./database/add-cookie");

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

router.post('/api/test', function(req, res) {
  res.json({recieved: true});
});

router.post('/api/save', jsonParser, function (req, res) {
  const username = req.body.username; // others?

  console.log("USERNAME: ", username)

  addCookie(username)
  .then(data => {
    const payload = {
      session: data.session
    };
    console.log('--- DynomDB response data ---');
    console.log(data);

    // console.log('sesssion: %s', session);
    
    // TODO: eventually, may need to set auth headers, etc.
    // see client/helpers:{jsonResponse}
    /*
    res.setHeader({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Creditials': true,
      'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    });
    */
    res.json(payload);
  })
  .catch(err => {
    res.status(400).json({
      message: 'Could not save session',
      error: err
    });
  });
});

router.get('/home', (req, res) => {
  if (req.cookies.username === 'monty') {
    res.send('<p>Welcome friend!</p><a href="logout">logout</a>');
  } else {
    res.write('<p>')
    res.write('Your mother was a newt...');
    res.write('and your father smelt of elderberries.');
    res.write('</p>');
    res.send('<a href="login">login</a>');
  }
});

router.get('/login', (req, res) => {
  res.cookie("username", "monty");
  res.redirect('home');
});

router.get('/logout', (req, res) => {
  res.clearCookie("username");
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
