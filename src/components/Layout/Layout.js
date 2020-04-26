import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../UI/Toolbar/Toolbar';
import Sidebar from '../UI/Sidebar/Sidebar';

class Layout extends Component {
    state = {
        sidebarOpen: false,
    };
    toggleSideBarView = () => {
        this.setState((prevState) => ({ sidebarOpen: !prevState.sidebarOpen }));
    };
    render() {
        return (
            <>
                <Toolbar menu={this.toggleSideBarView} />
                <Sidebar
                    show={this.state.sidebarOpen}
                    toggle={this.toggleSideBarView}
                />
                <main className={classes.content}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;
