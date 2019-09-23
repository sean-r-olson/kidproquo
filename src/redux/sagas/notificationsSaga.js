import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* groupNotificationsSaga() {
    yield takeEvery('FETCH_GROUP_NOTIFICATIONS', fetchGroupNotifications);
}

//Get notifications for user home page that pertain to this group id
function* fetchGroupNotifications(action) {
    try {
        console.log('In fetch group notiofications saga with:', action.payload)
        const response = yield Axios.get(`/group/notifications/${action.payload.group_id.id}`, action.payload);
        console.log('back from group notifications db response.data', response.data);
        yield put({ type: 'SET_GROUP_NOTIFICATIONS', payload: response.data })
    } catch (error) {
        console.log('error fetching group notifications data', error)
    }
}


export default groupNotificationsSaga;