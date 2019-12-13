import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class NewMessege extends Component {
    constructor(props) {
        super(props)
        this.state={
            matchArray: null
        }
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            this.setState({
                matchArray: this.filter(this.state.filter, Object.values(this.props.state.wholeData))
            })
            if (this.state.filter === null || this.state.filter === "") {
                this.setState({
                    matchArray: null
                })
            }
        })
    }

    filter = (value, wholeData) => {
        return wholeData.filter(name => {
            const regex = new RegExp(value, "gi")
            // console.log(name.userName.match(regex))
            return name.userName.match(regex)
        })
    }

    dashBoard = () => {
        this.props.dashBoard()
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
    chatHead=(ev)=>{
        this.chatHead(ev)
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
                <div className="header abc">
                    New Messege..
                </div>
                <div className="inputDiv newChat">
                    <input
                        type="text"
                        name="filter"
                        placeholder="search"
                        onChange={(ev) => this.gettingValues(ev)}
                    />
                    {this.state.matchArray ?
                        Object.values(this.state.matchArray).map((user, index) => {
                            return (
                                user.email !== this.props.email ?
                                    <button
                                        onClick={(ev) => this.props.chatHead(ev)}
                                        name={user.userName}
                                        key={index}>
                                        {user.firstName} {user.lastName}
                                    </button>
                                    : null
                            )
                        })
                        : null}
                </div>
            </div>
        )
    }

}

export default withRouter(NewMessege);