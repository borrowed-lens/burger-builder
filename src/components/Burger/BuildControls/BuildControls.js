import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = (props) => {
    let controls = [
        { label: 'salad', type: 'salad' },
        { label: 'cheese', type: 'cheese' },
        { label: 'bacon', type: 'bacon' },
        { label: 'meat', type: 'meat' },
    ];
    return (
        <div className={classes.BuildControls}>
            <div className={classes.Price}>
                current price: Rs.{props.price}/-
            </div>
            {controls.map((ctrl) => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        more={() => {
                            props.addIngredients(ctrl.type);
                        }}
                        less={() => {
                            props.removeIngredients(ctrl.type);
                        }}
                        disabled={props.ingredientsDisabled[ctrl.type] === 0}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={props.disabled}
                onClick={props.showSummary}>
                ORDER NOW!
            </button>
        </div>
    );
};
export default buildControls;
