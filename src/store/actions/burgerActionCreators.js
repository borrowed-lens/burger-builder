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

const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients: ingredients,
    };
};

const fetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR,
    };
};

export const fetchIngredients = () => {
    return (dispatch) => {
        axios
            .get('/ingredients.json')
            .then((response) => {
                dispatch(fetchIngredientsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientsError());
            });
    };
};
