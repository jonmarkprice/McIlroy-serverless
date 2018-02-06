const React = require('react');
const { connect } = require('react-redux');
const logout = require('../actions/async/logout');

class Banner extends React.Component {
  render() {
    const showName = this.props.showName !== undefined
      ? this.props.showName 
      : true;
    const User = (
      <div id="user-control">
        <div id="user-greeting">Hello, {this.props.username}</div>
        <a onClick={this.props.logout}>Log out</a>
      </div>
    );
    const noUser = (
      <div id="user-control">
        <a href="login">Log in</a>
      </div>
    );
    const userControl = this.props.username === null ? noUser : User;
    return (
      <div id="banner">
        <h1 id="title">McIlroy</h1>
        {showName ? userControl : ""}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
});

module.exports = connect(undefined, mapDispatchToProps)(Banner);
