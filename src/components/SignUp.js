import React, {useCallback} from 'react';
import {withRouter} from 'react-router';
import app from "../base";

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(({user}) => {
                    app.database().ref('users/user_' + user.uid).child('email').set(email.value);
                })
            history.push('/drinks');
        } catch (error) {
            document.getElementById('emailHelp').innerHTML = error;
        }
    }, [history])
    return (
        <div className="sign-up">
            <h3>Sign Up</h3>
            <form onSubmit={handleSignUp}>
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
            </form>
        </div>
    );
}

export default withRouter(SignUp);