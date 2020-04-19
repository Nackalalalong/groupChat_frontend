import React, { Fragment } from 'react';
import "./SideArea.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Tab, Tabs, Button, Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip'

const socket = io("http://localhost:8000");


class SideArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showFindGroup: true,
            findGroupID: "",
            joinGroupID: "",
            createGroupName: "",
            showModal: false,
            shouldReload: false,
            modalTitle: "",
            modalDesc: "",
            requesting: false
        }

        this.props.socket.on("joinGroupResult", this.joinGroupResult);
        this.props.socket.on("createGroupResult", this.createGroupResult);
        this.props.socket.on("unreadMsg", this.manageUnreadMsg);
        this.props.socket.on("updateAnotherGroup", () => {
            this.props.socket.emit("reqUnreadMsg");
        });
    }

    manageUnreadMsg = unreadMsg => {
        console.log("on unreads msg");
        if ( this.state.roomCID != null ){
            unreadMsg[this.state.roomCID] = [];
        }

        this.setState({
            unreadMsg
        });
    }

    componentDidMount(){
        console.log("delaying erqUnreadMsg");
        setTimeout(function() { //Start the timer
            console.log("emitting erqUnreadMsg");
            this.props.socket.emit("reqUnreadMsg");
        }.bind(this), 500)
    }

    createGroupResult = (status) => {
        if ( status === "success" ){
            this.setState({
                showModal: true,
                shouldReload: true,
                modalTitle: "Create Group Success!",
                modalDesc: "You can now chat in the group. Send group ID to your friends to join your group."
            });
        }
        else {
            this.setState({
                showModal: true,
                shouldReload: false,
                modalTitle: "Create Group fail!",
                modalDesc: "Something went wrong, please try again later.",
                requesting: false
            })
        }
    }

    joinGroupResult = (status) => {
        if ( status === "success" ){
            this.setState({
                showModal: true,
                shouldReload: true,
                modalTitle: "Join Group Success!",
                modalDesc: "You can now chat in the group."
            });
        }
        else {
            this.setState({
                showModal: true,
                shouldReload: false,
                modalTitle: "Join Group fail!",
                modalDesc: "Something went wrong, please try again later.",
                requesting: false
            })
        }
    }

    handleClose = () => {
        if ( this.state.shouldReload ){
            window.location.reload();
        }
        else {
            this.setState({
                showModal: false
            });
        }
    }

    createGroup = () => {
        if ( this.state.createGroupName === "" || this.state.createGroupName == null){
            alert("please insert group name");
            return ;
        }
        this.setState({
            requesting: true
        })
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
        console.log("handle joinGroup");
        let joinGroupID = this.state.joinGroupID;
        if ( joinGroupID == null || joinGroupID === "" ) {
            alert("please enter group ID to join");
            return ;
        }

        this.setState({
            requesting: true
        });
        console.log("emitting joinGroup");
        this.props.socket.emit("joinGroup", {
            gid: joinGroupID,
            username: this.props.user.username,
            sid: this.props.user._id
        });
        console.log("done emitting joinGroup");
    }

    handleChangeChatRoom = (roomCID) => {
        console.log("handle change room");
        let unreadMsg = this.state.unreadMsg;
        if ( this.state.roomCID == null ){  // เข้าห้องครั้งแรกของการโหลด
            this.props.setUnreadCount(unreadMsg[roomCID].length);
        }
        if ( unreadMsg != null ){
            unreadMsg[roomCID] = [];
        }
        this.setState({
            unreadMsg,
            roomCID
        });
        this.props.changeChatRoom(roomCID);
    }

    
    getProfileImage = (username) => {  // i is 1-5 inclusive
        for( let i=0; i< this.state.members; ++i){
            let user = this.state.members[i];
            if ( user.username === username ){
                return "../images/dog" + ( (i%5) + 1) + ".png";
            }
        }
    }

    render(){

        let chatRoomComponents = [];
        let chatRooms = this.props.user.chatRooms;
        let groupComponents = [];
        if ( chatRooms != null ){
            for( const room of chatRooms){
                let unreadMsgCount = this.state.unreadMsg != null ? this.state.unreadMsg[room.cid].length : 0;
                unreadMsgCount = unreadMsgCount === 0 ? "" : unreadMsgCount;
                chatRoomComponents.push(
                    <div onClick={() => this.handleChangeChatRoom(room.cid)} key={"room-chat-"+room.cid} className="side-area-section-content-item hover-pointer" data-tip={"room CID: "+room.cid}>
                        <span className="side-area-section-content-item-text">{room.chatName}</span>
                        <div className="unread-noti">{unreadMsgCount}</div>
                    </div>
                );

                if ( room.owner === this.props.user.username ){
                    groupComponents.push(
                    <div onClick={() => this.handleChangeChatRoom(room.cid)} key={"room-chat-"+room.cid} className="side-area-section-content-item hover-pointer" data-tip={"room CID: "+room.cid}>
                        <span className="side-area-section-content-item-text">{room.chatName}</span>
                        <div className="unread-noti">{unreadMsgCount}</div>
                    </div>
                    )
                }
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
                        <input value={this.state.createGroupName} onChange={this.handleChange} name="createGroupName" className="create-group-input" type="text" placeholder="enter group name"></input>
                        <button disabled={this.state.requesting}  onClick={this.createGroup} className="side-area-section-content-item-button side-area-section-content-item-button-create">
                            create
                        </button>
                    </div>
                    <div className={"side-area-section-content-item side-area-section-content-item-create"+ (!this.state.showFindGroup ? " item-collapse" : "")}>
                        <FontAwesomeIcon className="create-group-icon" icon={faSearch} style={{display: this.state.showFindGroup? "block":"none"}}/>
                        <input value={this.state.joinGroupID} onChange={this.handleChange} name="joinGroupID" className="create-group-input" type="text" placeholder="enter group ID"></input>
                        <button disabled={this.state.requesting} onClick={this.handleJoinGroup} className="side-area-section-content-item-button side-area-section-content-item-button-join">
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
                    {/* <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div> */}
                    {groupComponents}
                </div>
            </Fragment>
        );

        return (

            <div className="side-area-container">
                <ReactTooltip delayShow={1000}/>
                <div className="profile">
                <img className="profile-image" src={require("../images/dog1.png")} />;
                    <span className="profile-name">{this.props.user.name}</span>
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
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.modalTitle}</Modal.Title>
                  </Modal.Header>
                <Modal.Body>{this.state.modalDesc}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>
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