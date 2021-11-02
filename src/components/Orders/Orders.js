import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { useHistory } from "react-router-dom";

const Orders = () => {

    const [orders, serOrders] = useState([]);
    const {user} = useAuth();
    let history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`,{
            headers:{
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res =>{
                if(res.status===200){
                    res.json()
                }else if(res.status===401){
                    history.push("/login");
                }  
            })
            .then(data => serOrders(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>this is Orders {orders.length}</h2>
            {
                orders.map(order => <li>{order.email}</li> )
            }
        </div>
    );
};

export default Orders;