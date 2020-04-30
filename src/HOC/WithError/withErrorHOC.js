import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios';

const withErrorHOC = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null,
        };
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorClearHandler = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        toggle={this.errorClearHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

export default withErrorHOC;
