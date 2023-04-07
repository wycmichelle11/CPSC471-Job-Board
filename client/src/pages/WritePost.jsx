import React from 'react'

const WritePost = () => {
    return (
        <div className="write">
            <div className="content">
                <h1>Add New Posting</h1>
                <div className="new-posting-container">
                    <form className="new-posting-form">
                        <input placeholder="Job Title"></input>
                        <input contenteditable="true" type="text" placeholder="Description"></input>
                        <input placeholder="Location"></input>
                        <input placeholder="Qualifications"></input>
                        <input placeholder="Link to apply"></input>
                        <input placeholder="Disclaimer"></input>
                        <input placeholder="Compensation"></input>
                        <input placeholder="Application Deadline"></input>
                    </form>
                    <button type="submit">Post</button>
                </div>
                
            </div>
        </div>


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




    )
}

export default WritePost

