import * as actionTypes from '../actions/actions';
import axios from '../../axios';

export const checkoutStart = () => {
    return {
        type: actionTypes.CHECKOUT_START
    }
}

const placeOrderStart = () => {
    return {
        type: actionTypes.PLACE_ORDER_START,
    };
};

const placeOrderSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PLACE_ORDER_SUCCESS,
        orderId: orderId,
        orderData: orderData,
    };
};

const placeOrderError = () => {
    return {
        type: actionTypes.PLACE_ORDER_ERROR,
    };
};

export const placeOrder = (order, token) => {
    return (dispatch) => {
        dispatch(placeOrderStart());
        axios
            .post(`/orders.json?auth=${token}`, order)
            .then((response) => {
                dispatch(placeOrderSuccess(response.data, order));
            })
            .catch((error) => {
                dispatch(placeOrderError());
            });
    };
};

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

const fetchOrdersError = () => {
    return {
        type: actionTypes.FETCH_ORDERS_ERROR,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        let queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios
            .get(`/orders.json${queryParams}`)
            .then((res) => {
                dispatch(fetchOrdersSuccess(res.data));
            })
            .catch((error) => {
                dispatch(fetchOrdersError());
            });
    };
};
