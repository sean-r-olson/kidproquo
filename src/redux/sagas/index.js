import { all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

// Our Sagas
import familySaga from './familySaga';
import calendarSaga from './calendarSaga';
import groupSaga from './groupSaga';
import profileSaga from './groupSaga';
import kidSaga from './kidSaga';
import hourSaga from './hourSaga';
import feedSaga from './feedSaga';
import notificationsSaga from './notificationsSaga'
//Twilio
import textSaga from './textSaga';



// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),

    // Our Sagas
    familySaga(),
    calendarSaga(),
    groupSaga(),
    profileSaga(),
    kidSaga(),
    hourSaga(),
    feedSaga(),
    notificationsSaga(),
    //Twilio
    textSaga(),
    
  ]);
}
