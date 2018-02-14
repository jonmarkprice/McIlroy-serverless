const { getUser } = require('../../cognito');

// async action
module.exports = function() {
  return function (dispatch) {
    getUser().signOut();
    
    // Redirect to server logout on server.
    // [here] -> /logout -> /login
    // or, can delete cookies from client and do an AJAX call
    // to delete in database, then do a client-side redirect to /login
    // [here] -> fetch(/logout) -> /login

    window.location.href = "/dev/sessions/logout";
  }
};

