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




    )
}

export default WritePost

