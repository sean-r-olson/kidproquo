import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const responseThree = yield axios.get('/help');
    console.log('user /helpresponseThree:', responseThree.data)
    yield put({ type: 'SET_USER_FAMILY', payload: responseThree.data });


    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    console.log('IN USER SAGA WITH RESPONSE.DATA:', response.data)
    //getting user groups for later user i.e. 'group view'
    const responseTwo = yield axios.get('/group');
    console.log('user groups responseTwo:',responseTwo.data)
    yield put({ type: 'SET_GROUPS', payload: responseTwo.data });


    //const responseFour = yield axios.get(`/feed/hoursUsed/${responseThree.data.id}`);
    //console.log('user /feed response four:', responseFour.data)
    //yield put({ type: 'SET_HOURS_USED', payload: responseFour.data });




  
    // yield put({ type: 'FETCH_HOURS_USED', payload: this.props.reduxStore.family.id});
    // yield put({ type: 'FETCH_HOURS_GAINED', payload: this.props.reduxStore.family.id});

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
