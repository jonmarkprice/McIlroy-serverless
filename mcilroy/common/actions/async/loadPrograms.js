// TODO: move getAuthToken -> client/helpers/token
const { getAuthToken } = require('../../../client/cognito/user');
const { poolData } = require('../helpers/cognito')
const { createOpts } = require('../../../client/helpers/token');
const { addProgram } = require('../saved');
// TODO add SET_FLASH to reducer

const ACI = require('amazon-cognito-identity-js');

// async action
function fetchUserPrograms(userId) {
  // TODO: I think we can simplify this...
  // const fetchUserProgram = userId => dispatch => {
  return function (dispatch) {
    console.log("Requesting list of programs");
    const user = new ACI.CognitoUserPool(poolData).getCurrentUser();
    const body = { UserId: user.username };
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
