import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import "./Login.css"

const Login = () => {
    const { signInUsingGoole } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location?.state?.from || '/shop';
    // console.log("came from", location?.state?.from);
    const handleGoogleLogin = () => {
        signInUsingGoole()
            .then((result) => {
                history.push(redirect_url)
            })
        // .then((result) => {
        //     console.log(result.user)
        //     setUser(result.user);
        // }).catch((error) => {
        //     // Handle Errors here.
        //     console.log(error.message);
        // });
    }
    return (
        <div className="login-form">
            <h2>Login</h2>
            <form action="">
                <input type="email" name="" id="" />
                <br />
                <br />
                <input type="password" name="" id="" />
                <br />
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>New to ema-jhon? <Link to="/register">Create Account</Link> </p>
            <div>----------------or-------------</div>
            <button className="btn-add-cart" onClick={handleGoogleLogin}>Goole Sign In</button>

        </div>
    );
};

export default Login;