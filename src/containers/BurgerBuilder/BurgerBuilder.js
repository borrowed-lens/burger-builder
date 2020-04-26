import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 30,
    meat: 60,
    cheese: 20,
    bacon: 50,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
        totalPrice: 150,
        disabledOrder: true,
        showSummary: false,
    };
    toggleOrderButton = (ingredients) => {
        let disabledOrder = Object.values(ingredients).every((e) => e === 0);
        this.setState({ disabledOrder: disabledOrder });
    };
    toggleSummary = () => {
        this.setState({ showSummary: !this.state.showSummary });
    };
    checkoutHandler = () => {
        alert('continuing to checkout');
        this.toggleSummary();
    };
    addIngredientHandler = (type) => {
        let updatedIngredients = {
            ...this.state.ingredients,
        };
        let updatedCount = this.state.ingredients[type] + 1;
        updatedIngredients[type] = updatedCount;

        let updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.toggleOrderButton(updatedIngredients);
    };
    removeIngredientHandler = (type) => {
        let updatedIngredients = {
            ...this.state.ingredients,
        };
        if (updatedIngredients[type] === 0) {
            return;
        }
        let updatedCount = this.state.ingredients[type] - 1;
        updatedIngredients[type] = updatedCount;

        let updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.toggleOrderButton(updatedIngredients);
    };
    render() {
        return (
            <>
                <Modal
                    show={this.state.showSummary}
                    toggle={this.toggleSummary}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.toggleSummary}
                        checkout={this.checkoutHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredients={this.addIngredientHandler}
                    removeIngredients={this.removeIngredientHandler}
                    ingredientsDisabled={this.state.ingredients}
                    price={this.state.totalPrice}
                    disabled={this.state.disabledOrder}
                    showSummary={this.toggleSummary}
                />
            </>
        );
    }
}

export default BurgerBuilder;
