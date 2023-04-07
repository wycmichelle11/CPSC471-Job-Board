import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h1>Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input placeholder="First Name" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" />
            <input placeholder="Last Name" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}type="email" id="email" name="email" />
            <input placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Click here to login</button> */}
        <span>
            Already have an account? 
            <Link to="/login"> Login here</Link>
        </span>
    </div>
    )
}

export default Register