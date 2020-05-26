import { put, delay } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions';
import * as actionCreators from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expiryDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.LOGOUT,
    });
}

export function* authTimeoutSaga({ expirationTime }) {
    yield delay(expirationTime * 1000);
    yield put(actionCreators.logout());
}
