import * as actionTypes from '../actions/actions';

export const checkoutStart = () => {
    return {
        type: actionTypes.CHECKOUT_START,
    };
};

export const placeOrderStart = () => {
    return {
        type: actionTypes.PLACE_ORDER_START,
    };
};

export const placeOrderSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PLACE_ORDER_SUCCESS,
        orderId: orderId,
        orderData: orderData,
    };
};

export const placeOrderError = () => {
    return {
        type: actionTypes.PLACE_ORDER_ERROR,
    };
};

export const placeOrder = (order, token) => {
    return {
        type: actionTypes.INITIATE_PLACE_ORDER,
        order,
        token,
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersError = () => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.INITIATE_FETCH_ORDERS,
        token,
        userId,
    };
};
