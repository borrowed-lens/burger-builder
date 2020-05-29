import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

const Logout = (props) => {
    useEffect(() => {
        props.onLogout();
        // eslint-disable-next-line
    }, []);
    return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actionCreators.logout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
