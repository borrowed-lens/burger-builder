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

export class BurgerBuilder extends Component {
    state = {
        showSummary: false,
    };
    componentDidMount() {
        // initial method for checking if user clicked back from checkout page
                // if (this.props.location.state !== 'cancel' || !this.props.ingredients) {
                //     this.props.onFetchIngredients();
                // }
                // this.props.history.replace('', null);
        if (!this.props.buildingBurger || this.props.orderPlaced) {
            this.props.onFetchIngredients();
        }
    }
    toggleOrderButton = (ingredients) => {
        if (Object.values(ingredients).every((e) => e === 0)) {
            this.props.onSetAuthRedirect('/');
            return true;
        } else {
            return false;
        }
    };
    toggleSummary = () => {
        if (this.props.isAuthenticated) {
            this.setState({ showSummary: !this.state.showSummary });
        } else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    };
    checkoutHandler = () => {
        this.props.onCheckoutStart();
        this.props.history.push('/checkout');
    };
    render() {
        let burgerLayout = this.props.error ? (
            <p>ingredients could not be loaded</p>
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
                        isAuthenticated={this.props.isAuthenticated}
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
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burger.buildingBurger,
        orderPlaced: state.order.orderPlaced
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredient) =>
            dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) =>
            dispatch(actionCreators.removeIngredient(ingredient)),
        onFetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
        onCheckoutStart: () => dispatch(actionCreators.checkoutStart()),
        onSetAuthRedirect: (path) =>
            dispatch(actionCreators.setAuthRedirect(path)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withError(BurgerBuilder, axios));
