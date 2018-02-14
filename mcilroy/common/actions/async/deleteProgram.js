const { getAuthToken
        , getUser } = require('../../cognito');
const { createOpts } = require('../../misc');
const { removeProgram } = require('../saved');
const dbg = require("../../dbgconf")("async-actions:delete-program");

const deleteProgram = (userId, id, name, stage) => dispatch => {
  const body = {
    UserId: getUser().username,
    ProgramName: name,
  };
  const path = '/' + stage + '/programs/delete';

  getAuthToken()
  .then(tok => fetch(path, createOpts(body, tok)))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      dbg('Response: %s', parsed.message);
      dispatch(removeProgram(id)); 
    },
    err => {
      console.error(err);
      dispatch({
        type: 'SET_FLASH',
        message: err.message || 'Unknown error'
      });
    }
  );
}

module.exports = deleteProgram;
