import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHOC from '../../HOC/WithError/withErrorHOC';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }
    render() {
        let orders = this.props.error ? (
            <p>orders could not be loaded</p>
        ) : (
            <Spinner />
        );
        if (this.props.orders) {
            orders = [];
            for (let order in this.props.orders) {
                orders.push(
                    <Order
                        ingredients={this.props.orders[order].ingredients}
                        price={this.props.orders[order].price}
                        key={order}
                    />
                );
            }
        }
        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        error: state.order.error
    };
};

const mapDisptachToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actionCreators.fetchOrders()),
    };
};

export default connect(
    mapStateToProps,
    mapDisptachToProps
)(withErrorHOC(Orders));
