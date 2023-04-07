import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="navbar-links">
                    <Link to="/writepost" className="navbar-link">Add New Posting</Link>
                    <Link className="navbar-link">My Account</Link>
                    <span>Logout</span>
                </div>
                
            </div>
        </div>
    )
}

export default NavBar
