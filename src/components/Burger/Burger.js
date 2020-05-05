import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let transformedIngredients = [];
    for (let key in props.ingredients) {
        for (let i = 0; i < props.ingredients[key]; i++) {
            transformedIngredients.push(
                <BurgerIngredients type={key} key={key + i} />
            );
        }
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top' />
            {transformedIngredients.length > 0 ? (
                transformedIngredients
            ) : (
                <p>please start adding ingredients</p>
            )}
            <BurgerIngredients type='bread-bottom' />
        </div>
    );
};

export default withRouter(burger);
