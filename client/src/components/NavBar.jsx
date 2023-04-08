import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/authContext.js"

const NavBar = () => {
    const {currentUser,logout} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="nav-container">
                <div className="navbar-links">
                    <Link to="/writepost" className="navbar-link">Add New Posting</Link>
                    <span>{currentUser && currentUser.first_name}</span>
                    {currentUser? <span onClick={logout}>Logout</span> : <Link className="link" to={"/login"}>Login</Link>}
                </div>

            </div>
        </div>
    )
}

export default NavBar
