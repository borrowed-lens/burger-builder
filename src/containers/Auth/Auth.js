import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import * as actionCreators from '../../store/actions/index';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

const Auth = (props) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your email',
                name: 'email',
            },
            value: '',
            validationRules: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'password',
                name: 'password',
            },
            value: '',
            validationRules: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });
    const [login, setLogin] = useState(false);
    useEffect(() => {
        if (!props.buildingBurger && props.authRedirect !== '/checkout') {
            props.onSetAuthRedirect();
        }
    // eslint-disable-next-line
    }, []);
    const checkValidation = (value, rules) => {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength && isValid) {
            isValid = value.trim().length >= rules.minLength;
        }
        if (rules.isEmail && isValid) {
            let pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value);
        }
        return isValid;
    };
    const inputChangedHangler = (event, id) => {
        let updatedField = {
            ...authForm[id],
            value: event.target.value,
            valid: checkValidation(
                event.target.value,
                authForm[id].validationRules
            ),
            touched: true,
        };
        let updatedAuthForm = {
            ...authForm,
            [id]: updatedField,
        };
        setAuthForm(updatedAuthForm);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, login);
    };
    const switchToLoginHandler = () => {
        setLogin(!login);
    };
    let formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            ...authForm[key],
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
                    changed={(event) => inputChangedHangler(event, f.id)}
                    valid={f.valid}
                    touched={f.touched}
                />
            ))}
            <button className='SuccessButton' onClick={submitHandler}>
                {login ? 'LOGIN' : 'SIGN UP'}
            </button>
        </form>
    );
    if (props.loading) {
        form = (
            <div className={classes.loaderContainer}>
                <Spinner />
            </div>
        );
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p
                style={{
                    fontWeight: 'bold',
                    color: 'red',
                    textTransform: 'lowercase',
                }}>
                {props.error.message.split('_').join(' ')}
            </p>
        );
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirect} />;
    }
    return (
        <div className={classes.AuthData}>
            {authRedirect}
            {errorMessage}
            {form}
            {login ? 'new user' : 'existing user'}? click here to
            <span
                onClick={switchToLoginHandler}
                style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {login ? ' signup' : ' login'}
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burger.buildingBurger,
        authRedirect: state.auth.authRedirect,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, login) =>
            dispatch(actionCreators.auth(email, password, login)),
        onSetAuthRedirect: () => dispatch(actionCreators.setAuthRedirect('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
