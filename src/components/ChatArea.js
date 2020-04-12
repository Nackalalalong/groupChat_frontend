import React from 'react';
import './ChatArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class ChatArea extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            roomCID: null,
            room: null,
            message: ""
        }

        this.props.socket.on("thisRoom", room => {
            console.log(room);
            this.setState({
               ...room
            });
        });

        this.props.socket.on("updateRoom", this.updateRoom);
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

    getTime = (timestamp) => {
        let date = new Date(timestamp);
        console.log(date);
        const thaiDays = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", ]
        const thaiMonths = ['ม.ค.', "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        return thaiDays[date.getDay()] + " " + date.getDate() + " " + thaiMonths[date.getMonth()] + " " +
            date.getHours() + ":" + date.getMinutes() + " น.";
    }

    render(){

        if ( this.state._id == null ){
            return (
                <div className="chat-area">
                    <h1>pls select chat</h1>
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
                    </div>
                );
            }
        }

        return (
            <div className="chat-area">
                <div className="top-bar">
                    <span className="top-bar-header-text">{this.state.chatName}</span><br />
                    <span className="top-bar-sub-text">number of members: {this.state.members.length}</span>
                </div>
                <div className="middle-screen">
                    {chatComponents}
                     {/* <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog2.png")} />
                         <div className="chat-item-message">สวัสดี สิริ!</div>
                         <div className="chat-timestamp-holder">
                            <div className="chat-timestamp">{"asdasdasdasdasd"}</div>
                        </div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog3.png")} />
                         <div className="chat-item-message">สวัสดี มีไรให้ช่asdasd asads asd asd asd asd asasd ads asdas ads ads asdas dads วยหรอมานุดsas das dasd asd sadas dasd asd asd asd asd asd asd asd ads ดด!</div>
                         <div className="chat-timestamp-holder">
                            <div className="chat-timestamp">{"asdasdasdasdasd"}</div>
                        </div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog2.png")} />
                         <div className="chat-item-message">ช่วยทำโปรเจคหน่อยจิ</div>
                     </div>
                     <div className="chat-item-me">
                         <div className="chat-item-message">ทำไรกันอยู่หนะพวกนายยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog2.png")} />
                         <div className="chat-item-message">มีโปรเจคเยอะเลยไม่รู้อาจารย์จะสั่งอะไรนักหนาาาา!</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog4.png")} />
                         <div className="chat-item-message">พวกนายนินทาอาจารย์อยู่ใช่มั๊ยยยยยย</div>
                     </div> */}
                </div>
                <div className="bottom-input">
                     <img className="profile-image" src={require("../images/dog1.png")} />
                     <input name="message" onChange={this.handleChange}  className="chat-input" type="text" placeholder="enter your message..." />
                     <button onClick={this.handleSendMessage} className="send-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "5px"}} />Send</button>
                </div>
            </div>
        );
    }
}

export default ChatArea;