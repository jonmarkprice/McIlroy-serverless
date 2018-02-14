const { getAuthToken
        , getUser } = require('../../cognito');
const { createOpts } = require('../../misc');
const dbg = require("../../dbgconf")("async-actions:save-program"); 

const saveProgram = (userId, name, expansion, stage) => dispatch => {
  const body = {
    UserId: getUser().username,
    ProgramName: name || 'untitled',
    ProgramJSON: expansion || []
  };
  const path = '/' + stage + '/programs/save';

  dispatch({type: 'SET_FLASH', message: 'Saving program...'});

  getAuthToken()
  .then(tok => fetch(path, createOpts(body, tok)))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      dbg('Response: %s', parsed.message); 
      dispatch({type: 'CLEAR_FLASH'});
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

module.exports = saveProgram;
