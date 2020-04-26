import React from 'react';
import classes from './HamburgerToggle.module.css';

const hamburgerToggle = (props) => (
    <div className={classes.Hamburger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
export default hamburgerToggle;
