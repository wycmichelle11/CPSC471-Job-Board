import React, { useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [postings, setPostings] = useState([]);
  
  const myPosts = useLocation().search;
  useEffect(()=> {
    const fetchData = async () => {
      try{
        console.log("up to here");
        const res = await axios.get(`/posts${myPosts}`);
        setPostings(res.data);
      }catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [myPosts]);

  return (
    <div className="home">
        <div className="postings">
          {postings.map((post) => (
            <div className="post" key={post.job_id}>
              <div className="content">
                <h1>{post.title}</h1>
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