import React, {useCallback, useContext} from 'react';
import {withRouter, Redirect} from 'react-router';
import app from "../base";
import {AuthContext} from "./Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase"

const Login = ({history}) => {
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
      }

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push('/drinks');
        } catch (error) {
            document.getElementById('emailHelp').innerHTML = error;
        }
    }, [history])

    const {currentUser} = useContext(AuthContext);

    if(currentUser) {
        return <Redirect to="/drinks"/>
    }
    return (
        <div className="login">
        <h3>Log In</h3>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email address</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                <small id="emailHelp" className="form-text text-danger"></small>
            </div>
            <div className="form-group">
                <label>Password</label>
                
                <input name="password" type="password" className="form-control" id="exampleInputPassword1"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <div className="login-with-sn">
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={app.auth()}
                />
            </div>
        </form>
    </div>
    );
}

export default withRouter(Login);