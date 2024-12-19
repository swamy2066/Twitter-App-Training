import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Twitter App</h1>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">Home</Link>
                </li>

                <li>
                    <Link to="/register" className="navbar-link">Register</Link>
                </li>

                <li>
                    <Link to="/login" className="navbar-link">Login</Link>
                </li>

                <li>
                    <Link to="/post" className="navbar-link">Posts</Link>
                </li>

                 <li>
                    <Link to="/Comments" className="navbar-link">Comments</Link>
                </li>

                <li>
                    <Link to="/userprofile" className="navbar-link">UserProfile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
