import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment'

class EditManage extends Component {
  constructor(){
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
      uppercase: false,
      lowercase: false,
      special: false,
      number: false,
      fiveDigits: false,
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    if (e.target.name === 'password') {
      const regexSpecial = /[^a-zA-Z0-9]/
      if (e.target.value.match(regexSpecial) !== null) {
        this.setState({
          special: true
        })
      }
      let upperCase = new RegExp("^(?=.*[A-Z])");
      if (e.target.value.match(upperCase) !== null) {
        this.setState({
          uppercase: true
        })
      }

      let lowercase = new RegExp("^(?=.*[a-z])");
      if (e.target.value.match(lowercase) !== null) {
        this.setState({
          lowercase: true
        })
      }

      let number = new RegExp("^(?=.*[0-9])");
      if (e.target.value.match(number) !== null) {
        this.setState({
          number: true
        })
      }

      let digits = new RegExp("^(?=.{5,})");
      if (e.target.value.match(digits) !== null) {
        this.setState({
          fiveDigits: true
        })
      }
    }
  }

  submit = () => {
    if (this.state.uppercase && this.state.lowercase && this.state.special && this.state.number && this.state.fiveDigits ) {
      let obj = {
        url: this.state.url,
        username: this.state.username,
        password: this.state.password,
        updated: moment().format('LLL')
      } 
      
      this.props.editForm(obj)
    } else {
      swal ({
        title: 'Nothing has been added',
        icon: 'warning',
        button: 'OK'
      })
    }
  }

  render() {
    return (
      <div id="editManageManager" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Manage</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label>Url</label>
                  <input autoComplete="off" type="text" name="url" onChange={this.onChange} className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input autoComplete="off" type="text" name="username" onChange={this.onChange} className="form-control"/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input autoComplete="off" type="text" name="password" onChange={this.onChange} className="form-control"/>
                </div>
                <div className="password-strength">
                  <div className="password-strength-title">
                    <h6 className="password-strength-title-font">Password Strength:</h6>
                    <div className="form-group requirement">
                      <span className="password-strength-require-font">Password harus memiliki setidaknya satu karakter huruf besar (upper - case)</span>
                      {
                        this.state.uppercase === true && <i className="fas fa-check"></i>
                      }
                    </div>
                    <div className="form-group requirement">
                      <span className="password-strength-require-font">Password harus memiliki setidaknya satu karakter huruf kecil (lower - case)</span>
                      {
                        this.state.lowercase === true && <i className="fas fa-check"></i>
                      }
                    </div>
                    <div className="form-group requirement">
                      <span className="password-strength-require-font">Password harus memiliki setidaknya satu karakter special (!&%^£)</span>
                      {
                        this.state.special === true && <i className="fas fa-check"></i>
                      }
                    </div>
                    <div className="form-group requirement">
                      <span className="password-strength-require-font">Password harus memiliki setidaknya satu angka</span>
                      {
                        this.state.number === true && <i className="fas fa-check"></i>
                      }
                    </div>
                    <div className="form-group requirement">
                      <span className="password-strength-require-font">Password harus memiliki panjang lebih dari 5 karakter</span>
                      {
                        this.state.fiveDigits === true && <i className="fas fa-check"></i>
                      }
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button onClick={this.submit} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditManage
