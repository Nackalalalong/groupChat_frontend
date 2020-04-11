import React from 'react';
import './ChatPage.css';
import SideArea from './SideArea';
import ChatArea from './ChatArea';
import '../App.css';
import { connect } from 'react-redux';
import { auth } from '../actions';
import io from 'socket.io-client';

class ChatPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props.auth.token);

        const me = this;

        this.socket = io("http://localhost:8000", {
            query: "token=" + this.props.auth.token
        });
        this.socket.on("chatRooms", data => {
            console.log("getting chatRooms");
            me.setState({ chatRooms: data })
        });
        this.socket.on("friendList", data => me.setState({ friendList: data }));
    }

    handleLogout = () => {
        this.props.logout();
    }

    render(){
        return (
            <div className="Apps">
                <div className="navbar">
                    <span className="groupchat-name">#ผนงรจตกม</span>
                    <button className="logout-button" onClick={this.handleLogout}>LOG OUT</button>
                </div>
                <div className="content-container">
                    <SideArea />
                    <ChatArea />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
          return dispatch(auth.logout());
        },
      };
  }
  
  

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);