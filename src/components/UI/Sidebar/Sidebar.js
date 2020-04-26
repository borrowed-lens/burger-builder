import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './Sidebar.module.css';
import Backdrop from '../Backdrop/Backdrop';
// import Backdrop from '../../../HOC/Backdrop/BackdropHOC';

const sidebar = (props) => {
    let assignedClasses = [classes.Sidebar, classes.Closed];
    if (props.show) {
        assignedClasses = [classes.Sidebar, classes.Open];
    }
    return (
        <>
            <Backdrop show={props.show} toggle={props.toggle} />
            <div className={assignedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.MobileOnly}>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};
// export default Backdrop(sidebar);

export default sidebar;
