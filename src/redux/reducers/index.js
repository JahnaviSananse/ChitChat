import { combineReducers } from 'redux'
import AuthReducer from './auth'
import UserReducer from './user'

const reducers = {
  auth: AuthReducer,
  user: UserReducer,
}

const combinedReducer = combineReducers(reducers)

// export interface IReduxState {
//   auth: AuthReducer;
// }

export default combinedReducer
