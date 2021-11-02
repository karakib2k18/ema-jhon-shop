import React from 'react';
import { useHistory } from 'react-router';
import {deleteFromDb } from '../../utilities/fakedb';
// import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
// import UseProducts from '../Hooks/UseProducts';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    // const [products, setProducts] = UseProducts();
    // const [products] = UseProducts();
    const [cart, setCart] = useCart();
    const history = useHistory();
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }
    const handleProceedToShipping = () => {

        // setCart([]);
        // clearTheCart();
        history.push('/shipping');
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        handleRemove={handleRemove}
                        key={product.key}
                        products={product}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedToShipping} className="btn-add-cart">
                        Proceed to Shipping
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;