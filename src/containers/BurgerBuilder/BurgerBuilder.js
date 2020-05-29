import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../HOC/WithError/withErrorHOC';
import * as actionCreators from '../../store/actions/index';

const BurgerBuilder = (props) => {
    const dispatch = useDispatch();
    const onAddIngredient = (ingredient) =>
        dispatch(actionCreators.addIngredient(ingredient));
    const onRemoveIngredient = (ingredient) =>
        dispatch(actionCreators.removeIngredient(ingredient));
    const onFetchIngredients = useCallback(
        () => dispatch(actionCreators.fetchIngredients()),
        [dispatch]
    );
    const onCheckoutStart = () => dispatch(actionCreators.checkoutStart());
    const onSetAuthRedirect = (path) =>
        dispatch(actionCreators.setAuthRedirect(path));

    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);
    const isAuthenticated = useSelector((state) => state.auth.idToken !== null);
    const buildingBurger = useSelector((state) => state.burger.buildingBurger);
    const orderPlaced = useSelector((state) => state.order.orderPlaced);

    const [showSummary, setShowSummary] = useState(false);
    useEffect(() => {
        if (!buildingBurger || orderPlaced) {
            onFetchIngredients();
        }
    }, [onFetchIngredients, buildingBurger, orderPlaced]);
    const toggleOrderButton = (ingredients) => {
        if (Object.values(ingredients).every((e) => e === 0)) {
            onSetAuthRedirect('/');
            return true;
        } else {
            return false;
        }
    };
    const toggleSummary = () => {
        if (isAuthenticated) {
            setShowSummary(!showSummary);
        } else {
            onSetAuthRedirect('/checkout');
            props.history.push('/auth');
        }
    };
    const checkoutHandler = () => {
        onCheckoutStart();
        props.history.push('/checkout');
    };
    let burgerLayout = props.error ? (
        <p>ingredients could not be loaded</p>
    ) : (
        <Spinner />
    );
    let orderSummary = null;
    if (ingredients) {
        burgerLayout = (
            <>
                <Burger ingredients={ingredients} />
                <BuildControls
                    addIngredients={onAddIngredient}
                    removeIngredients={onRemoveIngredient}
                    ingredientsDisabled={ingredients}
                    price={totalPrice}
                    disabled={toggleOrderButton(ingredients)}
                    showSummary={toggleSummary}
                    isAuthenticated={isAuthenticated}
                />
            </>
        );
        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                price={totalPrice}
                cancel={toggleSummary}
                checkout={checkoutHandler}
            />
        );
    }
    return (
        <>
            <Modal show={showSummary} toggle={toggleSummary}>
                {orderSummary}
            </Modal>
            {burgerLayout}
        </>
    );
};

export default withError(BurgerBuilder, axios);
