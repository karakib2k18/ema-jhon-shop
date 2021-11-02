import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css'
import Rating from 'react-rating';

const Products = (props) => {
    const { name, price, seller, img, stock, star } = props.product;
    
    // console.log(price)
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h4 className='product-name'>{name}</h4>
                <p><small>by:{seller}</small></p>
                <p>Price: ${price}</p>
                <p>only {stock} left in stock - order soon</p>
                <Rating
                    initialRating={star}
                    emptySymbol="far fa-star star-icon-color"
                    fullSymbol="fas fa-star star-icon-color"
                    readonly></Rating>
                <br />
                <br />
                <button
                    onClick={() => props.addToCartHandler(props.product)} className='btn-add-cart'>{<FontAwesomeIcon icon={faShoppingCart} />}  Add to Cart</button>
            </div>
        </div>
    );
};

export default Products;