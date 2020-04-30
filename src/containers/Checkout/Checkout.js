import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Orders/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    };
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let [key, value] of query.entries()) {
            if (key === 'price') {
                price = +value;
            } else {
                ingredients[key] = +value;
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };
    render() {
        return (
            <>
                <CheckoutSummary ingredients={this.state.ingredients} />
                <button
                    className='error-button'
                    onClick={this.checkoutCancelledHandler}>
                    CANCEL
                </button>
                <button
                    className='success-button'
                    onClick={this.checkoutContinueHandler}>
                    CONTINUE
                </button>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            history={this.props.history}
                        />
                    )}
                />
            </>
        );
    }
}

export default Checkout;
