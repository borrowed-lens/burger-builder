import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

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

export function* authSaga({ email, password, login }) {
    yield put(actionCreators.authStart());
    let authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    };
    let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAkIwAHJwexP4HTbK85SL-7rrt5AT56fw';
    if (login) {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAkIwAHJwexP4HTbK85SL-7rrt5AT56fw';
    }
    try {
        let response = yield axios.post(url, authData);
        yield put(
            actionCreators.authSuccess(
                response.data.idToken,
                response.data.localId
            )
        );
        const expiryDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('expiryDate', expiryDate);
        yield put(actionCreators.authTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actionCreators.authError(error.response.data.error));
    }
}
