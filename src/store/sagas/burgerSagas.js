import { put } from 'redux-saga/effects';
import axios from '../../axios';

import * as actionCreators from '../actions/index';

export function* fetchIngredientsSaga() {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actionCreators.fetchIngredientsSuccess(response.data));
    } catch (error) {
        yield put(actionCreators.fetchIngredientsError());
    }
}
