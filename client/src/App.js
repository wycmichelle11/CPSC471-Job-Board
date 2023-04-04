import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Job Board</h1>
      <h2> Create a Job Posting</h2>
      <div className="jobPostingForm">
        <label>Job Title</label>
        <input type="text" name="JobTitle" />
        <label>Company Name</label>
        <input type="text" name="CompanyName" />
        <button> Post </button>
      </div>
    </div>
  );
}

export default App;
