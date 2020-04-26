import React from 'react';

import classes from './NavigationItems.module.css';
const navigationItems = (props) => (
    <>
        <ul className={classes.NavigationItems}>
            <li className={classes.NavigationItem}>
                <a href='/' className={classes.active}>my burger</a>
            </li>
            <li className={classes.NavigationItem}>
                <a href='/'>checkout</a>
            </li>
        </ul>
    </>
);
export default navigationItems;
