import React, { useEffect, useState } from 'react';
import axios from "axios";

const Home = () => {
  const [postings, setPostings] = useState([]);
  
  useEffect(()=> {
    const fetchData = async () => {
      // try{
        console.log("up to here");
        const res = await axios.get("/posts");
        setPostings(res.data);
      // }catch (err) {
      //   console.log(err);
      // }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
        <div className="postings">
          {postings.map((post) => (
            <div className="post" key={post.job_id}>
              <div className="content">
                <h1>{post.title}</h1>
                <p>{post.location}</p>
                <p>{post.flag}</p>
                <p>{post.qualification}</p>
                <p>{post.link}</p>
                <p>{post.disclaimer}</p>
                <p>{post.conpensation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
}



export default Home