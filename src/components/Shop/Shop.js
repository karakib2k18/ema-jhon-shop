import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    //product to be render on ui
    const [displayProduct, SetDisplayProduct] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                SetDisplayProduct(data);
            });
    }, [])

    useEffect(() => {
        if (products.length) {
            const getStoreCart = getStoredCart();
            //console.log(getStoreCart);
            const storedCart = [];
            for (const key in getStoreCart) {

                const addedProducts = products.find(product => product.key === key);
                if (addedProducts) {
                    const quantity = getStoreCart[key];
                    addedProducts.quantity = quantity;
                    storedCart.push(addedProducts);
                }
            }
            setCart(storedCart);
        }

    }, [products])

    // const addToCartHandler = (product) => {
    //     //const newCart = [...cart, product];
    //     let newCart = [...cart];
    //     const exists = cart.find(pd => pd.key === product.key)
    //     if (exists) {
    //         product.quantity = product.quantity + 1;
    //     } else {
    //         product.quantity = 1;
    //         newCart.push(product);
    //     }
    //     setCart(newCart);
    //     //save to local storage for now
    //     addToDb(product.key);
    // }

    const addToCartHandler = (product) => {
        //const newCart = [...cart, product];
        let newCart = [];
        const exists = cart.find(pd => pd.key === product.key);
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        //console.log(newCart)
        //save to local storage for now
        addToDb(product.key);
    }

    const handleSearch = event => {
        //console.log(event.target.value);
        const searchText = event.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        SetDisplayProduct(matchProducts);
        //console.log(matchProducts.length)
    }
    return (
        <>
            <div className='search-container'>
                <input type="text"
                    onChange={handleSearch}
                    placeholder='search product' />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProduct.map(product => <Products
                            addToCartHandler={addToCartHandler}
                            key={product.key}
                            product={product}

                        ></Products>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-add-cart">
                                Review Your Order
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;