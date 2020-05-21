import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheck();
    }
    render() {
        let routes = (
            <Switch>
                <Route
                    path='/auth'
                    render={() => (
                        <Suspense fallback={<Spinner />}>
                            <Auth />
                        </Suspense>
                    )}
                />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route
                        path='/auth'
                        render={() => (
                            <Suspense fallback={<Spinner />}>
                                <Auth />
                            </Suspense>
                        )}
                    />
                    <Route
                        path='/checkout'
                        render={(props) => (
                            <Suspense fallback={<Spinner />}>
                                <Checkout {...props} />
                            </Suspense>
                        )}
                    />
                    <Route
                        path='/orders'
                        render={() => (
                            <Suspense fallback={<Spinner />}>
                                <Orders />
                            </Suspense>
                        )}
                    />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheck: () => dispatch(actionCreators.authCheck()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
