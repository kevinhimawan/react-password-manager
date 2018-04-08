const initialize = {
  userid: '',
  status: false,
  login: {
    email: false,
    password: false
  },
  loading: false
}

const reducer = (state = initialize, action) => {
  switch (action.type) {
    case 'SIGNUP_USER': {
      return {
        ...state,
        userid: action.payload,
        status: true,
      }
    }
    case 'LOGIN_USER': {
      return {
        ...state,
          userid: action.payload,
          loading: false,
          status: true,
        ...state.login,
          email: false,
          password: false,
      }
    }

    case 'LOGIN_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'PASSWORD_ERROR': {
      return {
        ...state,
          loading: false,
        ...state.login,
          password: true,
        
      }
    }

    case 'EMAIL_ERROR': {
      return {
        ...state,
          loading: false,
        ...state.login,
          email: true,
          
      }
    }

    case 'SIGN_OUT': {
      return {
        ...state,
        status: false
      }
    }

    default:
      return state;
  }
}

export default reducer