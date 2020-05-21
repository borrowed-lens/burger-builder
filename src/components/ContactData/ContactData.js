import React, { Component } from 'react';
import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './ContactData.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import { CUSTOMER_FORM } from './FormHelper';
import * as actionCreators from '../../store/actions/index';

class ContactData extends Component {
    state = CUSTOMER_FORM;
    checkValidation = (value, rules) => {
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
    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let field in this.state.customerForm) {
            formData[field] = this.state.customerForm[field].value;
        }
        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customerData: formData,
            userId: this.props.userId
        };
        this.props.onPlaceOrder(order, this.props.token);
    };
    inputChangedHangler = (event, id) => {
        let formValidity = true;
        const updatedCustomerForm = {
            ...this.state.customerForm,
        };
        const updatedField = {
            ...this.state.customerForm[id],
        };
        updatedField.value = event.target.value;
        updatedField.valid = this.checkValidation(
            updatedField.value,
            updatedField.validationRules
        );
        updatedField.touched = true;
        updatedCustomerForm[id] = updatedField;
        for (let field in updatedCustomerForm) {
            formValidity = updatedCustomerForm[field].valid && formValidity;
        }
        this.setState({
            customerForm: updatedCustomerForm,
            formValidity: formValidity,
        });
    };
    render() {
        let formElementsArray = [];
        for (let key in this.state.customerForm) {
            formElementsArray.push({
                id: key,
                ...this.state.customerForm[key],
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
                            this.inputChangedHangler(event, f.id)
                        }
                        valid={f.valid}
                        touched={f.touched}
                    />
                ))}
                <button
                    className='SuccessButton'
                    onClick={this.orderHandler}
                    disabled={!this.state.formValidity}>
                    PLACE ORDER
                </button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return <div className={classes.ContactData}>{form}</div>;
    }
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
