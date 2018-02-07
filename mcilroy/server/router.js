// Potentially best practice to make this whole thing a router
// inside of /session

const express = require('express');
const app = express();

// Unconditional middleware
app.use(function (req, res, next) {
  res.write("<p>You requested " + req.path + ".</p>");
  next();
});

// XXX: This is all relative to root, so it needs '/session/xxx'

const router = express.Router();

// Branch
router.get('/a', function (req, res, next) {
  res.send("<p>...and you're at A!</p>");
});

router.get('/b', function (req, res, next) {
  res.send("<p>B is the best!</p>");
});

app.use('/sessions', router);

module.exports = app;
