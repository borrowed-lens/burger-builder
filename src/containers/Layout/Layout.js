import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import Sidebar from '../../components/UI/Sidebar/Sidebar';

const Layout = (props) => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const toggleSideBarView = () => {
        setSideBarOpen(!sidebarOpen);
    };
    return (
        <>
            <Toolbar menu={toggleSideBarView} isAuth={props.isAuthenticated} />
            <Sidebar
                isAuth={props.isAuthenticated}
                show={sidebarOpen}
                toggle={toggleSideBarView}
            />
            <main className={classes.content}>{props.children}</main>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
    };
};

export default connect(mapStateToProps)(Layout);
