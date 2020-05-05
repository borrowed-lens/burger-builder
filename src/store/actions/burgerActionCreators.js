import * as actionTypes from './actions';
import axios from '../../axios';

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

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

const fetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get('/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsError());
            });
    };
};
