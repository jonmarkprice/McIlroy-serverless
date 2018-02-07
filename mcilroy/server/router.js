const express = require('express');
const router = express.Router();
const app = express()
  .use('/sessions', router);

// Unconditional middleware (for router)
router.use(function (req, res, next) {
  res.write("<p>You requested " + req.path + ".</p>");
  next();
});

// Branch
router.get('/', function (req, res) {
  res.send("<p>Main page</p>");
});

router.get('/a', function (req, res) {
  res.send("<p>...and you're at A!</p>");
});

router.get('/b', function (req, res) {
  res.send("<p>B is the best!</p>");
});

// Could even move 'app' to end, and avoid declaring.
// module.exports = express().use('/sessions', router);
module.exports = app;
