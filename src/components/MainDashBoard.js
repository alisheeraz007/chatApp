import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ChatHead from './ChatHead'
import CreatGroup from './CreateGroup'
import NewMessege from './NewMessege'

class MainDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            chatHead: false,
            userName: null,
            creatGroup: false,
            dashBoard: true,
            newMessege: false,
            filter: null,
        }
    }

    onAuthStateChanged = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let email = user.email;
                this.setState({
                    email,
                }, () => {

                })
            } else {
                this.props.history.push('/')
            }
        });
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // setTimeout(() => {
            //     this.gettingUserName()
            // }, 2000)
        })
    }

    filter = (value, wholeData) => {
        return wholeData.filter(name => {
            const regex = new RegExp(value, "gi")
            // console.log(name.userName.match(regex))
            return name.userName.match(regex)
        })
    }

    signOut = (ev) => {
        ev.preventDefault();
        firebase.auth().signOut().then(() => {
            this.props.history.push('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    chatHead = (ev) => {
        // console.log(this.props.state.wholeData[ev.target.name])
        this.setState({
            chatHead: true,
            dashBoard: false,
            newMessege: false,
            creatGroup: false,
            userName: ev.target.name
        })
    }

    creatGroup = () => {
        this.setState({
            chatHead: false,
            dashBoard: false,
            newMessege: false,
            creatGroup: true,
        })
    }
    newMessege = () => {
        this.setState({
            chatHead: false,
            dashBoard: false,
            newMessege: true,
            creatGroup: false,
        })
    }
    dashBoard = () => {
        this.setState({
            chatHead: false,
            dashBoard: true,
            newMessege: false,
            creatGroup: false,
        })
    }

    gettingUserName = () => {
        if (this.props.state.data) {
            for (let i = 0; i < this.props.state.data.length; i++) {
                if (this.props.state.data[i].email === this.state.email) {
                    // this.setState({
                    console.log(this.props.state.data[i].userName)
                    // })
                }
            }
        }
    }


    componentWillMount() {
        this.onAuthStateChanged()
        this.gettingUserName()
    }

    render() {
        // console.log(this.props.state.data)
        return (
            this.state.email &&
                this.props.state.data &&
                this.props.state.wholeData ?
                <div className="mainContainer">
                    {this.state.chatHead ?
                        <ChatHead
                            state={this.props.state}
                            userName={this.state.userName}
                            email={this.state.email}
                            gettingWholeData={this.props.gettingWholeData}
                            dashBoard={this.dashBoard}
                            signOut={this.signOut}
                            creatGroup={this.creatGroup}
                            newMessege={this.newMessege}
                        />
                        :
                        null}
                    {this.state.creatGroup ?
                        <CreatGroup
                            state={this.props.state}
                            userName={this.state.userName}
                            email={this.state.email}
                            gettingWholeData={this.props.gettingWholeData}
                            dashBoard={this.dashBoard}
                            signOut={this.signOut}
                            creatGroup={this.creatGroup}
                            newMessege={this.newMessege}
                        />
                        :
                        null}
                    {this.state.newMessege ?
                        <NewMessege
                            state={this.props.state}
                            userName={this.state.userName}
                            email={this.state.email}
                            gettingWholeData={this.props.gettingWholeData}
                            dashBoard={this.dashBoard}
                            signOut={this.signOut}
                            creatGroup={this.creatGroup}
                            newMessege={this.newMessege}
                            chatHead={this.chatHead}
                        />
                        :
                        null}
                    {this.state.dashBoard ?
                        <div className="dashBoard">
                            <div className="header">
                                Friend List
                            </div>
                            <div className="friendList">
                                {this.props.state.data ?
                                    this.props.state.data.map((user, index) => {
                                        return (
                                            user.email !== this.state.email
                                                ?
                                                <button
                                                    onClick={(ev) => this.chatHead(ev)}
                                                    name={user.userName}
                                                    key={index}>
                                                    {user.firstName} {user.lastName}
                                                </button>
                                                : null
                                        )
                                    })
                                    : null}
                            </div>
                            <div className="topButton">
                                <button onClick={(ev) => this.signOut(ev)}>Sign Out</button>
                                <button onClick={(ev) => this.dashBoard(ev)}>My Messege</button>
                                <button onClick={(ev) => this.creatGroup(ev)}>Create Group</button>
                                <button onClick={(ev) => this.newMessege(ev)}>New Messege</button>
                            </div>
                        </div>
                        :
                        null}
                </div>
                : "loading"
        )
    }

}

export default withRouter(MainDashBoard);