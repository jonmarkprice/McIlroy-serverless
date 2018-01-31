const React   = require('react');
const Banner  = require('./Banner');
const Flash   = require('./Flash');
const LoginForm = require('./LoginForm');

const { connect } = require('react-redux');

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
