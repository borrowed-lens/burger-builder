import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from 'react-router-dom';

import NavigationItems from './NavigationItems';
import classes from './NavigationItems.module.css';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it('should have two navlinks when not authenticated', () => {
        expect(wrapper.find(NavLink)).toHaveLength(2);
    });
    it('should have three navlinks when authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
    it('should render a navlink for logout', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavLink to='/logout' activeClassName={classes.active}>logout</NavLink>)).toEqual(true);
    });
});
