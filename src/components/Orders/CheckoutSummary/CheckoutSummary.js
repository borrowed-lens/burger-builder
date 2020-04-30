import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';

const checkoutSummary = (props) => (
    <>
        <div className={classes.CheckoutSummary}>
            <p>Hope you'll enjoy this delicious burger!</p>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
        </div>
    </>
);
export default checkoutSummary;
