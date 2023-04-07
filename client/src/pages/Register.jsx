import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password:"",
        first_name: "",
        last_name: "",
    })

    //handle multiple inputs in one function
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", inputs);
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Create New Account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input placeholder="First Name" name="first_name" onChange={handleChange} id="name" />
            <input placeholder="Last Name" name="last_name" onChange={handleChange} id="name" />
            <input placeholder="Email" name="email" onChange={handleChange} type="email" id="email" />
            <input placeholder="Password" name="password" onChange={handleChange} type="password" id="password" />
            <button type="submit" onClick={handleSubmit}>Register</button>
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