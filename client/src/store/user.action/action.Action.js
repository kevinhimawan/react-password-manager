import db from '../firebase'
import  {
  ASSIGN_DATA,
  ASSIGN_CREATE,
  SIGN_OUT,
  OPEN_MODAL_ADD
} from './action.actionTypes'
import swal from 'sweetalert'
import jwt from 'jsonwebtoken'
import { decode } from 'punycode';

const bcryptjs = require('bcryptjs')
const saltRounds = 10

const UserRef = db.ref('User')
let userid = localStorage.getItem('userid')

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

        if (user.token) {
          let {tokens} = jwt.verify(user.token, 'secret_key')
          let obj = {
            url: payload.form.url,
            username: payload.form.username,
            password: payload.form.password,
          }
          tokens.push(obj)
          
          let newToken = jwt.sign({tokens}, 'secret_key')
          UserRef.child(payload.userid).child('token').set(newToken)
        } else {
          let tokens = []
          let obj = {
            url: payload.form.url,
            username: payload.form.username,
            password: payload.form.password,
          }
          tokens.push(obj)
          let token = jwt.sign({tokens}, 'secret_key')
          UserRef.child(payload.userid).child('token').set(token)
        }
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
    const {id, url, username} = payload
    UserRef.child(userid).child('data').child(id).set(null).then(response => {
      UserRef.child(userid).once('value').then((snapshot) => {
        const user = snapshot.val()
        console.log(user)
        const newArray = Object.keys(user).map(key => ({
          value: snapshot.val()[key],
          id: key
        }))
        let {tokens} = jwt.verify(user.token, 'secret_key')
        let index;

        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i].url === url && tokens[i].username === username) {
            index = i
          }
        }
        tokens.splice(index,1)
        if (tokens.length === 0) {
          UserRef.child(userid).child('token').set(null)
        } else {
          let token = jwt.sign({tokens}, 'secret_key')
          UserRef.child(userid).child('token').set(token)
        }
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
        } else {
          let arrayBlank = []
          dispatch(assign_created(arrayBlank))
          swal ({
            title: 'Success',
            icon: 'success',
            button: 'OK'
          })
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
    let userid = localStorage.getItem('userid')
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

export const passwordShow = (payload) => {
  return dispatch => {
    const {url, username, data} = payload
    UserRef.child(userid).once('value').then((snapshot) => {
      const {token} = snapshot.val()
      let {tokens} = jwt.verify(token, 'secret_key')
      let password;
      for (let i = 0; i < tokens.length; i++) {
        console.log(tokens)
        if (tokens[i].url === url && tokens[i].username === username) {
          password = tokens[i].password
        }
      }
      console.log(password)
      for (let i = 0; i < data.length; i++) {
        if (data[i].value.url === url && data[i].value.username === username) {
          data[i].value.blankPass = password
        }
      }
      console.log(data)
      dispatch(assign_created(data))
        return 0
    })
  }
}