import React, { useState } from 'react';
import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './ContactData.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import { CUSTOMER_FORM } from './FormHelper';
import * as actionCreators from '../../store/actions/index';

const ContactData = props => {
    const [customerForm, setCustomerForm] = useState(CUSTOMER_FORM);
    const [formValidity, setFormValidity] = useState(false);
    const checkValidation = (value, rules) => {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength && isValid) {
            isValid = value.trim().length >= rules.minLength;
        }
        if (rules.maxLength && isValid) {
            isValid = value.trim().length <= rules.maxLength;
        }
        if(rules.isEmail && isValid) {
            let pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value); 
        }
        return isValid;
    };
    const orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let field in customerForm) {
            formData[field] = customerForm[field].value;
        }
        let order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            customerData: formData,
            userId: props.userId
        };
        props.onPlaceOrder(order, props.token);
    };
    const inputChangedHangler = (event, id) => {
        let formValidity = true;
        const updatedField = {
            ...customerForm[id],
            value: event.target.value,
            valid: checkValidation(
                event.target.value,
                customerForm[id].validationRules
            ),
            touched: true
        };
        const updatedCustomerForm = {
            ...customerForm,
            [id]: updatedField
        };
        for (let field in updatedCustomerForm) {
            formValidity = updatedCustomerForm[field].valid && formValidity;
        }
        setCustomerForm(updatedCustomerForm);
        setFormValidity(formValidity);
    };
        let formElementsArray = [];
        for (let key in customerForm) {
            formElementsArray.push({
                id: key,
                ...customerForm[key],
            });
        }
        let form = (
            <form>
                {formElementsArray.map((f) => (
                    <Input
                        elementType={f.elementType}
                        elementConfig={f.elementConfig}
                        value={f.value}
                        key={f.id}
                        changed={(event) =>
                            inputChangedHangler(event, f.id)
                        }
                        valid={f.valid}
                        touched={f.touched}
                    />
                ))}
                <button
                    className='SuccessButton'
                    onClick={orderHandler}
                    disabled={!formValidity}>
                    PLACE ORDER
                </button>
            </form>
        );
        if (props.loading) {
            form = <Spinner />;
        }
        return <div className={classes.ContactData}>{form}</div>;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPlaceOrder: (order, token) => dispatch(actionCreators.placeOrder(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
