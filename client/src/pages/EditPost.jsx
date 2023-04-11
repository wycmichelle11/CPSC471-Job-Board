import React, {useEffect, useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios"

const EditPost = () => {
    const {jobid}  = useParams();
    const [writeInputs, writeSetInputs] = useState({
        //job_id: jobid,
        //company_name: null,
        title: null,
        location: null,
        flag: null,
        qualification: null,
        link: null,
        disclaimer: null,
        compensation: null,
        application_deadline: null,
    })

    const [err, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchData = async () => {
            try{
                const res = await axios.get(`/posts/${jobid}`);
                writeSetInputs(res.data);
            }catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [navigate]);

    //handle multiple inputs in one function
    const handleChange = (e) => {
        writeSetInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleEdit = (jobid) => async () => {
        try {
            await axios.put(`/posts/${jobid}`, writeInputs);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="write">
            <div className="write-content">
                <h1>Edit Posting</h1>
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
                        <button type="submit" onClick={handleEdit(1)}>Post</button>
                    </form>
                </div>

            </div>
        </div>




    )
}
export default EditPost

