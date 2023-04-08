import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: null,
        password: null
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    //handle multiple inputs in one function
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Login</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input required placeholder="Email" name="email" onChange={handleChange} type="email" id="email" />
                <input required placeholder="Password" name="password" onChange={handleChange} type="password" id="password" />
                <button type="submit" onClick={handleSubmit}>Login</button>
                <span>
                {err && <p>{err}</p>}
                    Don't have an account? 
                    <Link to="/register"> Register here</Link>
                </span>
            </form>
        </div>
    )
}

export default Login