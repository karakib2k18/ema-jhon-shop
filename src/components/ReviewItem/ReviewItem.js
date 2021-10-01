import React from 'react';

const ReviewItem = (props) => {
    const { name, price, quantity, seller, key } = props.products;
    return (
        <div className='product'>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p><small>by:{seller}</small></p>
                <p>Price: ${price}</p>
                <p>quantity: {quantity}</p>
                <button onClick={() => props.handleRemove(key)}
                    className='btn-add-cart'>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;