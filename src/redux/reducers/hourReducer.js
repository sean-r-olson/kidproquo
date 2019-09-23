const hourReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HOUR':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default hourReducer;