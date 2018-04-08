import React, { Component } from 'react';
import  '../../styles/login.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup_user } from '../../store/user.login/login.Action'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  OncChangeModel = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="col-lg-6">
        <form className="col-lg-10 form">
          <div className="form-title">
            <h4>Create New User</h4>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" name="username" type="text" onChange={this.OncChangeModel}/>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" name="email" onChange={this.OncChangeModel} type="text"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" name="password" onChange={this.OncChangeModel} type="password"/>
          </div>
          <button type="button" className="btn btn btn-outline-primary" onClick={() => this.props.submit(this.state)}>Sign up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signup_user
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
