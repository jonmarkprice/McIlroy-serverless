const React = require('react');
const { connect } = require('react-redux');
const Banner = require('../components/Banner');
const Overlay = require('./Overlay');
const Program = require('../components/Program');
const Palette = require('../components/Palette');
const Flash = require('../components/Flash');

// const { logout } = require('../actions/user');

const mapStateToProps = state => ({
  username: state.user.name,
  flash: state.flash.flash
});

// This needs to be async and clear the cookie
// Really I should have an API function
// -- or just redirect to /login and let the server do it...
/*
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
}); */

const InterpretterComponent = ({username, flash}) => (
  <div className="interpretter">
    <Banner username={username} />
    <Flash message={flash} />
    <Program />
    <Palette />
    <Overlay />
  </div>
);

const Interpretter = connect(mapStateToProps)(InterpretterComponent);
module.exports = Interpretter;

