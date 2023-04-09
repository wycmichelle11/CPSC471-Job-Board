import React, { useContext, useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/authContext.js";

const Home = () => {
  const [postings, setPostings] = useState([]);
  
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const myPosts = useLocation().search;
  console.log(myPosts);
  useEffect(()=> {
    const fetchData = async () => {
      try{
        console.log("up to here");
        const res = await axios.get(`/posts`);
        setPostings(res.data);
      }catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [myPosts]);

  const handleDelete = async (job_id)=>{
    try {
      await axios.delete(`/posts/${job_id}`);
      navigate("/home")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
        <div className="postings">
          {postings.map((post) => (
            <div class="card" className="post" key={post.job_id}>
              <div className="content">
                <h1>{post.title}</h1>
                {currentUser.account_id === post.account_id && (
                  <div className="edit">
                    <button>Edit</button>
                    <button onClick={handleDelete(post.job_id)}>Delete</button>
                  </div>
                ) }
                <p>Location: {post.location}</p>
                <p>Flag: {post.flag}</p>
                <p>Qualifications: {post.qualification}</p>
                <p>Application Link: {post.link}</p>
                <p>Disclaimer: {post.disclaimer}</p>
                <p>Compensation: {post.compensation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
}



export default Home