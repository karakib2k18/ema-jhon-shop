import { useEffect } from "react";
import { useState } from "react"
import { getStoredCart } from "../../utilities/fakedb";

const useCart = (products) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (products.length) {
            const saveCart = getStoredCart();
            const storedCart = [];
            for (const key in saveCart) {
                const addedProducts = products.find(product => product.key === key);
                if (addedProducts) {
                    //set quantity
                    const quantity = saveCart[key];
                    addedProducts.quantity = quantity;
                    storedCart.push(addedProducts);
                }
            }
            setCart(storedCart);
            // console.log(storedCart)

        }
    }, [products])
    return [cart, setCart];
}

export default useCart;
