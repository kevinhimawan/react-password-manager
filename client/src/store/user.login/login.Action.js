import db from '../firebase'
import  {
  SIGNUP_USER,
  LOGIN_USER,
  PASSWORD_ERROR,
  EMAIL_ERROR,
  LOGIN_LOADING,
  SIGN_OUT
} from './login.actionTypes'
const UserRef = db.ref('User')
const bcryptjs = require('bcryptjs')
const saltRounds = 10

export const signup_user = (payload) => {
  return dispatch => {
    dispatch(LOGINUSER_LOADING())
    let salt = bcryptjs.genSaltSync(saltRounds);
    let hash = bcryptjs.hashSync(payload.password, salt);
    UserRef.push({
      username: payload.username,
      email: payload.email,
      password: hash,
    }).then((data) => {
      localStorage.setItem('userid', data.key)
      dispatch(SIGNUPUSER(data.key))
    })
  }
}

const SIGNUPUSER = (data) => ({
  type: SIGNUP_USER,
  payload: data
})

export const login_user = (payload) => {
  return dispatch => {
    dispatch(LOGINUSER_LOADING())
    UserRef.once('value').then((snapshot) => {
      let data = snapshot.val()
      let count = 0
      Object.keys(data).forEach((key, i) => {
        if (data[key].email === payload.email) {
          let check = bcryptjs.compareSync(payload.password, data[key].password)
          if (check) {
            localStorage.setItem('userid', key)
            dispatch(LOGINUSER(key))
            return 0
          } else {
            dispatch(LOGINUSER_PASWORD_ERROR())
            return 0
          }          
        }
        count++
      })
      if (count > 0) {
        dispatch(LOGINUSER_EMAIL_ERROR()) 
        return 0
      }
    })
  }
}

const LOGINUSER = (data) => ({
  type: LOGIN_USER,
  payload: data
})

const LOGINUSER_LOADING = () => ({
  type: 'LOGIN_LOADING'
})

const LOGINUSER_PASWORD_ERROR = () => ({
  type: PASSWORD_ERROR
})

const LOGINUSER_EMAIL_ERROR = () => ({
  type: EMAIL_ERROR
})

export const signout_user = () => {
  return dispatch => {
    dispatch(SIGNOUT())
  }
}

const SIGNOUT = () => {
  type: SIGN_OUT
}