const React = require('react');
const EditProgram = require('./EditProgram');
const { connect } = require('react-redux');
const dbg = require('../dbgconf')('containers:edit-new');
const { unsetEditing
      , displayEditMessage } = require('../actions/edit');
const { addProgram } = require('../actions/saved');
const saveProgram = require('../actions/async/saveProgram');
const { checkName } = require('../helpers');

const mapStateToProps = state => ({
  program   : state.edit.program,
  programs  : state.saved.programs,
  message   : state.edit.message,
  username  : state.user.name,
  stage     : state.env.stage
});

const mapDispatchToProps = dispatch => ({
  done: () => {
    dispatch(unsetEditing());
  },
  save: (username, name, program, stage) => {
    dbg('username %s', username)
    dispatch(saveProgram(username, name, program, stage));
  },
  addToUI: (name, program) => {
    dispatch(addProgram(name, program));
  },
  displayMessage: msg => {
    dispatch(displayEditMessage(msg));
  }
});

class NewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nameUpdate = this.nameUpdate.bind(this);
  }

  nameUpdate() {
    dbg("-- FORM SUMBITTED --");
    const name = this.nameField.value;
    dbg(`new name: ${name}`);

    dbg(this.props.programs);
    const nameCheck = checkName(name, this.props.programs);
   
    if (nameCheck.ok) {
      dbg('saving...');
      this.props.save(this.props.username, name, this.props.program,
                      this.props.stage);
      this.props.addToUI(name, this.props.program);
      this.props.done();
    } else {
      this.props.displayMessage(nameCheck.reason);
    }
  }
 
  render() {
    return (
      <div id="overlay">
        <form className="overlay-form" id="new-form"
          onSubmit={event => {
            event.preventDefault();
            this.nameUpdate(); // call ref. function
          }}> 
          <h2>New Program</h2>
          <label id="overlay-name-label">Name</label>
          <input type="text" id="overlay-name-field"
            ref={x => { this.nameField = x; }} />

          <EditProgram />

          <input type="submit" id="save-edits" value="Save" />
          <button id="cancel-edits" onClick={this.props.done}>
            Cancel
          </button>
          <p id="edit-message">{this.props.message}</p>
        </form>
      </div>
    );
  }
}

const EditNew = connect(mapStateToProps, mapDispatchToProps)(NewComponent);
module.exports = EditNew;
