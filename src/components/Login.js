import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null
        }
    }

    onAuthStateChanged = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/MainDashBoard')
            }
        });
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    changePath = () => {
        this.props.history.push('/SignUp')
    }

    login = (ev) => {
        ev.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                this.props.history.push('/MainDashBoard')
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }

    componentWillMount() {
        this.onAuthStateChanged()
    }


    render() {
        // const labelRef = React.useRef(null);
        // const classes = useStyles();

        return (
            <div className='mainContainer'>
                <div className="topButton">

                    <div className="header">
                        Login To Chat...
                </div>
                    <div className='inputDiv'>
                        <form onSubmit={(ev) => this.login(ev)}>
                            <input
                                type='text'
                                name='email'
                                placeholder='Email'
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                                autoFocus
                            />
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <button>Login</button>
                        </form>
                        <div className="signUp">
                            Wants to Chat with Friends ? Don't have an ACCOUNT <br />
                            <button onClick={this.changePath}>Sign Up Now</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Login)