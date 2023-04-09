import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const WritePost = () => {

    const [writeInputs, writeSetInputs] = useState({
        title: null,
        location: null,
        flag: null,
        qualification: null,
        disclaimer: null,
        compensation: null,
        application_deadline: null,
    })

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    //handle multiple inputs in one function
    const handleChange = (e) => {
        writeSetInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/writepost", writeInputs);
            console.log()
            navigate("/");
        } catch(err) {
            setError(err.response.data);
        }
    }
    return (
        <div className="write">
            <div className="content">
                <h1>Add New Posting</h1>
                <div className="new-posting-container">
                    <form className="new-posting-form" onSubmit={handleSubmit}>
                        <input placeholder="Job Title" onChange={handleChange}></input>
                        <input contenteditable="true" type="text" placeholder="Description"></input>
                        <input placeholder="Location" onChange={handleChange}></input>
                        <input placeholder="Qualifications" onChange={handleChange}></input>
                        <input placeholder="Link to apply" onChange={handleChange}></input>
                        <input placeholder="Disclaimer" onChange={handleChange}></input>
                        <input placeholder="Compensation" onChange={handleChange}></input>
                        <input placeholder="Application Deadline" onChange={handleChange}></input>
                    </form>
                    <button type="submit" onClick={handleSubmit}>Post</button>
                </div>
                
            </div>
        </div>




    )
}

export default WritePost

