import * as actionTypes from '../actions/actions';

const initialState = {
    orders: null,
    loading: false,
    error: false,
    orderPlaced: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_START:
            return {
                ...state,
                orderPlaced: false
            }
        case actionTypes.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                orders: {
                    [action.orderId]: { ...action.orderData },
                },
                loading: false,
                orderPlaced: true
            };
        case actionTypes.PLACE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.PLACE_ORDER_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: {
                    ...action.orders,
                },
                error: false
            };
        case actionTypes.FETCH_ORDERS_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;
