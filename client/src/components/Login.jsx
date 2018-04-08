import React, { Component } from 'react';
import Login from './Login/Login.jsx'
import SignUp from './Login/SignUp.jsx'
import  '../styles/login.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login_user, signup_user } from '../store/user.login/login.Action'

class LoginSite extends Component {

  submitLogin = (value) => {
    this.props.login_user(value)
  }

  submitSignUp = (value) => {
    this.props.signup_user(value)
  }

  componentDidUpdate () {
    if (this.props.login.status === true) {
      this.props.history.push('/')
    }
  }

  render() {
    if (this.props.login.loading === false) {
      return (
        <div className="content row">
          <Login
            submit={this.submitLogin}>
          </Login>
          <SignUp
          submit={this.submitSignUp}></SignUp>
        </div>
      )
    } else {
      return (
        <h1>Loading</h1>
      )
    } 
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login_user, signup_user
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginSite)