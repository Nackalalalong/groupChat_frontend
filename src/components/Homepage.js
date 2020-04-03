import React from 'react';
import '../App.css';
const Homepage = () => {
    return (
        <div className="App">
          <div className="login-box">
          <h1>Login</h1>
            <div className="text-box">
              <h3>Username</h3>
              <input className="text-input" type="text" placeholder="enter your username" />
              <h3>Password</h3>
              <input className="text-input" type="text" placeholder="enter your password" />
            </div>
            <button className="login-button mr-20"><a href='#' className="FormField__Link center">Login</a></button>
          </div>
          <button className="submit-button mr-20"><a href='/chatpage' className="FormField__Link">Go to ChatPage</a></button>
        </div>
    );
};

export default Homepage;