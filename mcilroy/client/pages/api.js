// Elements
const form = document.getElementById('program-form');
const programElem = document.getElementById('program');
const result = document.getElementById('result');
const saveButton = document.getElementById('save');
const programsList = document.getElementById('programs-list');
const programName = document.getElementById('program-name');

const ACI = require('amazon-cognito-identity-js');
const { poolData } = require('../../common/actions/helpers/cognito');
const { getAuthToken } = require('../cognito/user');

// TODO: can try first with this URL to see if everything else works...
// Request data
// const url  = 'https://awi4wral7b.execute-api.us-east-2.amazonaws.com/prod';
// const url = 'https://jd83lhj885.execute-api.us-east-2.amazonaws.com/dev'

const createOpts = (body, token) => ({
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  }),
  mode: 'cors',
  body: JSON.stringify(body)
});

saveButton.onclick = function(event) {
  console.log('Submitting request.');
  event.preventDefault();
  const path = "programs/save";
  const user = new ACI.CognitoUserPool(poolData).getCurrentUser();
  const body = {
    UserId: user.username,
    ProgramName: programName.value || '',
    ProgramJSON: programElem.value || null,
  }

  console.log('Attempting to save program...');
  console.log(body);

  getAuthToken()
  .then(function(token) {
    console.log('Got token: %s', token);
    return fetch(path, createOpts(body, token));
  })
  // fetch(url + path, opts(body))
  .then(response => {
    console.log("Saved function.");
    response.json().then(json => {
      console.log("Response:");
      console.log(json);
      //result.textContent = json.result;
    })
    .catch(err => console.error(err));
  })
  .catch(err => {
    console.log('Got error...');
    console.log(err);
  });
 
}

/*
window.onload = function() {
  console.log("Requesting list of programs");
  const path = "/ListPrograms";
  // try with no opts, I think CORS is default.
  fetch(url + path)
  .then(response => {
    console.log("Got response");
    response.json().then(json => {
      let item;
      console.log(JSON.stringify(json));
      console.log(JSON.stringify(json.Items));
      
      json.Items.forEach(function(program) {
        item = document.createElement('li');
        item.textContent = JSON.stringify(program.Expansion); 
        programsList.appendChild(item);
      });
    })
  })
  .catch(err => {console.log(err)});
}
*/

