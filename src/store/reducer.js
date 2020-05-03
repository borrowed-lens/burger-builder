import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 30,
    meat: 60,
    cheese: 20,
    bacon: 50,
};


const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0,
    },
    totalPrice: 150,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            };
        default:
            return state;
    }
};

export default reducer;
