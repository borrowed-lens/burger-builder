import * as actionTypes from '../actions/actions';

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    userId: null,
    authRedirect: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_REDIRECT:
            return {
                ...state,
                authRedirect: action.path
            }
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                loading: false,
            };
        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                idToken: null,
                userId: null
            }
        default:
            return state;
    }
};

export default reducer;
