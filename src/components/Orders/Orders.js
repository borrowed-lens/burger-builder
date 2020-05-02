import React, { Component } from 'react';

import Order from './Order/Order';
import axios from '../../axios';
import withErrorHOC from '../../HOC/WithError/withErrorHOC';
import Spinner from '../UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
        error: false,
    };
    componentDidMount() {
        axios
            .get('/orders.json')
            .then((res) => {
                console.log('Orders -> componentDidMount -> res', res);
                this.setState({ orders: res.data, loading: false });
            })
            .catch((error) => {
                console.log('Orders -> componentDidMount -> error', error);
                this.setState({ loading: false, error: true });
            });
    }
    render() {
        let orders = <Spinner />;
        if (this.state.orders) {
            orders = [];
            for (let order in this.state.orders) {
                orders.push(
                    <Order
                        ingredients={this.state.orders[order].ingredients}
                        price={this.state.orders[order].price}
                        key={order}
                    />
                );
            }
        }
        return this.state.error ? (
            <div className='centered'>we ran into some kind of trouble!</div>
        ) : (
            <div>{orders}</div>
        );
    }
}

export default withErrorHOC(Orders);
