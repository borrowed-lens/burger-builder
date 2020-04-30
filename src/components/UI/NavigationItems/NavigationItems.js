import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.css';
const navigationItems = (props) => (
    <>
        <ul className={classes.NavigationItems}>
            <li className={classes.NavigationItem}>
                <NavLink to='/' exact activeClassName={classes.active}>
                    my burger
                </NavLink>
            </li>
            <li className={classes.NavigationItem}>
                <NavLink to='/orders' activeClassName={classes.active}>
                    orders
                </NavLink>
            </li>
        </ul>
    </>
);
export default navigationItems;
