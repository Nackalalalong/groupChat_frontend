import React from 'react';
import '../App.css';
import  { connect} from 'react-redux';
import { auth } from '../actions';
import { withRouter, Redirect } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

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
            },
            showModal: false,
            goToLogin: false
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
          this.validateForm();
        if ( !this.isFormValid() ){
          return ;
        }
  
        try {
          let res = await this.props.register(this.state.name, this.state.username, this.state.password);
          console.log("login successful");
          console.log(res);
          this.setState({
            showModal: true
          });
        }
        catch(err){
          console.error(err);
        }
      }

      goBack = () => {
        this.props.history.goBack();
      }

      handleClose = () => {
        console.log("handle close")
        this.setState({
          goToLogin: true,
          showModal: false
        })
      }

    render(){

      if ( this.state.goToLogin ){
        return <Redirect to="/login" />
      }

        return (
            <div className="App">
                <div className="reg-box">
                    <h1>Register</h1>
                    <div className="text-box">
                        <h3>Name{this.state.formErrors.name !== "" ? <span style={{fontSize: "10px", color: "red", marginLeft: "1rem"}}>{this.state.formErrors.name}</span> : null}</h3>
                        <input onChange={this.handleChange} name="name" className="text-input" type="text" placeholder="enter your name" />
                        <h3>Username{this.state.formErrors.username !== "" ? <span style={{fontSize: "10px", color: "red", marginLeft: "1rem"}}>{this.state.formErrors.username}</span> : null}</h3>
                        <input onChange={this.handleChange} name="username" className="text-input" type="text" placeholder="enter your username" />
                        <h3>Password{this.state.formErrors.password !== "" ? <span style={{fontSize: "10px", color: "red", marginLeft: "1rem"}}>{this.state.formErrors.password}</span> : null}</h3>
                        <input onChange={this.handleChange} name="password" className="text-input" type="password" placeholder="enter your password" />
                        <h3>Confirm Password{this.state.formErrors.confirmPassword !== "" ? <span style={{fontSize: "10px", color: "red", marginLeft: "1rem"}}>{this.state.formErrors.confirmPassword}</span> : null}</h3>
                        <input onChange={this.handleChange} name="confirmPassword" className="text-input" type="password" placeholder="enter your password" />
                    </div>
                </div>
                <div>
                    <button className="login-button mr-20" onClick={this.goBack}>Back</button>
                    <button className="login-button mr-20" onClick={this.handleRegister}>Submit</button>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Registration Success!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>You can now login.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                      Go To Login
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
};
  
  const mapDispatchToProps = dispatch => {
    return {
        register: (name, username, password) => {
          return dispatch(auth.register(name, username, password));
        },
      };
  }
  

export default connect(null,mapDispatchToProps)(withRouter(Register));