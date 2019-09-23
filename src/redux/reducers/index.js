import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';

//our reducers
import kid from './kidReducer';
import family from './familyReducer';
import calendar from './calendarReducer';
import feedNeed from './feedNeedReducer';
import feedOffered from './feedOfferedReducer';
import hour from './hourReducer';
import profile from './profileReducer';
import group from './groupReducer';
import userGroups from './userGroupsReducer';
import groupFam from './groupFamReducer';
import notifications from './notificationsReducer';
import updateKid from './updateKidReducer';
import hoursUsed from './hoursUsedReducer';
import hoursGained from './hoursGainedReducer';
import userFamily from './userFamilyReducer'
import singleFam from './singleFamReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in

  // our reducers
  kid,
  family,
  calendar,
  feedNeed,
  feedOffered,
  hour,
  profile,
  group,
  userGroups,
  groupFam,
  notifications,
  updateKid,
  hoursUsed,
  hoursGained,
  userFamily,
  singleFam

});

export default rootReducer;
