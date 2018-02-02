const React   = require('react');
const { connect } = require('react-redux');
const { handleRegistration } = require('../actions/async/register');

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  // Need a function within the component class so that it has
  // access to refs which are properties under *this*.
  register() {
    const email = this.email.value;
    const password = this.password.value;
    const passwordConf = this.passwordConf.value;
    this.props.onRegister(email, password, passwordConf);
  }

  render() {
    return (
      <form id="registration-form"
        onSubmit={ event => {
          event.preventDefault();
          this.register(); // the ref function
        }}>
        <legend>Register</legend>

        <label className="username" htmlFor="username">
          Username
        </label>
        <input className="username" id="username" name="username"                          type="text" ref={x => { this.email = x; }} />

        <label className="pw" htmlFor="pw">Password</label>
        <input className="pw" id="pw" name="pw" type="password"
               ref={x => { this.password = x; }} />
        
        <label className="pw-conf" htmlFor="pw-conf">
          Confirm password
        </label> 
        <input className="pw-conf" id="pw-conf" name="pwConfirm"
               type="password" ref={x => { this.passwordConf = x; }} />

        <input id="submit" type="submit"/>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRegister: function (email, password, passwordConf) {
    dispatch(handleRegistration(email, password, passwordConf));
  }
});

module.exports = connect(undefined, mapDispatchToProps)(RegistrationForm);
