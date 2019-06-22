import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ChatHead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: null,
            lastName: null,
            messege: null,
            myUserName: null,
            recieved: null
        }
    }

    gettingOwnUserName = () => {
        let data = this.props.state.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].email === this.props.email) {
                this.setState({
                    myUserName: data[i].userName
                }, () => {
                    this.setState({
                        myMessege: this.state.myUserName + "to" + this.props.userName,
                        recievedMessege: this.props.userName + "from" + this.state.myUserName,
                        recieved: this.state.myUserName + "from" + this.props.userName
                    })
                })
            }
        }
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    send = (ev) => {
        ev.preventDefault();
        let date = new Date;
        let year = date.getFullYear()
        let time = date.getMinutes()
        let seconds = date.getMilliseconds()
        let code = `${year}${time}${seconds}`
        // console.log(code)
        let obj = {
            [this.state.recievedMessege]: this.state.messege,
            recievedMessege: this.state.recievedMessege,
            
        }
        firebase.database().ref('wholeData').child(this.props.userName).child('messeges').child(code).set(obj)
        let obj2 = {
            [this.state.myMessege]: this.state.messege,
            myMessege: this.state.myMessege,
        }
        firebase.database().ref('wholeData').child(this.state.myUserName).child('messeges').child(code).set(obj2)
    }

    componentWillMount() {
        this.gettingOwnUserName()
        this.setState({
            firstName: this.props.state.wholeData[this.props.userName].firstName,
            lastName: this.props.state.wholeData[this.props.userName].lastName,
        })
    }

    render() {
        // console.log(this.state.recieved)
        return (
            this.state.recieved ?
                <div className="chatHead">
                    <div className="header abc">{this.state.firstName} {this.state.lastName}</div>
                    <div className="messeges">
                        {this.props.state.data.map((user, index) => {
                            return (
                                user.userName === this.state.myUserName &&
                                    user.messeges ?
                                    <div className='mainChat' key={index}>
                                        {Object.values(user.messeges).map((messege, index) => {
                                            return (
                                                <div key={index}>
                                                    {this.state.myMessege === messege.myMessege ?
                                                        <div
                                                            key={index}
                                                            className='sendMesseges'
                                                        >
                                                            <span>{messege[this.state.myMessege]}</span>
                                                        </div>
                                                        : null}
                                                    {this.state.recieved === messege.recievedMessege ?
                                                        <div
                                                            key={index}
                                                            className='recieved'
                                                        >
                                                        {/* {console.log(messege.recievedMessege)} */}
                                                            <span>{messege[this.state.recieved]}</span>
                                                        </div>
                                                        : console.log(this.state.recieved, messege.recievedMessege)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    : null
                            )
                        })}
                    <div className='messegeInput'>
                        <form onSubmit={(ev) => this.send(ev)}>
                            <input
                                type="text"
                                name="messege"
                                placeholder="Type Your Messege"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                                autoFocus
                            />
                            <button>Send</button>
                        </form>
                    </div>
                    </div>
                </div>
                : "loading"
        )
    }

}

export default withRouter(ChatHead)