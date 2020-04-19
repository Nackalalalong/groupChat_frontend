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
            currentRoomCID: null,
            unreadCount: null
        }
        console.log(this.props.auth.token);
        this.chatAreaRef = React.createRef();

        this.socket = io("http://localhost:8000", {
            query: "token=" + this.props.auth.token
        });
        this.socket.on("friendList", data => this.setState({ friendList: data }));
        this.socket.on("isAuth", data => this.setState({
             user: data, 
             currentRoomCID: data.chatRooms.length > 0 ? data.chatRooms[0].cid : null
            }));
    }

    handleLogout = () => {
        this.props.logout();
    }

    changeChatRoom = (roomCID) => {
        this.setState({
            currentRoomCID: roomCID
        });
        this.chatAreaRef.current.updateRoomInfo(roomCID);
    }

    test = async (e) => {
        this.socket.emit("reqUnreadMsg");
    }

    setUnreadCount = (count) => {
        this.setState({
            unreadCount: count
        })
    }

    render(){
        if ( this.state.user == null ){
            return <h1>loading...</h1>
        }

        return (
            <div className="Apps">
                <div className="navbar">
                    <span className="groupchat-name">#ผนงรจตกม</span>
                    {/* <button onClick={this.test}>test</button> */}
                    <button className="logout-button" onClick={this.handleLogout}>LOG OUT</button>
                </div>
                <div className="content-container">
                    <SideArea setUnreadCount={this.setUnreadCount} socket={this.socket} user={this.state.user} changeChatRoom={this.changeChatRoom}/>
                    <ChatArea unreadCount={this.state.unreadCount} ref={this.chatAreaRef} socket={this.socket} user={this.state.user} roomCID={this.state.currentRoomCID}/>
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