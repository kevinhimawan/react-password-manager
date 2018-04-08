import React, { Component } from 'react';
import  '../../styles/login.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login_user } from '../../store/user.login/login.Action'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="col-lg-6">
        <form className="col-lg-10 form">
          <div className="form-title">
            <h4>Login</h4>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="text" name="email" className="form-control" onChange={this.onChange}/>
            {
              this.props.login.email && <small className="form-text">Wrong Email Address</small>
            }
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={this.onChange}/>
            {
              this.props.login.password && <small className="form-text">Wrong Password</small>
            }
          </div>
          <button type="button" onClick={() => this.props.submit(this.state)} className="btn btn btn-outline-primary">Login</button>
        </form>
      </div>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login_user
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
