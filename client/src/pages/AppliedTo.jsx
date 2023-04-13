import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const AppliedTo = () => {
    const {currentUser} = useContext(AuthContext);
    const [applied, setApplied] = useState([]);
    const myApplied = useLocation().search;
    
    useEffect(()=> {
        const fetchData = async () => {
          try{
            const res = await axios.get(`/appliedto/`);
            setApplied(res.data);
          }catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [myApplied]);


    return(
        <div className="appliedto-container">
            <div className="title">
                <h1>Applied Jobs</h1>
            </div>
            <div className="acc-postings">
                {applied.map((job) => (
                    <div className="acc-post" key={job.job_id}>
                        <div className="home-content">
                            <h2>{job.title}</h2>
                            <p>Posting #{job.job_id}</p>
                            <p>Company: {job.company}</p>
                            <p>Location: {job.location}</p>
                            <p>Description: {job.description}</p>
                            <p>Qualifications: {job.qualification}</p>
                            <p>Application Link: {job.link}</p>
                            <p>Disclaimer: {job.disclaimer}</p>
                            <p>Compensation: {job.compensation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )          
}
export default AppliedTo