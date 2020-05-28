import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../HOC/WithError/withErrorHOC';
import * as actionCreators from '../../store/actions/index';

const BurgerBuilder = props => {
    const [showSummary, setShowSummary] = useState(false);
    useEffect(() => {
        if (!props.buildingBurger || props.orderPlaced) {
            props.onFetchIngredients();
        }
    // eslint-disable-next-line
    }, [])
    const toggleOrderButton = (ingredients) => {
        if (Object.values(ingredients).every((e) => e === 0)) {
            props.onSetAuthRedirect('/');
            return true;
        } else {
            return false;
        }
    };
    const toggleSummary = () => {
        if (props.isAuthenticated) {
            setShowSummary(!showSummary);
        } else {
            props.onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    };
    const checkoutHandler = () => {
        props.onCheckoutStart();
        props.history.push('/checkout');
    };
        let burgerLayout = props.error ? (
            <p>ingredients could not be loaded</p>
        ) : (
            <Spinner />
        );
        let orderSummary = null;
        if (props.ingredients) {
            burgerLayout = (
                <>
                    <Burger ingredients={props.ingredients} />
                    <BuildControls
                        addIngredients={props.onAddIngredient}
                        removeIngredients={props.onRemoveIngredient}
                        ingredientsDisabled={props.ingredients}
                        price={props.totalPrice}
                        disabled={toggleOrderButton(
                            props.ingredients
                        )}
                        showSummary={toggleSummary}
                        isAuthenticated={props.isAuthenticated}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={props.ingredients}
                    price={props.totalPrice}
                    cancel={toggleSummary}
                    checkout={checkoutHandler}
                />
            );
        }
        return (
            <>
                <Modal
                    show={showSummary}
                    toggle={toggleSummary}>
                    {orderSummary}
                </Modal>
                {burgerLayout}
            </>
        );
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
