import React from 'react';
import "./SideArea.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { connect } from 'react-redux';


const socket = io("http://localhost:8000");


class SideArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }

        this.socket = io("http://localhost:8000", {
            query: "token=" + this.props.auth.token
        });
    }

    createGroup = () => {
        if ( this.state.createGroupName === "" ){
            alert("please insert group name");
            return ;
        }

        console.log("emiting createGroup");
        this.socket.emit("createGroup", this.state.createGroupName);
        console.log("group created");
    }

    handleChange = e => {
        const { name,value } = e.target
        this.setState({
            [name] : value
        });
    }

    render(){
        return (
            <div className="side-area-container">
                <div className="profile">
                    <img className="profile-image" src={require("../images/dog1.png")} />
                    <span className="profile-name">ประยุทธ์ จันทร์โอมายก๊อด</span>
                </div>
                <div className="side-area-section-header">
                    <span className="side-area-section-header-text">my groups</span>
                </div>
                <div className="side-area-section-content" id="mygroup">
                    <div className="side-area-section-content-item side-area-section-content-item-create">
                        <FontAwesomeIcon className="create-group-icon" icon={faPlus} />
                        <input onChange={this.handleChange} name="createGroupName" className="create-group-input" type="text" placeholder="enter group name"></input>
                        <button onClick={this.createGroup} className="side-area-section-content-item-button side-area-section-content-item-button-create">
                            create
                        </button>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Miniproject</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-leave">
                            leave
                        </button>
                    </div>
                </div>
                <div className="side-area-section-header">
                    <span className="side-area-section-header-text">find group</span>
                </div>
                <div className="side-area-section-content" id="findgroup">
                    <div className="side-area-section-content-item side-area-section-content-item-create">
                        <FontAwesomeIcon className="create-group-icon" icon={faSearch} />
                        <input className="create-group-input" type="text" placeholder="enter group name"></input>
                    </div>
                    <div className="side-area-section-content-item">
                        <span className="side-area-section-content-item-text">Group1</span>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-join">
                            join
                        </button>
                    </div>
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

export default connect(mapStateToProps,null)(SideArea);