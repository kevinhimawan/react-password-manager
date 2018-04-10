import React, { Component } from 'react';

export default class Verify extends Component {
  constructor() {
    super()
    this.state = ({
      password: '',
    })
  }

  onChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  submitpassword = () => {
    this.props.checkpassword(this.state.password)
  }

  render() {
    return (
      <div id="showPass" className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">General Password</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={this.onChange} type="password" className="form-control"/>
                </div>
                <button data-dismiss="modal" onClick={this.submitpassword} className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};