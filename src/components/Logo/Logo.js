import React from 'react';

import classes from './Logo.module.css'
import LogoImage from '../../assets/images/original.png';


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={LogoImage} alt='burgerLogo' />
    </div>
);
export default logo;
