import { put, takeEvery, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

function* calendarSaga () {

  yield takeEvery('FETCH_EVENTS', fetchEvents)
  yield takeEvery('REMOVE_EVENT', removeEvent)

}

function* fetchEvents (action) {
  console.log('action.payload is', action.payload);
  try {
    const response = yield axios.get(`/calendar?event_date=${action.payload.event_date}`)
    console.log('this is response.data',response.data)
    yield put ({type: 'SET_CALENDAR_EVENTS', payload: response.data});
  }
  catch(error) {
    console.log('Error with fetching events from db', error);
    
  }

}

function* removeEvent(action){
  try{
    yield axios.delete(`/feed/cancelRequest/${action.payload.id}`)
    yield put({type: 'FETCH_EVENTS', payload: action.payload})
  }
  catch(error){
    console.log('Error with removing EVENT from DB (in removeEvent)', error)
  }
}

export default calendarSaga;