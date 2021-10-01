import React from 'react';
import { deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import UseProducts from '../Hooks/UseProducts';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    // const [products, setProducts] = UseProducts();
    const [products] = UseProducts();
    const [cart, setCart] = useCart(products);
    const handleRemove = key => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default OrderReview;