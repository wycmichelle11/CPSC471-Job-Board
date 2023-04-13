import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


const AddResume = () => {
    const [writeResumeInputs, writeSetResumeInputs] = useState({
        first_name: null, 
        last_name: null,
        job_seeker_email: null,
        contact_information: null,
        education: null,
        work_experience: null,
        interests: null,
        additional_information: null,
    })

    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        writeSetResumeInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/resumes/", writeResumeInputs);
            navigate("/home/myaccount");
        } catch(err) {
            setError(err.response.data);
            console.error(err.response.data);
        }
    }

    return(
        <div className="write-content">
                <h1>Add/Update Resume</h1>
            <div className="new-resume-container">
                <form className="resume-form" onSubmit={handleSubmit}>
                    <input placeholder="First Name" name="first_name" onChange={handleChange}/>
                    <input placeholder="Last Name" name="last_name" onChange={handleChange}/>
                    <input placeholder="Email" name="job_seeker_email" onChange={handleChange}/>
                    <textarea placeholder="Contact Information" name="contact_information" onChange={handleChange}/>
                    <textarea placeholder="Education" name="education" onChange={handleChange}/>
                    <textarea placeholder="Work Experience" name="work_experience" onChange={handleChange}/>
                    <textarea placeholder="Interests" name="interests" onChange={handleChange}/>
                    <textarea placeholder="Additional Information" name="additional_information" onChange={handleChange}/>
                    <button type="submit" onClick={handleSubmit} style={{backgroundColor: 'teal', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 20px', marginRight: '20px'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddResume