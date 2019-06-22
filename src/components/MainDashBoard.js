import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ChatHead from './ChatHead'

class MainDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            chatHead: false,
            userName: null
        }
    }

    onAuthStateChanged = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let email = user.email;
                this.setState({
                    email,
                })
            } else {
                this.props.history.push('/')
            }
        });
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
            userName: ev.target.name
        })
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }

    render() {
        // console.log(this.props.state.data)
        return (
            this.state.email &&
                this.props.state.data ?
                <div className="mainContainer">
                    {this.state.chatHead ?
                    <ChatHead 
                    state={this.props.state} 
                    userName={this.state.userName}
                    email={this.state.email}/>
                    :
                        <div className="dashBoard">
                            <div className="header">
                                Friend List
                            </div>
                            <div className="friendList">
                                {this.props.state.data.map((user, index) => {
                                    return (
                                        user.email !== this.state.email ?
                                            <button
                                                onClick={(ev) => this.chatHead(ev)}
                                                name={user.userName}
                                                key={index}>
                                                {user.firstName} {user.lastName}
                                            </button>
                                            : null
                                    )
                                })}
                            </div>
                            <div className="topButton">
                                <button onClick={(ev) => this.signOut(ev)}>Sign Out</button>
                            </div>

                        </div>
                        }
                </div>
                : "loading"
        )
    }

}

export default withRouter(MainDashBoard);