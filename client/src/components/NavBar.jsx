import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/authContext.js"

const NavBar = () => {
    const {currentUser,logout} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="navbar-links">
                    <Link to="/home" className="navbar-link">Home</Link>
                    <Link to="/home/writepost" className="navbar-link">Add New Posting</Link>
                    <Link to="/home/myaccount" className="navbar-link">{currentUser && currentUser.first_name}</Link>
                    <Link  to="/login" className="navbar-link"  onClick={logout}>Logout</Link>
                </div>

            </div>
        </div>
    )
}

export default NavBar
