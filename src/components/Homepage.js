import React from 'react';
import '../App.css';
import { auth } from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Homepage extends React.Component  {
    constructor(props){
      super(props);
      this.state = {
        username: "",
        password: "",
        formErrors: {
          username: "",
          password: ""
        }
      }
    }

    isFormValid = () => {
      let formErrors = this.state.formErrors;
      return formErrors.username === "" && formErrors.password === "";
    }

    validateForm = () => {
      let formErrors = this.state.formErrors;

      if ( this.state.username === "" ){
        formErrors.username = "this field is required";
      } 
      else {
        formErrors.username = "";
      }

      if ( this.state.password === "" ){
        formErrors.password = "this field is required";
      }
      else {
        formErrors.password = "";
      }

      this.setState({
        formErrors
      });
    }

    handleChange = e => {
      const { name,value } = e.target
      this.setState({
          [name] : value
      });
  }

    handleLogin = async () => {
      if ( !this.isFormValid() ){
        return ;
      }

      try {
        await this.props.login(this.state.username, this.state.password);
      }
      catch(err){
        alert("error");
        console.error(err);
      }
    }

    render(){

      if ( this.props.isAuthenticated ){
        return <Redirect to="/chatpage" />
      }

      return (
        <div className="App">
          <div className="login-box">
          <h1>Login</h1>
            <div className="text-box">
              <h3>Username</h3>
              <input onChange={this.handleChange} name="username" className="text-input" type="text" placeholder="enter your username" />
              {this.state.formErrors.username !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.username}</span> : null}
              <h3>Password</h3>
              <input onChange={this.handleChange} name="password" className="text-input" type="password" placeholder="enter your password" />
              {this.state.formErrors.password !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.password}</span> : null}
            </div>
            <button className="login-button mr-20" onClick={() => this.handleLogin}>Login</button>
          </div>
          <button className="submit-button mr-20"><a href='/chatpage' className="FormField__Link">Go to ChatPage</a></button>
        </div>
    );
    }
};


const mapStateToProps = state => {
  return {
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
      login: (username, password) => {
        return dispatch(auth.login(username, password));
      },
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Homepage);