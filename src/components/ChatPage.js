import React from 'react';
import './ChatPage.css';
import SideArea from './SideArea';
import ChatArea from './ChatArea';
import '../App.css';
import { connect } from 'react-redux';
import { auth } from '../actions';

class ChatPage extends React.Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.logout();
    }

    render(){
        return (
            <div className="Apps">
                <div className="navbar">
                    <span className="groupchat-name">#ผนงรจตกม</span>
                    <button className="btn btn-secondary" onClick={this.handleLogout}>LOG OUT</button>
                </div>
                <div className="content-container">
                    <SideArea />
                    <ChatArea />
                </div>
            </div>
        );
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
          return dispatch(auth.logout());
        },
      };
  }
  
  

export default connect(null, mapDispatchToProps)(ChatPage);