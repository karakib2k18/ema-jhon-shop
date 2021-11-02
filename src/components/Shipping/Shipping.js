import React from 'react';
import { useForm } from 'react-hook-form';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import useAuth from '../Hooks/useAuth';
import './Shipping.css'

const Shipping = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const onSubmit = data => {
        const saveCart = getStoredCart();
        data.order = saveCart;
        console.log(data)

        fetch('http://localhost:5000/orders',{
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data)
          })
          .then(res=>res.json())
          .then(result => {
              if(result.insertedId){
                  alert('order processed');
                  clearTheCart();
                  reset();
              }
          })

    };
    return (
        <div >
            <h2>This is shipping</h2>
            <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={user.displayName} {...register("name")} />
                <input defaultValue={user.email}  {...register("email", { required: true })} />
                {errors.email && <span className="error">This field is required</span>}
                <input placeholder="Address" defaultValue="" {...register("address")} />
                <input placeholder="City" defaultValue="" {...register("city")} />
                <input placeholder="phone number" defaultValue="phone" {...register("name")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;