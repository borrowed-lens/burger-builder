import React, { Component } from 'react';

import classes from './Backdrop.module.css';

const backdropHOC = (WrappedComponent) => {
    return class backdrop extends Component {
        render() {
            return this.props.show ? (
                <>
                    <div
                        className={classes.Backdrop}
                        onClick={this.props.toggle}></div>
                    <WrappedComponent {...this.props} />
                </>
            ) : (
                <WrappedComponent {...this.props} />
            );
        }
    };
};
export default backdropHOC;
