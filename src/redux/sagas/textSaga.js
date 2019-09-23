import { takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* sendText(action) {
    try {
        yield Axios.post('/api/text', action.payload);

    } catch (error) {
        console.log('Error with Sending Text:', error);
    }
}

function* sendCancelText(action) {
    try {
        yield Axios.post('/api/text/cancel', action.payload);

    } catch (error) {
        console.log('Error with Sending cancel Text:', error);
    }
}

function* sendConfirmText(action) {
    try {
        yield Axios.post('/api/text/confirm', action.payload);

    } catch (error) {
        console.log('Error with Sending confirm Text:', error);
    }
}

function* sendCancelConfirmedText(action) {
    try {
        yield Axios.post('/api/text/cancelConfirmed', action.payload);

    } catch (error) {
        console.log('Error with Sending cancelConfirmed Text:', error);
    }
}



function* textSaga() {
    yield takeEvery('SEND_TEXT', sendText);
    yield takeEvery('SEND_CANCEL_TEXT', sendCancelText);
    yield takeEvery('SEND_CONFIRM_TEXT', sendConfirmText);
    //this cancel is different as it is designated for cancelling confirmed events
    yield takeEvery('SEND_CANCELCONFIRMED_TEXT', sendCancelConfirmedText);



}

export default textSaga;