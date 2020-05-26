import { put, takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions';

function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expiryDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.LOGOUT,
    });
}

export function* watchLogout() {
    yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga)
}
