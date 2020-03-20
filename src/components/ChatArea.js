import React from 'react';
import './ChatArea.css';

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
            </div>
        );
    }
}

export default ChatArea;