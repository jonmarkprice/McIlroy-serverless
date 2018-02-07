const express = require('express');
const app = express();

app.use(function (req, res) {
  res.send('Your mother was a newt and your father smelt of elderberries.');
});

module.exports = app;
