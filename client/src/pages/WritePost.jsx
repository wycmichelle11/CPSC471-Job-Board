import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const WritePost = () => {

    const [writeInputs, writeSetInputs] = useState({
        company_name: null, 
        title: null,
        location: null,
        flag: null,
        qualification: null,
        link: null,
        disclaimer: null,
        compensation: null,
        application_deadline: null,
        account_id: null,
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
            await axios.post("/posts/", writeInputs);
            navigate("/home");
        } catch(err) {
            setError(err.response.data);
            console.error(err.response.data);
        }
    }
    return (
        <div className="write">
            <div className="content">
                <h1>Add New Posting</h1>
                <div className="new-posting-container">
                    <form className="new-posting-form" onSubmit={handleSubmit}>
                    <input placeholder="Company Name" name="company_name" onChange={handleChange}></input>
                        <input placeholder="Job Title" name="title" onChange={handleChange}></input>
                        <input contentEditable="true" type="text" placeholder="Description"></input>
                        <input placeholder="Location" name="location" onChange={handleChange}></input>
                        <input placeholder="Qualifications" name="qualification" onChange={handleChange}></input>
                        <input placeholder="Link to apply" name="link" onChange={handleChange}></input>
                        <input placeholder="Disclaimer" name="disclaimer" onChange={handleChange}></input>
                        <input placeholder="Compensation" name="compensation" onChange={handleChange}></input>
                        <input placeholder="Application Deadline" name="application_deadline" onChange={handleChange}></input>
                    </form>
                    <button type="submit" onClick={handleSubmit}>Post</button>
                </div>
                
            </div>
        </div>




    )
}

export default WritePost

