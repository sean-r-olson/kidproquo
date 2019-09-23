const hoursUsedReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_HOURS_USED':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default hoursUsedReducer;