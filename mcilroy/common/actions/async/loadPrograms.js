const { getAuthToken
        , getUser } = require('../../../client/helpers/cognito');
const { createOpts } = require('../../../client/helpers/misc');
const { addProgram } = require('../saved');
// TODO add SET_FLASH to reducer

// async action
function fetchUserPrograms(userId) {
  // TODO: I think we can simplify this...
  // const fetchUserProgram = userId => dispatch => {
  return function (dispatch) {
    const body = { UserId: getUser().username };

    dispatch({type: 'SET_FLASH', message: 'Loading programs...'});

    getAuthToken()
    .then(tok => fetch('programs/fetch', createOpts(body, tok)))
    .then(res => res.json())
    .then( // Two parameter version handles both success & failure.
      parsed => {
        parsed.list.Items.forEach(item => {
          dispatch(addProgram(item.ProgramName, item.Expansion));
        });
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

module.exports = fetchUserPrograms;
