import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    console.log(props);
    let ingredientOutput = [];
    for (let key in props.ingredients) {
        ingredientOutput.push(
            <span
                key={key}
                style={{
                    padding: '0px 5px',
                    margin: '0px 5px',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                }}>
                {key} - <strong>{props.ingredients[key]}</strong>
            </span>
        );
    }
    return (
        <div className={classes.Order}>
            <p
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    lineHeight: '30px',
                }}>
                ingredients: {ingredientOutput}
            </p>
            <p>
                total price: <strong>Rs. {props.price}/-</strong>
            </p>
        </div>
    );
};
export default order;
