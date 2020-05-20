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
            <li className={classes.NavigationItem}>
                {props.isAuthenticated ? (
                    <NavLink to='/logout' activeClassName={classes.active}>
                        logout
                    </NavLink>
                ) : (
                    <NavLink to='/auth' activeClassName={classes.active}>
                        signup/login
                    </NavLink>
                )}
            </li>
        </ul>
    </>
);
export default navigationItems;
