// Elements
const form = document.getElementById('program-form');
const programElem = document.getElementById('program');
const result = document.getElementById('result');
const saveButton = document.getElementById('save');
const programsList = document.getElementById('programs-list');

// Request data
const url  = 'https://awi4wral7b.execute-api.us-east-2.amazonaws.com/prod';

const opts = {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  mode: 'cors'
};

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

saveButton.onclick = function() {
  const path = "/SaveProgram";
  const program = programElem.value || null;
  console.log('Attempting to save program...');
  fetch(url + path, Object.assign({}, opts, {body: program}))
  .then(response => {
    console.log("Saved function.");
    response.json().then(json => {
      console.log("Response:");
      console.log(json);
      //result.textContent = json.result;
    })
    .catch(err => console.error(err));
    // succ header
    // succ style
  })
  .catch(err => {
    console.log('Got error...');
    console.log(err);
    // result.textContent = err.message;
    // error header
    // error style
  });
 
}

form.onsubmit = function(event) {
  const path = "/RunProgram";

  console.log('Submitting request.');
  event.preventDefault();

  const program = programElem.value;

  console.log('Sending program: ');
  console.log(program);

  const withBody = Object.assign({}, opts, {body: program});

  fetch(url + path, withBody)
  .then(response => {
    console.log('Got response...');
    response.json().then(json => {
      console.log(json);
      result.textContent = json.result;
    })
    .catch(err => console.error(err));
    // succ header
    // succ style
  })
  .catch(err => {
    console.log('Got error...');
    console.log(err);
    result.textContent = err.message;
    // error header
    // error style
  });
}


