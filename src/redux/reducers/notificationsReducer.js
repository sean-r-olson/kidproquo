// Actually named group and holds group feed info
const notificationsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GROUP_NOTIFICATIONS':
            return action.payload;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default notificationsReducer;