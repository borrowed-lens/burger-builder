import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
// import BackdropHOC from '../../../HOC/Backdrop/BackdropHOC';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    render() {
        return (
            <>
            <Backdrop show={this.props.show} toggle={this.props.toggle} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

// export default BackdropHOC(Modal);
export default Modal;
