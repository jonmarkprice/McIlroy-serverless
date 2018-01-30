const React   = require('react');
const Banner  = require('./Banner');
const Flash   = require('./Flash');

const { connect } = require('react-redux');

// TODO:
// [ ] Hook up with Redux
//  - [ ] use async actions for login
//  - [ ] This may require a change to renderPage...
//      Or maybe I can still do it by wrapping the element
//      in a <Provider />...
//    However, it probably makes sense to abstract some of this...
//    I will always need Provider and createStore
class LoginForm extends React.Component {
  render() {
    return (
      <div id="login-component">
        <form id="login-form">
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

class LoginPage extends React.Component {
  render() {
    return (
      <div id="page">
        <Banner username="" showName={false} />
        <Flash message={this.props.flash} />
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({flash: state.flash});

module.exports = connect(mapStateToProps)(LoginPage);
