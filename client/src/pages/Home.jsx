import React, { useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext.js";

const Home = () => {
  const [postings, setPostings] = useState([]);
  const [verifail, setVerifail] = useState(false);
  const [viewPosting, setViewPosting] = useState({});
  const [flags, setFlags] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const myPosts = useLocation().search;
  const myFlags = useLocation().search;
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

  const [err, setError] = useState(null);

  const handleApply = (jobid) => async () => {
    try {
      await axios.post(`/appliedto/${jobid}`);
      navigate("/home/appliedto");
    } catch (err) {
      setError(err.response.data);
      if(err.response.data) setVerifail(true);
      console.log(err.response.data);
    }
  }

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

  function handleView(post) {
    setViewPosting(post);
  }

  const handleFlag = (jobid) => async () => {
    try {
      await axios.post(`/appliedto/flag/${jobid}`);
      setFlags([...flags, {job_id:jobid}]);
    } catch (err) {
      console.log(err);
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

  return (
      <div className="home">
        <div className="stack">
        <div className="job-posting-header"><h1>Job Postings</h1></div>
         {verifail && <p style={{ color: "red" }}>YOU MUST VERIFY YOUR ACCOUNT BEFORE APPLYING</p>}
        <div className="home-postings">
          {postings.map((post) => (
              <div className="home-post" key={post.job_id}>
                <div className="home-content">
                  <h2>{post.title}</h2>
                  <p>Posting #{post.job_id}</p>
                  <p>{post.location}</p>
                  <p>{post.company}</p>
                  {currentUser.affiliated_company && (
                  <div className="home-edit">
                    <button onClick={() => handleView(post)}>View</button>
                    {currentUser.account_id === post.account_id && (
                        <>
                          <button onClick={handleEdit(post.job_id)}>Edit</button>
                          <button onClick={handleDelete(post.job_id)}>Delete</button>
                        </>
                    )}
                  </div>
                  )}
                  {currentUser && !currentUser.affiliated_company && (
                      <div className="home-apply">
                        <button onClick={() => handleView(post)}>View</button>
                        <button onClick={handleApply(post.job_id)}> Apply</button>
                        {!flags.some((flag) => flag.job_id === post.job_id) && (
                        <button onClick={handleFlag(post.job_id)}> Flag</button>)}
                        {flags.some((flag) => flag.job_id === post.job_id) && (
                            <button onClick={handleUnflag(post.job_id)}> Unflag</button>)}
                      </div>
                  )}
                </div>
              </div>
          ))}
        </div>
        </div>
        <div className="view-posting">
          {viewPosting.job_id && (
              <>
            <h1>{viewPosting.title} #{viewPosting.job_id} </h1>
            <h2> {viewPosting.company}</h2>
                {currentUser.account_id === viewPosting.account_id && (
                    <div className="home-edit">
                      <button onClick={handleEdit(viewPosting.job_id)}>Edit</button>
                      <button onClick={handleDelete(viewPosting.job_id)}>Delete</button>
                    </div>
                )}

                {currentUser && !currentUser.affiliated_company && (
                    <div className="home-apply">
                      <button onClick={handleApply(viewPosting.job_id)}>Apply</button>
                      {!flags.some((flag) => flag.job_id === viewPosting.job_id) && (
                          <button onClick={handleFlag(viewPosting.job_id)}> Flag</button>)}
                      {flags.some((flag) => flag.job_id === viewPosting.job_id) && (
                          <button onClick={handleUnflag(viewPosting.job_id)}> Unflag</button>)}
                    </div>
                )}
            <p>{viewPosting.location}</p>
            <p>Qualifications: {viewPosting.qualification}</p>
            <p>Application Link: {viewPosting.link}</p>
            <p>Compensation: {viewPosting.compensation}</p>
            <p>Description: {viewPosting.description}</p>
            <p>Disclaimer: {viewPosting.disclaimer}</p>
              </>
            )}
        </div>
      </div>
  );
}



export default Home