const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // will this affect the router?
app.use('/sessions', router);

// Unconditional middleware (for router)
router.use(function (req, res, next) {
  res.write("<p>You requested " + req.path + ".</p>");
  next();
});

// Branch // XXX not working (still)
// Need a seperate http event - see example in serverless-http
router.get('/', function (req, res) {
  res.send("<p>Main page</p>");
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

router.get('/b', function (req, res) {
  res.send("<p>B is the best!</p>");
});

// handle 404 more elegantly
router.use(function (req, res, next) {
  res.send("<p>These aren't the droids your looking for.</p>");
});

// Could even move 'app' to end, and avoid declaring.
// module.exports = express().use('/sessions', router);
module.exports = app;
