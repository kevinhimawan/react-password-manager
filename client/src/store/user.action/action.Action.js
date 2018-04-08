import db from '../firebase'
import  {
  ASSIGN_DATA,
  ASSIGN_CREATE,
  SIGN_OUT,
  OPEN_MODAL_ADD
} from './action.actionTypes'
import swal from 'sweetalert'

const bcryptjs = require('bcryptjs')
const saltRounds = 10

const UserRef = db.ref('User')
const userid = localStorage.getItem('userid')

export const getAllData = (payload) => {
  return dispatch => {
    UserRef.child(payload).once('value').then((snapshot) => {
      const user = snapshot.val()
      if (user && user.data) {
        const newArray = Object.keys(user.data).map(key => ({
          value: user.data[key],
          id: key
        }))
        dispatch(assign_data(newArray))
      }
    })
  }
}

const assign_data = (data) => ({
  type: ASSIGN_DATA,
  payload: data
})

export const postManage = (payload) => {
  return dispatch => {
    let salt = bcryptjs.genSaltSync(saltRounds);
    let hash = bcryptjs.hashSync(payload.form.password, salt);
    let blank = ''
    for (let i = 0; i < payload.form.password.length; i++) {
      blank+= '*'
    }
    UserRef.child(payload.userid).child('data').push({
      url: payload.form.url,
      username: payload.form.username,
      password: hash,
      blankPass: blank,
      created: payload.form.created,
      updated: payload.form.updated,
    })
    .then(response => {
      UserRef.child(payload.userid).once('value').then((snapshot) => {
        const user = snapshot.val()
        const newArray = Object.keys(user).map(key => ({
          value: snapshot.val()[key],
          id: key
        }))
        if (user && user.data) {
          const newArray = Object.keys(user.data).map(key => ({
            value: user.data[key],
            id: key
          }))
          dispatch(assign_created(newArray))
          swal ({
            title: 'Success',
            icon: 'success',
            button: 'OK'
          })
          return 0
        }
      })
      .catch (err => {
        swal ({
          title: 'Added has been error',
          icon: 'warning',
          button: 'OK'
        })
        return 0
      })
    })
  }
}

const assign_created = (data) => ({
  type: ASSIGN_CREATE,
  payload: data
})

export const openModalAdd = () => {
  return dispatch => {
    dispatch(open_modal_add())
  }
}

const open_modal_add = () => ({
  type: OPEN_MODAL_ADD
})

export const deleteManage = (payload) => {
  return dispatch => {
    UserRef.child(userid).child('data').child(payload).set(null).then(response => {
      UserRef.child(userid).once('value').then((snapshot) => {
        const user = snapshot.val()
        const newArray = Object.keys(user).map(key => ({
          value: snapshot.val()[key],
          id: key
        }))
        if (user && user.data) {
          const newArray = Object.keys(user.data).map(key => ({
            value: user.data[key],
            id: key
          }))
          dispatch(assign_created(newArray))
          swal ({
            title: 'Success',
            icon: 'success',
            button: 'OK'
          })
          return 0
        }
      })
    })
  }
}

export const editManage = (payload) => {
  return dispatch => {
    let salt = bcryptjs.genSaltSync(saltRounds);
    let hash = bcryptjs.hashSync(payload.password, salt);
    let blank = ''
    for (let i = 0; i < payload.password.length; i++) {
      blank += '*'
    }
    let obj = {
      url: payload.url,
      username: payload.username,
      password: hash,
      blankPass: blank,
      updated: payload.updated
    }
    UserRef.child(userid).child('data').child(payload.listId).update(obj).then(response => {
      UserRef.child(userid).once('value').then((snapshot) => {
        const user = snapshot.val()
        const newArray = Object.keys(user).map(key => ({
          value: snapshot.val()[key],
          id: key
        }))
        if (user && user.data) {
          const newArray = Object.keys(user.data).map(key => ({
            value: user.data[key],
            id: key
          }))
          dispatch(assign_created(newArray))
          swal ({
            title: 'Success',
            icon: 'success',
            button: 'OK'
          })
          return 0
        }
      })
    })
  }
}

export const search = (payload) => {
  return dispatch => {
    UserRef.child(userid).once('value').then((snapshot) => {
      const user = snapshot.val()
      if (user && user.data) {
        const newArray = Object.keys(user.data).map(key => ({
          value: user.data[key],
          id: key
        }))
        const dataFilter = newArray.filter(data => {
          if (data.value.url.indexOf(payload.value) !== -1 || data.value.username.indexOf(payload.value) !== -1 || data.value.updated.indexOf(payload.value) !== -1) {
            return data
          }
        })
        dispatch(assign_created(dataFilter))
      }
    })
  }
}