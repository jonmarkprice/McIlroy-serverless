const defaultState = {flash: 'Hello Redux!'}

function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_FLASH':
      return {flash: action.message};
    default:
      return state;
  }
};

module.exports = loginReducer;
