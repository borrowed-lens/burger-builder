import * as actionTypes from './actions';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient,
    };
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient,
    };
};

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients: ingredients,
    };
};

export const fetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR,
    };
};

export const fetchIngredients = () => {
    return {
        type: actionTypes.INITIATE_FETCH_INGREDIENTS,
    };
};
