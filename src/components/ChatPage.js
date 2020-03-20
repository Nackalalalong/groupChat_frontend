import React from 'react';
import './ChatPage.css';
import SideArea from './SideArea';
import ChatArea from './ChatArea';

class ChatPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="content-container">
                <SideArea />
                <ChatArea />
            </div>
        );
    }
}

export default ChatPage;