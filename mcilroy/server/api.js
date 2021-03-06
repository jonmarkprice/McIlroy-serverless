const express = require('express');
const bodyParser = require('body-parser');
const { createSession } = require("./database/session");

const jsonParser = bodyParser.json();
const api = express.Router();

api.post('/ping', function (req, res) {
  res.json({message: '...pong'});
});

api.post('/save', jsonParser, function (req, res) {
  const { username, token } = req.body;
  createSession(username, token)
  .then(data => {
    const payload = {
      session: data.session,
      username: data.username // not really necessary...
    };
    res.json(payload); // response to user
  })
  .catch(err => {
    res.status(400).json({
      message: 'Could not save session',
      error: err
    });
  });
});

module.exports = api;
