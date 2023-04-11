import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios"

const EditPost = () => {
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { jobid } = location.state;


    const [writeInputs, writeSetInputs] = useState({
        job_id: jobid,
        company_name: null,
        title: null,
        location: null,
        flag: null,
        qualification: null,
        link: null,
        disclaimer: null,
        compensation: null,
        application_deadline: null,
        account_id: null
    })


    useEffect(()=> {
        const fetchData = async () => {
            try{
                const res = await axios.get(`/posts/${jobid}`);
                if (res.data.application_deadline !== null) res.data.application_deadline = res.data.application_deadline.substring(0, 10);
                writeSetInputs(res.data);
            }catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [jobid]);


    //handle multiple inputs in one function
    const handleChange = (e) => {
        writeSetInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleEdit = (jobid) => async (e) => {
        e.preventDefault();
        if (Object.values(writeInputs).every(val => typeof val !== 'string' || val.trim() !== "" )) {
            try {
                await axios.put(`/posts/${jobid}`, writeInputs);
                navigate("/home/");
            } catch (err) {
                setError("Server returned an error. Ensure all fields contain valid data.");
            }
        } else {
            setError("One or more fields contains invalid data.");
        }
    }

    return (
        <div className="write">
            <div className="write-content">
                <h1>Edit Posting</h1>
                {err && <p style={{ color: "red" }}>{err}</p>}
                <div className="new-posting-container">
                    <form className="new-posting-form" onSubmit={handleEdit}>
                        <input defaultValue={writeInputs.title} placeholder="Job Title" name="title" onChange={handleChange}></input>
                        <textarea type="text" placeholder="Description"></textarea>
                        <input defaultValue={writeInputs.location} placeholder="Location" name="location" onChange={handleChange}></input>
                        <textarea defaultValue={writeInputs.qualification} placeholder="Qualifications" name="qualification" onChange={handleChange}></textarea>
                        <input defaultValue={writeInputs.link} placeholder="Link to apply" name="link" onChange={handleChange}></input>
                        <input defaultValue={writeInputs.disclaimer} placeholder="Disclaimer" name="disclaimer" onChange={handleChange}></input>
                        <input defaultValue={writeInputs.compensation} placeholder="Compensation (e.g. 15)" name="compensation" onChange={handleChange}></input>
                        <input defaultValue={writeInputs.application_deadline} placeholder="Application Deadline (YYYY-MM-DD)" name="application_deadline" onChange={handleChange}></input>
                        <button type="submit" onClick={handleEdit(jobid)}>Post</button>
                    </form>
                </div>

            </div>
        </div>




    )
}
export default EditPost

