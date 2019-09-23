const feedOfferedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_YOUR_OFFERED_FEED':
      return action.payload;
    default:
      return state;
  }
};



// user will be on the redux state at:
// state.user
export default feedOfferedReducer;