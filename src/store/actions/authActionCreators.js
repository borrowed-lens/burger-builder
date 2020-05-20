import * as actionTypes from './actions';
import axios from 'axios';

const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START,
    };
};

const signupSuccess = (idToken, localId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: idToken,
        localId: localId
    };
};

const signupError = (error) => {
    return {
        type: actionTypes.SIGNUP_ERROR,
        error: error,
    };
};

export const signup = (email, password, login) => {
    return (dispatch) => {
        dispatch(signupStart());
        let signupData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAkIwAHJwexP4HTbK85SL-7rrt5AT56fw';
        if(login) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAkIwAHJwexP4HTbK85SL-7rrt5AT56fw'
        }
        axios
            .post(
                url,
                signupData
            )
            .then((response) => {
                dispatch(signupSuccess(response.data.idToken, response.data.localId));
            })
            .catch((error) => {
                dispatch(signupError(error.response.data.error));
            });
    };
};
