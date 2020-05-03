import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../HOC/WithError/withErrorHOC';
import * as ActionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        totalPrice: 150,
        showSummary: false,
        loading: false,
        error: false,
    };
    toggleOrderButton = (ingredients) => {
        return Object.values(ingredients).every((e) => e === 0);
    };
    toggleSummary = () => {
        this.setState({ showSummary: !this.state.showSummary });
    };
    checkoutHandler = () => {
        this.props.history.push('/checkout');
    };
    render() {
        let burgerLayout = this.state.error ? (
            <p>Ingredients could not be loaded</p>
        ) : (
            <Spinner />
        );
        let orderSummary = null;
        if (this.props.ingredients) {
            burgerLayout = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredients={this.props.onAddIngredient}
                        removeIngredients={this.props.onRemoveIngredient}
                        ingredientsDisabled={this.props.ingredients}
                        price={this.props.totalPrice}
                        disabled={this.toggleOrderButton(
                            this.props.ingredients
                        )}
                        showSummary={this.toggleSummary}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.totalPrice}
                    cancel={this.toggleSummary}
                    checkout={this.checkoutHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <>
                <Modal
                    show={this.state.showSummary}
                    toggle={this.toggleSummary}>
                    {orderSummary}
                </Modal>
                {burgerLayout}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) =>
            dispatch({
                type: ActionTypes.ADD_INGREDIENT,
                ingredient: ingredient,
            }),
        onRemoveIngredient: (ingredient) =>
            dispatch({
                type: ActionTypes.REMOVE_INGREDIENT,
                ingredient: ingredient,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withError(BurgerBuilder, axios));
