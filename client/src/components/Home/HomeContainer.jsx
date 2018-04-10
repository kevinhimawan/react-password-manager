import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import '../../styles/home-container.css'
import ModalVerify from './Modalverify'
import swal from 'sweetalert'

class HomeContainer extends Component {
  checkpassword = (password) => {
    if (password === '12345') {
      this.props.getRealPass(password)
    } else {
      swal({
        title: 'General Password Salah',
        icon: 'warning',
        button: 'Revise'
      })
    }
  }

  render() {
    return (
      <div className="content">
      <ModalVerify
        checkpassword={this.checkpassword}></ModalVerify>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">URL</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.action.data.length > 0 &&
              this.props.action.data.map((value, i) => (
              <tr key={i}>
              <td>{value.value.url}</td>
                <td>{value.value.username}</td>
                <td>
                  <span>{value.value.blankPass}</span>
                  <a data-toggle="modal" data-target="#showPass" onClick={ () => this.props.showPassword(value.value.url, value.value.username)}  >
                    <i className="fas fa-eye show"></i>
                  </a>
                  
                </td>
                <td>{value.value.created}</td>
                <td>{value.value.updated}</td>
                <td>
                  <a data-toggle="modal" data-target="#editManageManager" onClick={()=>this.props.parseId(value.id,value.value.url,value.value.username)}><i className="fas fa-edit icon"></i></a>
                  <a onClick={()=>this.props.deleteManage(value.id)}><i className="fas fa-trash-alt icon"></i></a>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    action: state.action
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)