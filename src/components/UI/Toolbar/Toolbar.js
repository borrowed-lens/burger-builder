import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerToggle from '../HamburgerToggle/HamburgerToggle';

const toolbar = (props) => (
    <>
        <div className={classes.Toolbar}>
            <div className={classes.MobileOnly}>
                <HamburgerToggle clicked={props.menu} />
            </div>
            <div className={classes.LogoContainer}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
    </>
);
export default toolbar;
