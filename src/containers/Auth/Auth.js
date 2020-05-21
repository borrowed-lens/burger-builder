import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import * as actionCreators from '../../store/actions/index';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        authForm: {
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
        },
        login: false,
    };
    componentDidMount() {
        if (
            !this.props.buildingBurger &&
            this.props.authRedirect !== '/checkout'
        ) {
            this.props.onSetAuthRedirect();
        }
    }
    checkValidation = (value, rules) => {
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
    inputChangedHangler = (event, id) => {
        let updatedField = {
            ...this.state.authForm[id],
            value: event.target.value,
            valid: this.checkValidation(
                event.target.value,
                this.state.authForm[id].validationRules
            ),
            touched: true,
        };
        let updatedAuthForm = {
            ...this.state.authForm,
            [id]: updatedField,
        };
        this.setState({
            authForm: updatedAuthForm,
        });
    };
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.login
        );
    };
    switchToLoginHandler = () => {
        this.setState((prevState) => {
            return {
                login: !prevState.login,
            };
        });
    };
    render() {
        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                ...this.state.authForm[key],
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
                <button className='SuccessButton' onClick={this.submitHandler}>
                    {this.state.login ? 'LOGIN' : 'SIGN UP'}
                </button>
            </form>
        );
        if (this.props.loading) {
            form = (
                <div className={classes.loaderContainer}>
                    <Spinner />
                </div>
            );
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p
                    style={{
                        fontWeight: 'bold',
                        color: 'red',
                        textTransform: 'lowercase',
                    }}>
                    {this.props.error.message.split('_').join(' ')}
                </p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />;
        }
        return (
            <div className={classes.AuthData}>
                {authRedirect}
                {errorMessage}
                {form}
                {this.state.login ? 'new user' : 'existing user'}? click here to
                <span
                    onClick={this.switchToLoginHandler}
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    {this.state.login ? ' signup' : ' login'}
                </span>
            </div>
        );
    }
}

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
