import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.push({
            pathname: '/',
            state: 'cancel',
        });
    };
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        const orderPlaced = this.props.orderPlaced ? (
            <Redirect to='/orders' />
        ) : null;
        return (
            <>
                {orderPlaced}
                <CheckoutSummary ingredients={this.props.ingredients} />
                <button
                    className='ErrorButton'
                    onClick={this.checkoutCancelledHandler}>
                    BACK
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        orderPlaced: state.order.orderPlaced,
    };
};

export default connect(mapStateToProps)(Checkout);
