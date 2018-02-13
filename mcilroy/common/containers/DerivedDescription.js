const React = require('react');
const { connect } = require('react-redux');
const ProgramRow  = require('../components/ProgramRow');
const { setEditing } = require('../actions/edit');
const deleteProgram = require('../actions/async/deleteProgram');
const { prop } = require('ramda');
const dbg = require('../dbgconf')('containers:derived-description');

const mapStateToProps = state => ({
  program: prop('program',
            state.saved.programs[state.displayed.id]) || [],
  name: prop('name', 
          state.saved.programs[state.displayed.id]) || '<deleted>',
  id: state.displayed.id,
  username  : state.user.name,
  stage: state.env.stage
});

const mapDispatchToProps = dispatch => ({
  edit: (id, name, program) => {
    dbg(`mapping setEding with id ${id}`);
    dispatch(setEditing(id, name, program));
  },
  del: (username, id, name, stage) => {
    dbg(`mapping delete with id, name, user (${id}, ${name}, ${username}).`);
    dispatch(deleteProgram(username, id, name, stage));
  }
});

class Container extends React.Component {
  render() {
    const {username, id, name, program, edit, del, stage} = this.props;
    dbg('Username: %s', username);
    return (
      <div id="information" className="box">
        <h2>Info</h2>
        <button id="edit-program" onClick={() => edit(id, name, program)}>
          Edit
        </button>
        <button id="delete-program"
                onClick={() => del(username, id, name, stage)}>
          Delete
        </button>
        <h3 id="function-name">{name}</h3>
        <p>Definition</p>
        <ProgramRow program={program} />
    </div>     
    );
  }
}

// TODO: connect for Edit button
const DerivedDescription = connect(mapStateToProps, mapDispatchToProps)
  (Container);

module.exports = DerivedDescription;
