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
            recieved: null,
            messege: ""
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
        let getData = false;
        if (!getData) {
            this.props.gettingWholeData()
            getData = true
        }
        if (getData) {

            let date = new Date;
            let year = date.getFullYear()
            let month = date.getMonth()
            let currenDate = date.getDate()
            let hour = date.getHours()
            let minutes = date.getMinutes()
            let seconds = date.getMilliseconds()
            let code = `${year}${month}${currenDate}${hour}${minutes}`
            let obj = {
                [this.state.recievedMessege]: this.state.messege,
                recievedMessege: this.state.recievedMessege,
                time: hour + ":" + minutes,
                date: currenDate + "/" + month + "/" + year
            }
            let obj2 = {
                [this.state.myMessege]: this.state.messege,
                myMessege: this.state.myMessege,
                time: hour + ":" + minutes,
                date: currenDate + "/" + month + "/" + year
            }
            if (this.props.state.wholeData[this.props.userName].messeges) {
                let lastCode = Object.keys(this.props.state.wholeData[this.props.userName].messeges)
                let index = lastCode.length - 1
                if (lastCode[index]) {
                    // console.log(lastCode[index])
                    let currentCode = Number(lastCode[index]) + 1
                    firebase.database().ref('wholeData').child(this.props.userName).child('messeges').child(currentCode).set(obj)
                    firebase.database().ref('wholeData').child(this.state.myUserName).child('messeges').child(currentCode).set(obj2)
                }
            } else {
                firebase.database().ref('wholeData').child(this.props.userName).child('messeges').child(code).set(obj)
                firebase.database().ref('wholeData').child(this.state.myUserName).child('messeges').child(code).set(obj2)
            }
        }
        setTimeout(() => {
            this.scroll()
            this.setState({
                messege: ""
            })
        }, 100)
    }

    dashBoard = () => {
        this.props.dashBoard()
    }

    componentWillMount() {
        this.gettingOwnUserName()
        this.setState({
            firstName: this.props.state.wholeData[this.props.userName].firstName,
            lastName: this.props.state.wholeData[this.props.userName].lastName,
        })
        setTimeout(() => {
            this.scroll()
        }, 100)
    }

    scroll = () => {
        const element = document.getElementById("mainChat");
        // console.log(element)
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    }

    render() {
        // console.log(this.props.state.wholeData[this.props.userName].messeges)
        return (
            this.state.recieved ?
                <div className="chatHead">
                    <div className="header abc">{this.state.firstName} {this.state.lastName}</div>
                    <div className="messeges">
                        {this.props.state.data.map((user, index) => {
                            return (
                                user.userName === this.state.myUserName &&
                                    user.messeges ?
                                    <div id="mainChat" className='mainChat' key={index}>
                                        {Object.values(user.messeges).map((messege, index) => {
                                            return (
                                                <div key={index}>
                                                    {this.state.myMessege === messege.myMessege ?
                                                        <div
                                                            key={index}
                                                            className='sendMesseges'
                                                        >
                                                            <span className="chat">{messege[this.state.myMessege]}<br />
                                                                <span className="dateandtime">{messege.date} {messege.time}</span>
                                                            </span>
                                                        </div>
                                                        : null}
                                                    {this.state.recieved === messege.recievedMessege ?
                                                        <div
                                                            key={index}
                                                            className='recieved'
                                                        >
                                                            {/* {console.log(messege.recievedMessege)} */}
                                                            <span className="chat">{messege[this.state.recieved]}<br />
                                                                <span className="dateandtime">{messege.date}{messege.time}</span>
                                                            </span>

                                                        </div>
                                                        : null}
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
                                    value={this.state.messege}
                                    required
                                    autoFocus
                                />
                                <button>Send</button>
                            </form>
                        </div>
                    </div>
                    <div className="topButton">
                        <button onClick={(ev) => this.dashBoard(ev)}>Back</button>
                    </div>
                </div>
                : "loading"
        )
    }

}

export default withRouter(ChatHead)