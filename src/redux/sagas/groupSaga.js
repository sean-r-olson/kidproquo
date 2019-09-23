import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

function* groupSaga () {
    yield takeEvery('FETCH_GROUP', fetchGroup);
    yield takeEvery('FETCH_FAM_GROUP', fetchFamGroup)
}

//Get group feed info for groupview
function* fetchGroup(action) {
    try {
        console.log('In fetch group saga action.payload:', action.payload.id)
        const response = yield Axios.get(`/group/${action.payload.id}`);
        console.log('back from group db response.data',response.data);
        yield put({ type: 'SET_GROUP', payload: response.data })
    } catch (error) {
        console.log('error fetching group data', error)
    }
}
//Gets all families that belong to group view
function* fetchFamGroup(action) {
    try {
        console.log('In fetch fam group saga action.payload:', action.payload.id)
        const response = yield Axios.get(`/group/fam/${action.payload.id}`);
        console.log('back from fam group db response.data', response.data);
        yield put({ type: 'SET_FAM_GROUP', payload: response.data })
    } catch (error) {
        console.log('error fetching fam group data', error)
    }
}

export default groupSaga;