const defaultState = {flash: null}

module.exports = function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_FLASH':
      return {flash: action.message};
    case 'CLEAR_FLASH':
      return {flash: null};
    default:
      return state;
  }
};
