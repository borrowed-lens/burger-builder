import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../HOC/WithError/withErrorHOC';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        totalPrice: 150,
        showSummary: false,
    };
    componentDidMount() {
        this.props.onInitIngredients();
    }
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
        let burgerLayout = this.props.error ? (
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
            dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) =>
            dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: () => 
            dispatch(actionCreators.initIngredients())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withError(BurgerBuilder, axios));
