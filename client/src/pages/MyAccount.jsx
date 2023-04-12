import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext.js"

const MyAccount = () => {
    const {currentUser} = useContext(AuthContext);
    const [err, setError] = useState(null);
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [postings, setPostings] = useState([]);
    const [flags, setFlags] = useState([]);
    const myResumes = useLocation().search;
    const myPosts = useLocation().search;
    const myFlags = useLocation().search;

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

    useEffect(()=> {
        const fetchFlags = async () => {
            try{
                const res = await axios.get(`/appliedto/flag`);
                setFlags(res.data);
            }catch (err) {
                console.log(err);
            }
        };
        fetchFlags();
    }, [myFlags]);
    

    const handleDelete = (jobid) => async () => {
        try {
          await axios.delete(`/posts/${jobid}`);
          setPostings(postings.filter((post) => post.job_id !== jobid));
        } catch (err) {
          console.log(err);
        }
    }

    const handleEdit = (jobid) => async () => {
        navigate('/home/editpost', {state:{ jobid: jobid }});
    }

    const handleVerify = async () => {
        try {
            console.log(currentUser);
            await axios.post(`/auth/verify/${currentUser.email}`);
        } catch (err) {
            console.log(err);
        }
    }

    const addResume = async (e) => {
        e.preventDefault();
        try {
            navigate("/home/resume");
        } catch(err) {
            setError(err.response.data);
        }
    }

    const handleApply = (jobid) => async () => {
        try {
            await axios.post(`/appliedto/${jobid}`);
            navigate("/home/appliedto");
        } catch (err) {
            setError(err.response.data);
            console.log(err.response.data);
        }
    }

    const handleUnflag = (jobid) => async () => {
        try {
            await axios.delete(`/appliedto/flag/${jobid}`);
            const removed = flags.filter((flag)=> flag.job_id !== jobid);
            setFlags(removed);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="myaccount-container">
            <div className="addResume">
                <div className="resume-edit">
                    {currentUser && currentUser.verified===0 && (
                        <>
                            <button onClick={handleVerify}>Verify Account</button>
                        </>
                    )}
                    {currentUser && !currentUser.affiliated_company && (
                        <>
                            <button onClick={addResume}>Add Resume</button>
                            <button>Update Resume</button>
                            <button>Delete Resume</button>
                        </>
                    )}
                </div>
            </div>
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
            {(currentUser && currentUser.affiliated_company) &&
            <div className="acc-postings">
                <div className="title"> <h1>My Postings</h1> </div>
                {postings.map((post) => (
                    <div className="acc-post" key={post.job_id}>
                        {currentUser.account_id === post.account_id && (<div className="home-content">
                            <h1>{post.title}</h1>
                                <div className="home-edit">
                                    <button onClick={handleEdit(post.job_id)}>Edit</button>
                                    <button onClick={handleDelete(post.job_id)}>Delete</button>
                                </div>
                                <p>Posting#: {post.job_id}</p>
                                <p>Poster: {post.account_id}</p>
                                <p>Location: {post.location}</p>
                                <p>Description: {post.description}</p>
                                <p>Qualifications: {post.qualification}</p>
                                <p>Application Link: {post.link}</p>
                                <p>Disclaimer: {post.disclaimer}</p>
                                <p>Compensation: {post.compensation}</p>
                                
                        </div>)}
                    </div>
                ))}
            </div>}

            {(currentUser && !currentUser.affiliated_company) &&
                <div className="acc-postings">
                    <div className="title"> <h1>Flagged Postings</h1> </div>
                    {flags.map((post) => (
                        <div className="acc-post" key={post.job_id}>
                            {currentUser.account_id === post.account_id && (<div className="home-content">
                                <h1>{post.title}</h1>
                                <div className="home-edit">
                                    <button onClick={handleApply(post.job_id)}>Apply</button>
                                    <button onClick={handleUnflag(post.job_id)}>Unflag</button>
                                </div>
                                <p>Posting#: {post.job_id}</p>
                                <p>Poster: {post.account_id}</p>
                                <p>Location: {post.location}</p>
                                <p>Description: {post.description}</p>
                                <p>Qualifications: {post.qualification}</p>
                                <p>Application Link: {post.link}</p>
                                <p>Disclaimer: {post.disclaimer}</p>
                                <p>Compensation: {post.compensation}</p>

                            </div>)}
                        </div>
                    ))}
                </div>}

        </div>

    )
}
export default MyAccount