import React, {useContext} from 'react';
import {AuthContext} from "./Firebase";
import {Link} from 'react-router-dom';
import  {Navbar} from 'react-bootstrap';
import app from "../base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCocktail } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="header">
           <Navbar bg="light" expand="lg">
               <div className="container d-flex justify-content-between">
                        <Link className="badge" to="/"><h4>Drinks</h4></Link>
                        <div>
                            {currentUser &&<Link to="/profile"><FontAwesomeIcon id="icon" icon={faUser} color="#6C757D" size="lg"/></Link>}
                            {currentUser &&<Link to="/drinks"><FontAwesomeIcon id="icon" icon={faCocktail} color="#6C757D" size="lg"/></Link>}
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {!currentUser &&<Link className="btn btn-secondary btn-sm" role="button" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item">
                                {!currentUser &&<Link className="btn btn-secondary btn-sm" role="button" to="/sign-up">Sign Up</Link>}
                            </li>
                            <li className="nav-item">
                                {currentUser &&<Link onClick={() => app.auth().signOut()} className="btn btn-secondary btn-sm" role="button" to="/login">SignOut</Link>}
                            </li>
                        </ul>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;