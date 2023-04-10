import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext.js"

const MyAccount = () => {
    const {currentUser,logout} = useContext(AuthContext);

    const [resumes, setResumes] = useState([]);
    const [postings, setPostings] = useState([]);
    const myResumes = useLocation().search;
    const myPosts = useLocation().search;
    useEffect(()=> {
        const fetchDataResume = async () => {
        try{
            const res = await axios.get(`/resumes`);
            setResumes(res.data);
        }catch (err) {
            console.log(err);
        }
        };
        fetchDataResume();
    }, [myResumes]);

    useEffect(()=> {
        const fetchData = async () => {
          try{
            const res = await axios.get(`/posts`);
            setPostings(res.data);
          }catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [myPosts]);
    

    const handleDelete = (jobid) => async () => {
        try {
          await axios.delete(`/posts/${jobid}`);
          setPostings(postings.filter((post) => post.job_id !== jobid));
        } catch (err) {
          console.log(err);
        }
      }



    return(
        <div className="myaccount-container">
            {(currentUser && !currentUser.affiliated_company) && <div className="addresume">
                <Link to="/home/resume">Add/Update Resume</Link>
            </div>}
            {(currentUser && !currentUser.affiliated_company) && <div className="display-resume">
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
            </div>}

            <div className="home-postings">
                {postings.map((post) => (
                    <div className="home-post" key={post.job_id}>
                        {currentUser.account_id === post.account_id && (<div className="home-content">
                            <h1>{post.title}</h1>
                                <div className="home-edit">
                                    <button>Edit</button>
                                    <button onClick={handleDelete(post.job_id)}>Delete</button>
                                </div>
                                
                                <p>Posting#: {post.job_id}</p>
                                <p>Poster: {post.account_id}</p>
                                <p>Location: {post.location}</p>
                                <p>Flag: {post.flag}</p>
                                <p>Qualifications: {post.qualification}</p>
                                <p>Application Link: {post.link}</p>
                                <p>Disclaimer: {post.disclaimer}</p>
                                <p>Compensation: {post.compensation}</p>
                                
                        </div>)}
                    </div>
                ))}
            </div>

        </div>

    )
}
export default MyAccount