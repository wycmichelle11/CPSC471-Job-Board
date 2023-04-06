import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobList, setJobList] = useState([])

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/get").then((response)=> {
      setJobList(response.data);
    });
  }, []);
  
  
  const postJobPosting = () => {
    Axios.post('http://localhost:3001/api/insert', {
      title: title, 
      location: location,
    }).then(() => {
      alert("successful insert");
    })
  };




  return (
    <div className="App">
      <h1>Job Board</h1>
      <h2> Create a Job Posting</h2>
      <div className="jobPostingForm">
        <label>Job Title</label>
        <input type="text" name="JobTitle" onChange={(e)=>{setTitle(e.target.value)}}/>
        <label>Location</label>
        <input type="text" name="Location" onChange={(e)=>{setLocation(e.target.value)}}/>
        <button onClick={postJobPosting}> Post </button>
        {jobList.map((val)=> {
          return <h1>Title: {val.title} | Location: {val.location} </h1>
        })}
      </div>
    </div>
  );
}

export default App;
