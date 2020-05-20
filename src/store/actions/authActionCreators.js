import * as actionTypes from './actions';
import axios from 'axios';

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    };
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
    };
};

const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT,
    };
};

export const authCheck = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const expiryDate = new Date(localStorage.getItem('expiryDate'));
        if (!token) {
            dispatch(logout());
        } else {
            if (expiryDate > new Date()) {
                dispatch(authSuccess(token, expiryDate));
                dispatch(
                    authTimeout(
                        (expiryDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(logout());
            }
        }
    };
};

const authTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, login) => {
    return (dispatch) => {
        dispatch(authStart());
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
        axios
            .post(url, authData)
            .then((response) => {
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                const expiryDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiryDate', expiryDate);
                dispatch(authTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authError(error.response.data.error));
            });
    };
};
