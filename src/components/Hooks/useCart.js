import { useEffect } from "react";
import { useState } from "react";
import { getStoredCart } from "../../utilities/fakedb";


const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saveCart = getStoredCart();
    const keys = Object.keys(saveCart);

    fetch("http://localhost:5000/products/bykeys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys)
    })
      .then((res) => res.json())
      .then((products) => {
        console.log(products)
        console.log(products.length)
        if (products.length) {
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
      });
  }, []);
  return [cart, setCart];
};

export default useCart;
