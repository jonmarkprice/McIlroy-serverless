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
    console.log("Requesting list of programs");
    const body = { UserId: getUser().username };
    getAuthToken()
    .then(tok => fetch('programs/fetch', createOpts(body, tok)))
    .then(res => res.json())
    .then( // Two parameter version handles both success & failure.
      parsed => {
        parsed.list.Items.forEach(item => {
          dispatch(addProgram(item.ProgramName, item.Expansion));
        });
      },
      err => {
        console.error(err);
        // TODO add flash message
        //dispatch()
      }
    );
  }
}

module.exports = fetchUserPrograms;
