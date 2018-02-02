const React   = require('react');
const { connect } = require('react-redux');

// TODO: re-enable
const { handleLogIn } = require('../actions/async/login');

// TODO:
// [ ] Hook up with Redux
//  - [ ] use async actions for login
//  - [ ] This may require a change to renderPage...
//      Or maybe I can still do it by wrapping the element
//      in a <Provider />...
//    However, it probably makes sense to abstract some of this...
//    I will always need Provider and createStore
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    const email = this.email.value;
    const password = this.password.value;
    this.props.onLogIn(email, password); // TODO: async event
  }

  render() {
    return (
      <div id="login-component">
        <form id="login-form"
          onSubmit={event => {
            event.preventDefault();
            this.logIn(); // call ref. function
          }}>
          <legend>Log In</legend>

          <label htmlFor="username" id="username-label">Email</label>
          <input name="email" id="email" type="text"
                 ref={x => { this.email = x; }} />
          <label htmlFor="password" id="password-label">Password</label>
          <input id="password" type="password" name="password" 
                 ref={x => { this.password = x; }} />

          <div>
            <input id="submit" type="submit" value="Log in" />
            <span>or <a href="register">Create an account</a></span>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogIn: (username, password) => {
    // TODO - write async action
    dispatch(handleLogIn(username, password));
    // dispatch({type: 'SET_FLASH', message: 'testing testing...'});
  }
});

module.exports = connect(undefined, mapDispatchToProps)(LoginForm);
