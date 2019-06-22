import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            userName: null,
            confirmEmail: null,
            confirmPassword: null
        }
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    changePath = () => {
        this.props.history.push('/')
    }

    signUp = (ev) => {
        ev.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                let obj = {
                    email: res.user.email,
                    userName: this.state.userName,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                }
                firebase.database().ref().child('wholeData').child(this.state.userName).set(obj)
                    .then((res) => {
                        this.props.history.push('/')
                    })
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }

    render() {
        return (
            <div className='mainContainer'>
                <div className="header">
                    SignUp...
                </div>
                <div className='inputDiv'>
                    <form onSubmit={(ev) => this.signUp(ev)}>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                            autoFocus
                        />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <input
                            type='text'
                            name='userName'
                            placeholder='UserName'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <input
                            type='text'
                            name='confirmEmail'
                            placeholder='Confirm Email'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            onChange={(ev) => this.gettingValues(ev)}
                            required
                        />
                        <button>SignUp</button>
                    </form>
                    <div>
                        Already have an ACCOUNT ?<br />
                        <button onClick={this.changePath}>Login</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(SignUp)