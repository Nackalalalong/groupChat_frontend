import React, { Fragment } from 'react';
import "./SideArea.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

const socket = io("http://localhost:8000");


class SideArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showFindGroup: false,
            findGroupID: "",
        }
    }

    createGroup = () => {
        if ( this.state.createGroupName === "" ){
            alert("please insert group name");
            return ;
        }

        console.log("emiting createGroup");
        this.props.socket.emit("createGroup", this.state.createGroupName);
        console.log("group created");
    }

    handleChange = e => {
        const { name,value } = e.target
        this.setState({
            [name] : value
        });
    }

    expandMyGroup = () => {
        this.setState({
            showMyGroup: true
        });
    }

    toggleFindGroup = () => {
        let showFindGroup = this.state.showFindGroup;
        this.setState({
            showFindGroup: !showFindGroup
        });
    }

    handleJoinGroup = () => {

    }

    handleLeaveGroup = () => {

    }

    handleChangeChatRoom = (roomCID) => {
        this.props.changeChatRoom(roomCID);
    }

    render(){

        let chatRoomComponents = [];
        let chatRooms = this.props.user.chatRooms;
        if ( chatRooms != null ){
            for( const room of chatRooms){
                chatRoomComponents.push(
                    <div onClick={() => this.handleChangeChatRoom(room.cid)} key={"room-chat-"+room.cid} className="side-area-section-content-item hover-pointer" data-tip={"room CID: "+room.cid}>
                        <span className="side-area-section-content-item-text">{room.chatName}</span>
                    </div>
                );
            }
        }
        
        let groupTab = (
            <Fragment>
                <div onClick={this.toggleFindGroup} className="side-area-section-header hover-pointer">
                    <span className="side-area-section-header-text">find or create group</span>
                </div>
                <div className={"side-area-section-content"} >
                    <div className={"side-area-section-content-item side-area-section-content-item-create" + (!this.state.showFindGroup ? " item-collapse" : "")}>
                        <FontAwesomeIcon className="create-group-icon" icon={faPlus} style={{display: this.state.showFindGroup? "block":"none"}}/>
                        <input onChange={this.handleChange} name="createGroupName" className="create-group-input" type="text" placeholder="enter group name"></input>
                        <button onClick={this.createGroup} className="side-area-section-content-item-button side-area-section-content-item-button-create">
                            create
                        </button>
                    </div>
                    <div className={"side-area-section-content-item side-area-section-content-item-create"+ (!this.state.showFindGroup ? " item-collapse" : "")}>
                        <FontAwesomeIcon className="create-group-icon" icon={faSearch} style={{display: this.state.showFindGroup? "block":"none"}}/>
                        <input className="create-group-input" type="text" placeholder="enter group ID"></input>
                        <button onClick={this.handleJoinGroup} className="side-area-section-content-item-button side-area-section-content-item-button-join">
                            join
                        </button>
                    </div>
                    {/* <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Group1</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-join">
                            join
                        </button>
                    </div> */}
                </div>
                <div className="side-area-section-header" style={{marginTop: this.state.showFindGroup ? "-1px" : "2px"}}>
                    <span className="side-area-section-header-text">my groups</span>
                </div>
                <div className="side-area-section-content" id="mygroup">
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                </div>
            </Fragment>
        );

        return (
            <div className="side-area-container">
                <ReactTooltip delayShow={1000}/>
                <div className="profile">
                    <img className="profile-image" src={require("../images/dog1.png")} />
                    <span className="profile-name">ประยุทธ์ จันทร์โอมายก๊อด</span>
                </div>
                <Tabs defaultActiveKey="chat">
                    <Tab eventKey="chat" title="chat">
                        <div id="mychat">
                            {chatRoomComponents}
                        </div>
                    </Tab>
                    <Tab eventKey="group" title="group">
                        {groupTab}
                    </Tab>
                </Tabs>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
  }

export default connect(mapStateToProps,null)(SideArea);