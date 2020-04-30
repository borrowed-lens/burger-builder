import React, { Component } from 'react';

import classes from './ContactData.module.css';
import axios from '../../../axios';
import Spinner from '../../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pin: '',
            country: '',
        },
        loading: false
    };
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Vivek',
                email: 'test@test.com',
                address: {
                    street: 'Test Street ABC',
                    pin: '000000',
                    country: 'India',
                },
            },
        };
        axios
            .post('/orders.json', order)
            .then((response) => {
                this.setState({ loading: false});
                this.props.history.push('/orders');
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };
    render() {
        let form = (<form>
            <input
                className={classes.Input}
                type='text'
                id='name'
                placeholder='your name'
            />
            <input
                className={classes.Input}
                type='text'
                id='email'
                placeholder='your email'
            />
            <input
                className={classes.Input}
                type='text'
                id='street'
                placeholder='street name'
            />
            <input
                className={classes.Input}
                type='number'
                id='pin'
                placeholder='pincode'
            />
            <input
                className={classes.Input}
                type='text'
                id='country'
                placeholder='country'
            />
            <button
                className='success-button'
                onClick={this.orderHandler}>
                place order
            </button>
        </form>)
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;
