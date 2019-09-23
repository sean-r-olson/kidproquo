
// Actually named group and holds group feed info
const groupFamReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FAM_GROUP':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default groupFamReducer;