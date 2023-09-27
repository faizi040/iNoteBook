import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// The useLocation React Router Hook allows you to access the location object that represents the active URL
const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            {/* using ternary operator to set active class if location .pathname is equal to rquired pathname */}
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>


                    </ul>

                </div>
                {!localStorage.getItem('token') ? <div className="d-flex">

                    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signUp" role="button">SignUp</Link>
                </div> : <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}

export default Navbar
//nothing but only arrow function base components -same working like function components
