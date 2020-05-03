import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Orders/ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        return (
            <>
                <CheckoutSummary ingredients={this.props.ingredients} />
                <button
                    className='ErrorButton'
                    onClick={this.checkoutCancelledHandler}>
                    CANCEL
                </button>
                <button
                    className='SuccessButton'
                    onClick={this.checkoutContinueHandler}>
                    CONTINUE
                </button>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
