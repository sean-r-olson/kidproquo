import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

function* feedSaga () {
  yield takeEvery('FETCH_YOUR_FEED', getYourFeed)
  yield takeEvery('CLAIM_EVENT', claimEvent)
  yield takeEvery('CONFIRM_EVENT', confirmEvent)
  yield takeEvery('ADD_REQUEST', addRequest)
  yield takeEvery('CANCEL_REQUEST', cancelRequest)
  yield takeEvery('CANCEL_CONF_REQUEST', cancelConfirmedRequest)
  yield takeEvery('FETCH_HOURS_USED', fetchHoursUsed)
  yield takeEvery('FETCH_HOURS_GAINED', fetchHoursGained)
}

function* getYourFeed () {
  try {
    const response = yield axios.get('/feed/needed');
    yield put ({type: 'SET_YOUR_NEEDED_FEED', payload: response.data});
    console.log('in get your feed with:', response.data)
    // yield put ({type: 'SET_YOUR_OFFERED_FEED', payload: responseTwo.data});
   
  }
  catch(error) {
    console.log('Error with getting your feed from Server/DB', error);
    
  }
}

//claims event and shows up on user page of the event creator
function* claimEvent (action) {
  console.log('this is action.payload', action.payload)

  try {
    yield axios.put(`/feed/update/${action.payload.id}`, action.payload)
    
    let event_date = {
      event_date: action.payload.event_date
    }
    console.log(event_date)
    console.log('this is action.payload.event_date', action.payload.event_date)
    yield put({type: 'FETCH_EVENTS', payload: event_date})
    yield put({ type: 'FETCH_GROUP', payload: action.payload.group_id });
    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: `You have claimed the ${action.payload.requester_name}'s request for ${action.payload.event_time_start} - ${action.payload.event_time_end} on ${action.payload.event_date}`,
      showConfirmButton: false,
      timer: 4000,
    }))
  }
  catch(error) {
    console.log('Error with updating event in the DB', error);
  }
}

//confirms event and shows up on user page of the event claimer
function* confirmEvent(action) {
  console.log('in confirm event with', action.payload)
  try {
    yield axios.put(`/feed/updateConfirm/${action.payload.id}`, action.payload)
    // let event_date = {
    //   event_date: action.payload.event_date
    // }
    yield put({
      type: 'FETCH_GROUP_NOTIFICATIONS',
      payload: {
        group_id: {
          id: action.payload.group_id.id
        },
        user_id: action.payload.user_id
      }
    })
    // console.log('this is action.payload.event_date', action.payload.event_date);
    // yield put({ type: 'FETCH_EVENTS', payload: event_date })
    yield put({ type: 'FETCH_HOURS_USED', payload: action.payload.family_id });
   yield put({ type: 'FETCH_HOURS_GAINED', payload: action.payload.family_id });
  }
  catch (error) {
    console.log('Error with updating event in the DB', error);
  }
}

function* addRequest (action) {
  console.log('IN FEED SAGA: this is action.payload', action.payload)
  try {
    yield axios.post(`/feed/addRequest`, action.payload)
    console.log('in ADD REQUEST - FEEDSAGA with:', action.payload);
    yield put({type: 'FETCH_EVENTS', payload: action.payload})
    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Request Created!',
      showConfirmButton: false,
      timer: 1500,
    }))
  }
  catch(error) {
    console.log('Error with adding request to the DB', error);
  }
}

function* cancelRequest (action) {

  try {
    yield axios.delete(`/feed/cancelRequest/${action.payload.id}`)
    console.log('in CANCEL REQ - FEED SAG with:', action.payload);
    yield put({ type: 'FETCH_GROUP', payload: action.payload.group_id})
    // yield put(Swal.fire({
    //   position: 'center',
    //   type: 'success',
    //   title: 'Request Canceled!',
    //   showConfirmButton: false,
    //   timer: 1500,
    // }))
  }
  catch (error) {
    console.log('Error with CANCELING REQUEST (FEED SAGA)', error);
  }
}

function* cancelConfirmedRequest(action) {
  try {
    yield axios.delete(`/feed/cancelRequest/${action.payload.id}`)
    console.log('in CANCEL CONFIRMED SAG with:', action.payload);
    yield put({
      type: 'FETCH_GROUP_NOTIFICATIONS',
      payload: {
        group_id: {
          id: action.payload.group_id.id
        },
        user_id: action.payload.user_id
      }
    })
    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Request Canceled!',
      showConfirmButton: false,
      timer: 1500,
    }))
  }
  catch (error) {
    console.log('Error with CANCELING CONFIRMED REQUEST (FEED SAGA)', error);
  }
}

function* fetchHoursUsed (action) {
  try {
    const response = yield axios.get(`/feed/hoursUsed/${action.payload}`);
    yield put ({type: 'SET_HOURS_USED', payload: response.data});
    console.log('in fetch hours used, back from server with:', response.data)
  }
  catch(error) {
    console.log('Error with getting your hours used from Server/DB', error);
    
  }
}

function* fetchHoursGained (action) {
  try {
    const response = yield axios.get(`/feed/hoursGained/${action.payload}`);
    yield put ({type: 'SET_HOURS_GAINED', payload: response.data});
    console.log('in fetch hours gained, back from server with:', response.data)   
  }
  catch(error) {
    console.log('Error with getting your hours gained from Server/DB', error);
    
  }
}

export default feedSaga;