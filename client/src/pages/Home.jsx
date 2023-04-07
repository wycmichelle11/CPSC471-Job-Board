import React from 'react'

const Home = () => {
    // const [title, setTitle] = useState("");
    // const [location, setLocation] = useState("");
    // const [jobList, setJobList] = useState([]); //jobList has all the names

    // useEffect(()=> {
    //     Axios.get("http://localhost:3001/api/get").then((response)=> {
    //     setJobList(response.data);
    //     });
    // }, []);
    
    
    // const postJobPosting = () => {
    //     Axios.post('http://localhost:3001/api/insert', {
    //     title: title, 
    //     location: location,
    //     });
        
    //     setJobList([...jobList, {title: title, location: location}]); //don't need to refresh page to see updates
    // };
    return (
        <div>Home</div>
    // <div className="App">
    //   <h1>Job Board</h1>
    //   <h2> Create a Job Posting</h2>
    //   <div className="jobPostingForm">
    //     <label>Job Title</label>
    //     <input type="text" name="JobTitle" onChange={(e)=>{setTitle(e.target.value)}}/>
    //     <label>Location</label>
    //     <input type="text" name="Location" onChange={(e)=>{setLocation(e.target.value)}}/>
    //     <button onClick={postJobPosting}> Post </button>
    //     {jobList.map((val)=> {
    //       return (
    //         <div className="card">
    //           <h1>{val.title}</h1>
    //           <p>
    //             {val.location}
    //           </p> 
    //           <button>Delete Posting</button>
    //           <input type="text" id="updateInput"></input>
    //           <button>Update</button>
    //         </div> 
    //       );
    //     })}
    //   </div>
    // </div>
  );
}



export default Home