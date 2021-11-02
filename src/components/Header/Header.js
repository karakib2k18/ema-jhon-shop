import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png'
import useAuth from '../Hooks/useAuth';
import './Header.css'

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                {user?.email && <NavLink to="/orders">Orders</NavLink> }
                {user?.email && <span style={{ color: 'white' }}>Hello {user?.displayName} </span>}
                {
                    user.email ?
                        <button onClick={logOut}>log out</button>
                        :
                        <NavLink to="/login">Login</NavLink>
                }

            </nav>
        </div>
    );
};

export default Header;
