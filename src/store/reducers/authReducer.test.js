import reducer from './authReducer';
import * as actionTypes from '../actions/actions';

describe('authReducer', () => {
    it('should return initialState if no state is passed', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            idToken: null,
            userId: null,
            authRedirect: '/',
        });
    });
    it('store token if authenticated', () => {
        expect(
            reducer(
                {
                    loading: false,
                    error: null,
                    idToken: null,
                    userId: null,
                    authRedirect: '/',
                },
                {
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: 'sample-token',
                    userId: 'sampleid',
                }
            )
        ).toEqual({
            loading: false,
            error: null,
            idToken: 'sample-token',
            userId: 'sampleid',
            authRedirect: '/',
        });
    });
    it('store token if authenticated', () => {
        expect(
            reducer(
                undefined,
                {
                    type: actionTypes.LOGOUT,
                }
            )
        ).toEqual({
            loading: false,
            error: null,
            idToken: null,
            userId: null,
            authRedirect: '/',
        });
    });
});
