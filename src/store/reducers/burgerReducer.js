import * as actionTypes from '../actions/actions';

const INGREDIENT_PRICES = {
    salad: 30,
    meat: 60,
    cheese: 20,
    bacon: 50,
};

const initialState = {
    ingredients: null,
    totalPrice: 150,
    error: false,
    buildingBurger: false
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
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredient],
                    buildingBurger: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]:
                        state.ingredients[action.ingredient] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredient],
                buildingBurger: true
            };
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 150,
                error: false,
            };
        case actionTypes.FETCH_INGREDIENTS_ERROR:
            return {
                ...state,
                error: true,
                buildingBurger: false
            };
        default:
            return state;
    }
};

export default reducer;
