import React, {useContext} from 'react';
import {AuthContext} from "../Firebase";
import {Link} from 'react-router-dom';
import  {Navbar} from 'react-bootstrap';
import app from "../../base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCocktail, faStar } from '@fortawesome/free-solid-svg-icons'
import "./Header.css";

const Header = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="header">
           <Navbar bg="light" expand="lg">
               <div className="container d-flex justify-content-between">
                        <Link className="badge" to="/"><h4>Drinks</h4></Link>
                        <div>
                            <Link to="/profile" hidden={!currentUser} data-toggle="tooltip" title="PROFILE"><FontAwesomeIcon className="icon" icon={faUser} size="lg"/></Link>
                            <Link to="/favorite" hidden={!currentUser} data-toggle="tooltip" title="YOUR FAVORITE"><FontAwesomeIcon className="icon" icon={faStar} size="lg"/></Link>
                            <Link to="/drinks" hidden={!currentUser} data-toggle="tooltip" title="DRINKS"><FontAwesomeIcon className="icon" icon={faCocktail} size="lg"/></Link>
                        </div>
                        <ul className="navbar-nav">
                                {!currentUser &&<li className="nav-item"><Link className="btn btn-sm" role="button" to="/login">Login</Link></li>}
                            
                                {!currentUser &&<li className="nav-item"><Link className="btn btn-sm" role="button" to="/sign-up">Sign Up</Link></li>}
                            
                                {currentUser &&<li className="nav-item"><Link onClick={() => app.auth().signOut()} className="btn btn-sm" role="button" to="/">SignOut</Link></li>}
                        </ul>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;