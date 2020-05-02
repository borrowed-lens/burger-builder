import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(props.touched && !props.valid) {
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    name={props.elementConfig.name}
                    className={classes.InputElement}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    value={props.value}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};
export default input;
