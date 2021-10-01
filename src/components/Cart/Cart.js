import React from 'react';
import './Cart.css';

const Cart = (props) => {

    /*
    const { cart } = props;
    const totalreducer = (prev, product) => prev + product.price;
    const total = cart.reduce(totalreducer, 0);
    console.log(props.cart); 
    */

    const { cart } = props;
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
        //console.log(totalQuantity);
    }
    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>ORDER SUMMARY</h3>
            <h5>Items ordered: {totalQuantity} </h5>
            <div>
                <p>Total before tax: {total.toFixed(2)}</p>
                <p>Shipping & Handling: {shipping}</p>
                <p>Estimated Tax: {tax.toFixed(2)}</p>
                <h3>Order Total: {grandTotal.toFixed(2)}</h3>
                {props.children}
            </div>
        </div>
    );
};

export default Cart;