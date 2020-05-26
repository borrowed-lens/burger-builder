import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions';
import { logoutSaga, authTimeoutSaga, authSaga } from './authSagas';

export function* watchSaga() {
    yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.INITIATE_AUTH_TIMEOUT, authTimeoutSaga);
    yield takeEvery(actionTypes.INITIATE_AUTH, authSaga);
}
