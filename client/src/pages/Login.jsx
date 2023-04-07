import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}type="email" id="email" name="email" />
                <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Click here to Register.</button> */}
            <span>
                Don't have an account? 
                <Link to="/register"> Register here</Link>
            </span>
        </div>
    )
}

export default Login