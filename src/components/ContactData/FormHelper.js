export const CUSTOMER_FORM = {
    customerForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your name',
                name: 'name',
            },
            value: '',
            validationRules: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your email',
                name: 'email',
            },
            value: '',
            validationRules: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'street',
                name: 'street',
            },
            value: '',
            validationRules: {
                required: true
            },
            valid: false,
            touched: false
        },
        pincode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'pincode',
                name: 'pincode',
            },
            value: '',
            validationRules: {
                required: true,
                minLength: 3,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'country',
                name: 'country',
            },
            value: '',
            validationRules: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryType: {
            elementType: 'select',
            elementConfig: {
                name: 'deliveryType',
                options: [
                    { value: 'fastest', displayValue: 'fastest' },
                    { value: 'cheapest', displayValue: 'cheapest' },
                ],
            },
            value: 'fastest',
            validationRules: {},
            valid: true,
            touched: true
        },
    },
    formValidity: false
};
