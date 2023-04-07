import React from 'react'

const Home = () => {
  //dymmy data for now
    const postings = [
      {
        id: 1,
        title: "plumber",
        location:"calgary"
      },
      {
        id: 2,
        title: "plumber",
        location:"calgary2"
      }
    ]
      return (
        <div className="home">
            <div className="posts">
              {postings.map((post) => (
                <div className="post" key={post.id}>
                  <div className="content">
                    <h1>{post.title}</h1>
                    <p>{post.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
  );
}



export default Home