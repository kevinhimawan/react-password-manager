import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { getAllData, postManage, openModalAdd, deleteManage, editManage, search, passwordShow } from '../store/user.action/action.Action'
import { signout_user } from '../store/user.login/login.Action'
import '../styles/home.css'
import swal from 'sweetalert'

// Validation
import PropTypes from 'prop-types';

// Components
import  HomeContainer from './Home/HomeContainer.jsx'
import AddManage from './Home/AddManage.jsx'
import EditManage from './Home/EditManage.jsx'
import Search from './Home/Search.jsx'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      listId: '',
      url: '',
      username: ''
    }
  }
  componentDidMount () {
    const userid = localStorage.getItem('userid')
    if (!userid) {
      this.props.history.push('/login')
    } else {
      this.props.getAllData(userid)
    }
  }

  signout = () => {
    localStorage.removeItem('userid')
    this.props.signout_user()
  }

  submitForm = (value) =>{
    const userid = localStorage.getItem('userid')
    this.props.postManage({
      form: value,
      userid: userid,
    })
  }

  modalOpen = () => {
    this.props.openModalAdd()
  }

  deleteManage = (id, url, username) => {
    swal({
      title: 'Removed Item',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: {
        ok: 'Ok',
        cancel: 'cancel'
      }
      }).then ((value) => {
      if (value === 'ok') {
        this.props.deleteManage({id, url, username})
      }
    })
  }

  submitEdit = (value) => {
    value['listId'] = this.state.listId
    this.props.editManage(value)
  }

  parseId = (id) => {
    this.setState({
      listId: id
    })
  }

  searchKey = (value) => {
    this.props.search({value})
  }

  showPassword = (url, username) => {
    this.setState({
      url:url,
      username: username
    })
  }

  getRealPass = () => {
    let obj = {
      url: this.state.url,
      username: this.state.username,
      data: this.props.action.data
    }
    this.props.passwordShow(obj)
  }

  render() {
      return (
        <div>
          {/* Modal Site */}
          <AddManage
            submitForm={this.submitForm}></AddManage>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a onClick={this.modalOpen} className="nav-link" data-toggle="modal" data-target="#addManageModal">Add</a>
                </li>
                <li className="nav-item active">
                  <Link to={'/login'} onClick={this.signout} className="nav-link">Log Out</Link>
                </li>
              </ul>
              <Search
                searchKey={this.searchKey}></Search>
            </div>
          </nav>
          <HomeContainer
            deleteManage={this.deleteManage}
            editManage={this.editManage}
            parseId={this.parseId}
            showPassword={this.showPassword}
            getRealPass={this.getRealPass}></HomeContainer>
            <EditManage
            editForm={this.submitEdit}></EditManage>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    action: state.action
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllData, signout_user, postManage, openModalAdd, deleteManage, editManage, search, passwordShow
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

