import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions/index';
import axios from '../../axios';

export function* placeOrderSaga({ order, token }) {
    yield put(actionCreators.placeOrderStart());
    try {
        const response = yield axios.post(`/orders.json?auth=${token}`, order);
        yield put(actionCreators.placeOrderSuccess(response.data, order));
    } catch (error) {
        yield put(actionCreators.placeOrderError());
    }
}

export function* fetchOrdersSaga({ token, userId }) {
    yield put(actionCreators.fetchOrderStart());
    let queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    try {
        const response = yield axios.get(`/orders.json${queryParams}`);
        yield put(actionCreators.fetchOrdersSuccess(response.data));
    } catch (error) {
        yield put(actionCreators.fetchOrdersError());
    }
}
