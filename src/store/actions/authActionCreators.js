import * as actionTypes from './actions';

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actionTypes.INITIATE_LOGOUT,
    };
};

export const authCheck = () => {
    return {
        type: actionTypes.INITIATE_AUTH_CHECK
    };
};

export const authTimeout = (expirationTime) => {
    return {
        type: actionTypes.INITIATE_AUTH_TIMEOUT,
        expirationTime,
    };
};

export const auth = (email, password, login) => {
    return {
        type: actionTypes.INITIATE_AUTH,
        email,
        password,
        login,
    };
};
