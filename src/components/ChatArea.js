import React from 'react';
import './ChatArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

class ChatArea extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            roomCID: null,
            message: "",
            showModal: false
        }

        this.props.socket.on("thisRoom", room => {
            console.log(room);
            this.setState({
               ...room
            });
        });

        this.props.socket.on("updateRoom", this.updateRoom);
        this.props.socket.on("deleteGroupSuccess", (some) => {
            window.location.reload();
        });
    }

    updateRoom = (chat) => {
        console.log("update room");
        console.log(chat);
        let messages = this.state.messages;
        messages.push(chat);
        this.setState({
            messages
        })
    }

    updateRoomInfo = (roomCID) => {
        if ( roomCID !== this.state.roomCID ){
            this.setState({
                roomCID
            });
            this.loadChatData(roomCID);
        }
    }

    loadChatData = (roomCID) => {
        console.log("loading chat data " + roomCID);
        this.props.socket.emit("room", roomCID);
    }

    handleSendMessage = () => {
        console.log("handle send message");
        let message = this.state.message;
        if ( message == null || message === "" ){
            return ;
        }

        console.log("sending message: " + message)
        this.props.socket.emit("chat", {
            msg: message,
            username: this.props.user.username,
            cid: this.state._id
        });
        this.setState({
            message: ""
        });
    }

    handleChange = e => {
        const { name,value } = e.target
        this.setState({
            [name] : value
        });
    }

    padTwo = (number) => {
        return Array(Math.max(2 - String(number).length + 1, 0)).join(0) + number;
    }

    getTime = (timestamp) => {
        let date = new Date(timestamp);
        let now = new Date();
        // console.log(date);
        const thaiDays = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", ]
        const thaiMonths = ['ม.ค.', "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        if ( now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear() ){
            return this.padTwo(date.getHours()) + ":" + this.padTwo(date.getMinutes()) + " น.";
        }
        return thaiDays[date.getDay()] + " " + date.getDate() + " " + thaiMonths[date.getMonth()] + " " +
            this.padTwo(date.getHours()) + ":" + this.padTwo(date.getMinutes()) + " น.";
    }

    handleDeleteGroup = () => {
        console.log("emitting delete group id: " + this.state._id);
        this.props.socket.emit("deleteGroup", this.state._id);
        console.log("done emitting deleteGroup");
        // window.location.reload();
    }

    showDeleteGroupConfirmation = () => {
        console.log("show delete group modal");
        this.setState({
            showModal: true
        })
    }

    handleClose = () => {
        console.log("handle close modal");
        this.setState({
            showModal: false
        })
    }

    render(){

        if ( this.state._id == null ){
            return (
                <div className="chat-area">
                    <h1 style={{color: "gray"}}>pls select chat</h1>
                </div>
            );
        }

        let chatComponents = [];
        for( let i=this.state.messages.length-1; i>=0; i--){
            const chatMessage = this.state.messages[i];
            if ( chatMessage.username === this.props.user.username ){
                chatComponents.push(
                    <div key={"chat" + chatMessage.timestamp} className="chat-item-me">
                        <div className="chat-item-message">{chatMessage.msg}</div>
                        <div className="chat-timestamp-holder">
                            <div className="chat-timestamp">{this.getTime(chatMessage.timestamp)}</div>
                        </div>
                    </div>
                );
            }
            else {
                chatComponents.push(
                    <div key={"chat" + chatMessage.timestamp} className="chat-item">
                        <img className="profile-image chat-item-profile-image" src={require("../images/dog2.png")} />
                        <div className="chat-item-message">{chatMessage.msg}</div>
                        <div className="chat-timestamp-holder">
                            <div className="chat-timestamp">{this.getTime(chatMessage.timestamp)}</div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="chat-area">
                <div className="top-bar">
                    <span className="top-bar-header-text">{this.state.chatName}</span><br />
                    <span className="top-bar-sub-text">{"number of members: " + this.state.members.length 
                        + " group ID: " + this.state._id}</span>
                    <button onClick={this.showDeleteGroupConfirmation} className="btn btn-secondary delete-group-button">delete</button>
                </div>
                <div className="middle-screen">
                    {chatComponents}
                </div>
                <div className="bottom-input">
                     <img className="profile-image" src={require("../images/dog1.png")} />
                     <input value={this.state.message} name="message" onChange={this.handleChange}  className="chat-input" type="text" placeholder="enter your message..." />
                     <button onClick={this.handleSendMessage} className="send-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "5px"}} />Send</button>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete this group?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>evething related to this group will be disappeared!</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        no
                    </Button>
                    <Button variant="danger" onClick={this.handleDeleteGroup}>
                        yes
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ChatArea;