const { getAuthToken, getUser } = require('../helpers/cognito');
const { createOpts } = require('../helpers/misc');

// Elements
const form = document.getElementById('program-form');
const programElem = document.getElementById('program');
const result = document.getElementById('result');
const saveButton = document.getElementById('save');
const programsList = document.getElementById('programs-list');
const programName = document.getElementById('program-name');

saveButton.onclick = function(event) {
  console.log('Submitting request.');
  event.preventDefault();
  const path = "programs/save";
  const user = getUser();
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
  const user = getUser();
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

