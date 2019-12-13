import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class CreateGroup extends Component {
    constructor(props) {
        super(props)
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    dashBoard = (ev) => {
        this.props.dashBoard(ev)
    }
    signOut = (ev) => {
        this.props.signOut(ev)
    }
    creatGroup = () => {
        this.props.creatGroup()
    }
    newMessege = () => {
        this.props.newMessege()
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="topButton">
                    <button onClick={(ev) => this.signOut(ev)}>Sign Out</button>
                    <button onClick={(ev) => this.dashBoard(ev)}>My Messege</button>
                    <button onClick={(ev) => this.creatGroup(ev)}>Create Group</button>
                    <button onClick={(ev) => this.newMessege(ev)}>New Messege</button>
                </div>
                <div className="header">
                    Create Group..
                </div>
                <div className="inputDiv">
                    <input
                        type="text"
                        placeholder="Group Name"
                        name="groupName"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                        autoFocus
                    />
                    <div className="friendList addMembers">
                        <div className="addMembersHead">Tap To Add Member</div>
                        {/* {this.props.state.data.map((user, index) => {
                            return (
                                <button
                                    onClick={(ev) => this.chatHead(ev)}
                                    name={user.userName}
                                    key={index}>
                                    {user.firstName} {user.lastName}
                                </button>
                            )
                        })} */}
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateGroup);