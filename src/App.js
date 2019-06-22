import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config/configKey'

import Login from './components/Login'
import SignUp from './components/SignUp'
import MainDashBoard from './components/MainDashBoard'

firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  gettingWholeData = () => {
    firebase.database().ref().child("wholeData").on('value', (snap) => {
      if (snap.val()) {
        let data = Object.values(snap.val())
        let wholeData = snap.val()
        this.setState({
          data,
          wholeData,
        })
      }
    })
  }

  componentWillMount() {
    this.gettingWholeData()
  }

  render() {
    return (
      <div>
        <Router>

          <Route
            exact path="/"
            render={() => <Login
              state={this.state}
            />} />

          <Route
            exact path="/SignUp"
            render={() => <SignUp
              state={this.state}
            />} />

          <Route
            exact path="/MainDashBoard"
            render={() => <MainDashBoard
              state={this.state}
            />} />

        </Router>
      </div>
    )
  }
}

export default App;
