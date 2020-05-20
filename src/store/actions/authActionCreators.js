import * as actionTypes from './actions';
import axios from 'axios';

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

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
    return {
        type: actionTypes.LOGOUT,
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
                dispatch(authTimeout(response.data.expiresIn));
            })
            .catch((error) => {
                dispatch(authError(error.response.data.error));
            });
    };
};
