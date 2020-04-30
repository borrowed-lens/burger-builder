import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../HOC/WithError/withErrorHOC';

const INGREDIENT_PRICES = {
    salad: 30,
    meat: 60,
    cheese: 20,
    bacon: 50,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 150,
        disabledOrder: true,
        showSummary: false,
        loading: false,
        error: false,
    };
    componentDidMount() {
        console.log(this.props);

        axios
            .get('/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch((error) => {
                this.setState({ error: true });
            });
    }
    toggleOrderButton = (ingredients) => {
        let disabledOrder = Object.values(ingredients).every((e) => e === 0);
        this.setState({ disabledOrder: disabledOrder });
    };
    toggleSummary = () => {
        this.setState({ showSummary: !this.state.showSummary });
    };
    checkoutHandler = () => {
        let queryParams = [];
        for (let key in this.state.ingredients) {
            queryParams.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    this.state.ingredients[key]
                )}`
            );
        }
        queryParams.push(`price=${this.state.totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`,
        });
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
        let burgerLayout = this.state.error ? (
            <p>Ingredients could not be loaded</p>
        ) : (
            <Spinner />
        );
        let orderSummary = null;
        if (this.state.ingredients) {
            burgerLayout = (
                <>
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
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

export default withError(BurgerBuilder, axios);
