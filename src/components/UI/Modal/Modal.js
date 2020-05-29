import React, { memo } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
// import BackdropHOC from '../../../HOC/Backdrop/BackdropHOC';

const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.show} toggle={props.toggle} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show
                        ? 'translateY(0)'
                        : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>
        </>
    );
};
// export default BackdropHOC(Modal);
export default memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children !== prevProps.children
);
