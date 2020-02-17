import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "./Firebase";


const Home = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="home">
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Welcome to Home Page!</h1>
                    <p className="lead">This is a simple DB API where you can see different drinks, cocktails and others.</p>
                    {
                    !currentUser&&
                    <p className="lead">To see more information you should 
                    <Link to="login" className="alert-link"> Login </Link> or 
                    <Link to="sign-up" className="alert-link"> Register</Link>. 
                    Give it a click if you like.</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;