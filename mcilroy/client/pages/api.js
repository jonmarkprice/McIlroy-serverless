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
const { createOpts } = require('../helpers/token');

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
  .then(response => {
    response.json().then(json => {
      console.log("Response: %o", json);
    })
    .catch(err => console.error(err));
  })
  .catch(err => {
    console.log('Got error..., %o', err);
  });
 
}

window.onload = function() {
  console.log("Requesting list of programs");
  const user = new ACI.CognitoUserPool(poolData).getCurrentUser();
  const body = { UserId: user.username };
  getAuthToken()
  .then(token => {
    return fetch('programs/fetch', createOpts(body, token));
  })
  .then(res => {
    console.log('Got response...');
    res.json().then(parsed => {
      const elem = document.getElementById('program-dump');
      elem.textContent = JSON.stringify(parsed, null, 3);
    })
    .catch(err => {
      console.log('Error parsing response');
      console.log(err);
    });
  })
  .catch(err => {
    console.log('Error fetching programs');
    console.log(err);
  });
};

// Old version
  /*
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
*/

