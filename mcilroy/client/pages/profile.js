console.log('Loading cognito script...');

// TODO 
// I need to somehow get the user name of the user who is logged in..
// Then I can provide a log-out link.
const ACI = require('amazon-cognito-identity-js');
const { poolData } = require('../../common/actions/helpers/cognito');
const appConfig = require('../cognito/config');

const userPool = new ACI.CognitoUserPool(poolData);

function getAuthToken() {
  return new Promise(function (resolve, reject) {
    const user = userPool.getCurrentUser();

    console.log("User %O", user);

    if (user) {
      document.getElementById('user').textContent = user.username;

      user.getSession(function(err, session) {
        if (err) {
          reject(err);
        } else if (!session.isValid()) {
          resolve(null);
        } else {
          resolve(session.getIdToken().getJwtToken());
        }
      });
    } else {
      resolve(null);
    }
  });
}

window.onload = function() {
document.getElementById('sign-out').onclick = function(event) {
  event.preventDefault();
  const user = userPool.getCurrentUser();
  if (user) {
    user.signOut();
  }

 getAuthToken()
  .then(function (token) {
    console.log("Authentication token");
    console.log(token);
  })
  .catch(function (err) { alert(err); });
}
}

////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  getAuthToken()
  .then(function(token) {
    // const message = document.getElementById('message');
    if (token) {
      //const tokenDisplay = document.getElementById('token');
      //tokenDisplay.textContent = token;
      //tokenDisplay.classList.toggle('hidden');
      //message.textContent = "You are authenticated.";
			
			const testButton = document.getElementById('test');
			const display    = document.getElementById('test-result');
			const opts = {
				method: 'POST',
				mode: 'cors',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: token
				}),
				body: JSON.stringify({source: '/profile', test: true})
			};
			//const url = appConfig.api.invokeUrl + 'auth';
      const url = 'auth';

			testButton.onclick = function() {
				console.log('Fetching...');

				fetch(url, opts)
				.then(response => {
					console.log("Parsing response...");
					response.text().then(text => {
						console.log("Response:");
						console.log(text);
						display.textContent = text; //JSON.stringify(json);
					})
					.catch(err => console.error(err));
				})
				.catch(err => {
					console.log('Got error...');
					console.log(err);
					display.textContent = "Error!";
				});
			}
    } else {
      message.textContent = "Auth. token not found."
    }
  })
  .catch(function(err) {
    console.log("Auth token request error: %O", err);
  });
};

