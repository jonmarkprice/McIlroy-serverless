const defaultState = {flash: null}

module.exports = function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_FLASH':
      return {flash: action.message};
    default:
      return state;
  }
};
