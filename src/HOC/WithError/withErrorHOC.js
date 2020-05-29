import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios';
import useCustomErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHOC = (WrappedComponent) => {
    return (props) => {
        const [error, errorClearHandler] = useCustomErrorHandler(axios);
        return (
            <>
                <Modal show={error} toggle={errorClearHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withErrorHOC;
