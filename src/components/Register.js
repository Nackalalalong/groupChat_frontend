import React from 'react';
import '../App.css';
import  { connect} from 'react-redux';


class Register extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            formErrors: {
                name: "",
                username: "",
                password: "",
                confirmPassword: ""
            }
        }

    }

    isFormValid = () => {
        let formErrors = this.state.formErrors;
        return formErrors.username === "" && formErrors.password === "" && formErrors.confirmPassword === "";
      }
  
      validateForm = () => {
        let formErrors = this.state.formErrors;

        if ( this.state.name === "" ){
            formErrors.name = "this field is required";
        } 
        else {
        formErrors.name = "";
        }

  
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

        if ( this.state.confirmPassword === "" ){
            formErrors.confirmPassword = "this field is required";
        }
        else if ( this.state.confirmPassword !== this.state.password ){
            formErrors.confirmPassword = "password does not match";
        }
        else {
            formErrors.confirmPassword = "";
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
  
      handleRegister = async () => {
        if ( !this.isFormValid() ){
          return ;
        }
  
        try {
          await this.props.register(this.state.username, this.state.password);
        }
        catch(err){
          alert("error");
          console.error(err);
        }
      }

    render(){
        return (
            <div className="App">
                <div className="reg-box">
                    <h1>Register</h1>
                    <div className="text-box">
                        <h3>Name</h3>
                        <input onChange={this.handleChange} name="name" className="text-input" type="text" placeholder="enter your name" />
                        {this.state.formErrors.name !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.name}</span> : null}
                        <h3>Username</h3>
                        <input onChange={this.handleChange} name="username" className="text-input" type="text" placeholder="enter your username" />
                        {this.state.formErrors.username !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.username}</span> : null}
                        <h3>Password</h3>
                        <input onChange={this.handleChange} name="password" className="text-input" type="password" placeholder="enter your password" />
                        {this.state.formErrors.password !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.password}</span> : null}
                        <h3>Confirm Password</h3>
                        <input onChange={this.handleChange} name="confirmPassword" className="text-input" type="password" placeholder="enter your password" />
                        {this.state.formErrors.confirmPassword !== "" ? <span style={{fontSize: "10px", color: "red"}}>{this.state.formErrors.confirmPassword}</span> : null}
                    </div>
                    <button className="login-button mr-20"><a href='/' className="FormField__Link center">Back</a></button>
                    <button className="login-button mr-20"><a href='#' className="FormField__Link center">Submit</a></button>
                </div>
            </div>
        );
    }
};
  
  const mapDispatchToProps = dispatch => {
    return {
        register: (username, password) => {
          return dispatch(auth.register(username, password));
        },
      };
  }
  

export default connect(null,mapDispatchToProps)(Register);