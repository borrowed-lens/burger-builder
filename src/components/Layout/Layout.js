import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar
                    menu={this.toggleSideBarView}
                    isAuth={this.props.isAuthenticated}
                />
                <Sidebar
                    isAuth={this.props.isAuthenticated}
                    show={this.state.sidebarOpen}
                    toggle={this.toggleSideBarView}
                />
                <main className={classes.content}>{this.props.children}</main>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
    };
};

export default connect(mapStateToProps)(Layout);
