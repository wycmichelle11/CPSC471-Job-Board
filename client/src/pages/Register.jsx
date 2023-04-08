import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        email: null,
        password: null,
        first_name: null,
        last_name: null,
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    //handle multiple inputs in one function
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs);
            navigate("/");
        } catch(err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="auth-form-container">
            <h1>Create New Account</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input required placeholder="First Name" name="first_name" onChange={handleChange} />
                <input required placeholder="Last Name" name="last_name" onChange={handleChange} />
                <input required placeholder="Email" name="email" onChange={handleChange} type="email" id="email" />
                <input required placeholder="Password" name="password" onChange={handleChange} type="password" id="password" />
                <button type="submit" onClick={handleSubmit}>Register</button>
                <span>
                {err && <p>{err}</p>}
                    Already have an account? 
                    <Link to="/login"> Login here</Link>
                </span>
            </form>
        </div>
    )
}

export default Register