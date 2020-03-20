import React from 'react';
import './ChatArea.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

class ChatArea extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="chat-area">
                <div className="top-bar">
                    <span className="top-bar-header-text">Miniproject</span><br />
                    <span className="top-bar-sub-text">number of members: 5</span>
                </div>
                <div className="middle-screen">
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog2.png")} />
                         <div className="chat-item-message">สวัสดี สิริ!</div>
                     </div>
                     <div className="chat-item">
                         <img className="profile-image chat-item-profile-image" src={require("../images/dog3.png")} />
                         <div className="chat-item-message">สวัสดี มีไรให้ช่วยหรอมานุดดด!</div>
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
                </div>
                <div className="bottom-input">
                     <img className="profile-image" src={require("../images/dog1.png")} />
                     <input className="chat-input" type="text" placeholder="enter your message..." />
                     <button className="send-button"><FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "5px"}} />Send</button>
                </div>
            </div>
        );
    }
}

export default ChatArea;