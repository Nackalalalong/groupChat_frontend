import React from 'react';
import '../App.css';
const Register = () => {
    return (
        <div className="App">
            <div className="reg-box">
                <h1>Register</h1>
                <div className="text-box">
                    <h3>Name</h3>
                    <input className="text-input" type="text" placeholder="enter your name" />
                    <h3>Username</h3>
                    <input className="text-input" type="text" placeholder="enter your username" />
                    <h3>Password</h3>
                    <input className="text-input" type="text" placeholder="enter your password" />
                </div>
                <button className="login-button mr-20"><a href='/' className="FormField__Link center">Back</a></button>
                <button className="login-button mr-20"><a href='#' className="FormField__Link center">Submit</a></button>
            </div>
        </div>
    );
};
export default Register;