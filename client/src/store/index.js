import { createStore, applyMiddleware, combineReducers } from 'redux'
import user_login from './user.login/login.reducer'
import user_action from './user.action/action.reducer'
import thunk from 'redux-thunk'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import logger from 'redux-logger'

const reducers = combineReducers({
  login: user_login,
  action: user_action
})

const store = createStore(reducers, applyMiddleware(thunk, logger))

export default store