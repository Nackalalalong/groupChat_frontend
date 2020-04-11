import React from 'react';
import './ChatPage.css';
import SideArea from './SideArea';
import ChatArea from './ChatArea';
import '../App.css';
class ChatPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Apps">
                <div className="navbar">
                    <span className="groupchat-name">#ผนงรจตกม</span>
                    <a href="/">EXIT</a>
                </div>
                <div className="content-container">
                    <SideArea />
                    <ChatArea />
                </div>
            </div>
        );
    }
}

export default ChatPage;