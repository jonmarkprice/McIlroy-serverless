const React   = require('react');
const { connect } = require('react-redux');

// TODO: re-enable
// const { handleLogIn } = require('../actions/user-async');

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
    const {username, password} = this.props;
    this.props.onLogIn(username, password); // TODO: async event
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
          <input name="email"
                 id="email"
                 type="text"/>
          <label htmlFor="password" id="password-label">Password</label>
          <input id="password" type="password" name="password" />

          <div>
            <input id="submit" type="submit" value="Log in" />
            <span>or <a href="/register">Create an account</a></span>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogIn: (username, password) => {
    // TODO - write async action
    // dispatch(handleLogIn(username, password));
    dispatch({type: 'SET_FLASH', message: 'testing testing...'});
  }
});

module.exports = connect(undefined, mapDispatchToProps)(LoginForm);
