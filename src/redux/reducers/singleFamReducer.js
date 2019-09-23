const singleFamReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CLICK_FAMILY':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default singleFamReducer;