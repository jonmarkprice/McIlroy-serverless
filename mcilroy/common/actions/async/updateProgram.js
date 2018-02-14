const { getAuthToken
        , getUser } = require('../../cognito');
const { createOpts } = require('../../misc');
const dbg = require("../../dbgconf")("async-actions:update-program");

function updateProgramOnServer(userId, id, oldName, newName, newProgram,
                               stage) {
  return function (dispatch) {
    const username = getUser().username;
    const old = {
      UserId: username,
      ProgramName: oldName
    };
    const updated = {
      UserId: username,
      ProgramName: newName,
      ProgramJSON: newProgram
    };
    const deletePath = `/${stage}/programs/delete`;
    const savePath = `/${stage}/programs/save`;

    getAuthToken()
    .then(tok => {
      dispatch({type: 'SET_FLASH', message: 'Updating program...'});
      return fetch(deletePath, createOpts(old, tok))
      .then(res => res.json())
      .then(parsed => {
        dbg('Delete response: %s', parsed.message);
        return fetch(savePath, createOpts(updated, tok));
      });
    })
    .then(res => res.json())
    .then( // Two parameter version handles both success & failure.
      parsed => {
        dbg('Save response: %s', parsed.message);
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
}

module.exports = updateProgramOnServer;
