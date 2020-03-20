import React from 'react';
import "./SideArea.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class SideArea extends React.Component {
    constructor(props){
        super(props);
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
                        <input className="create-group-input" type="text" placeholder="enter group name"></input>
                        <button className="side-area-section-content-item-button side-area-section-content-item-button-create">
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
            </div>
        );
    }
}

export default SideArea;