import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions';
import {
    logoutSaga,
    authTimeoutSaga,
    authSaga,
    authCheckSaga,
} from './authSagas';
import { fetchIngredientsSaga } from './burgerSagas';

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.INITIATE_AUTH_TIMEOUT, authTimeoutSaga);
    yield takeEvery(actionTypes.INITIATE_AUTH, authSaga);
    yield takeEvery(actionTypes.INITIATE_AUTH_CHECK, authCheckSaga);
}

export function* watchBurgerSaga() {
    yield takeEvery(
        actionTypes.INITIATE_FETCH_INGREDIENTS,
        fetchIngredientsSaga
    );
}
