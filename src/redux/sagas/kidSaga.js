import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';


// Master Root generator function
function* kidSaga() {
  yield takeEvery('ADD_NEW_KID', addNewKid)
  yield takeEvery('UPDATE_KID_TO_DB', updateKid)
}

// adds new kid based on family id and additional data
function* addNewKid(action) {
  try {

    yield axios.post('/kid/addKid', action.payload)

    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: `${action.payload.first_name} ${action.payload.last_name} has been added to your family`,
      showConfirmButton: false,
      timer: 1500
    }))

  }
  catch (error) {
    console.log('Error with posting KID to DB', error)

  }
}

// update current kid with family id and additional data that will
// be modified in the DB
function* updateKid(action) {

  try {
    yield axios.put(`kid/update/${action.payload.id}`, action.payload);

    yield put({ type: 'FETCH_KIDS', payload: action.payload.user_id });

    yield put(Swal.fire({
      position: 'center',
      type: 'success',
      title: `${action.payload.first_name}'s card has been updated`,
      showConfirmButton: false,
      timer: 1500
    }))
  }
  catch (error) {
    console.log('Unable to Update Kid in DB', error)
  }
}
export default kidSaga;