import React from 'react';

const orderSummary = ({ ingredients, price, cancel, checkout }) => {
    let summaryList = [];
    for (let key in ingredients) {
        if (ingredients[key] !== 0) {
            summaryList.push(
                <div key={key}>
                    {ingredients[key]} slice(s) of {key}
                </div>
            );
        }
    }
    return (
        <>
            <div>we will deliver you this delicious burger with</div>
            <strong>{summaryList}</strong>
            <div>
                this will cost you just <strong>Rs.{price}/-</strong>
            </div>
            <div>shall we proceed to checkout?</div>
            <button className='error-button' onClick={cancel}>
                CANCEL
            </button>
            <button className='success-button' onClick={checkout}>
                CONTINUE
            </button>
        </>
    );
};
export default orderSummary;
