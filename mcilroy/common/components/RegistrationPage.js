const React   = require('react');
const { connect } = require('react-redux');
const Banner  = require('./Banner');
const Flash   = require('./Flash');
const RegistrationForm = require('./RegistrationForm');

class RegistrationPage extends React.Component {
  render() {
    return (
      <div id="page">
        <Banner username="" showName={false} />
        <Flash message={this.props.flash} />
        <RegistrationForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({flash: state.flash});

module.exports = connect(mapStateToProps)(RegistrationPage);
