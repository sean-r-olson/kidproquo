const UpdateKidReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_KID':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default UpdateKidReducer;