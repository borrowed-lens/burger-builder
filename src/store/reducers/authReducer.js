import * as actionTypes from '../actions/actions';

const initialState = {
    loading: false,
    error: null,
    idToken: '',
    userId: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                idToken: action.idToken,
                userId: action.localId,
                loading: false,
            };
        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
