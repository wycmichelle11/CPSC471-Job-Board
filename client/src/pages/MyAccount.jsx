import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
    const [resumes, setResumes] = useState([]);
    const myResumes = useLocation().search;
    useEffect(()=> {
        const fetchData = async () => {
        try{
            console.log("up to here");
            const res = await axios.get(`/resumes`);
            setResumes(res.data);
        }catch (err) {
            console.log(err);
        }
        };
        fetchData();
    }, [myResumes]);


    // const handleDelete = (jobid) => async () => {
    //     try {
    //     await axios.delete(`/posts/${jobid}`);
    //     setResumes(resumes.filter((post) => post.job_id !== jobid));
    //     } catch (err) {
    //     console.log(err);
    //     }
    // }



    return(
        <div className="resume">
            <div className="addresume">
                <Link to="/home/resume">Add/Update Resume</Link>
            </div>
            <div className="display-resume">
            {resumes.map((post) => (
                <div className="resume-post" key={post.job_seeker_email}>
                    <div className="resume-content">
                        <h1>My Resume</h1>
                        <p>Name: {post.first_name} {post.last_name}</p>
                        <p>Email: {post.job_seeker_email}</p>
                        <p>Contact Information: {post.contact_information}</p>
                        <p>Education: {post.education}</p>
                        <p>Work Experience: {post.work_experience}</p>
                        <p>Interests: {post.interests}</p>
                        <p>Additional Information: {post.additional_information}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
        

    )
}
export default MyAccount