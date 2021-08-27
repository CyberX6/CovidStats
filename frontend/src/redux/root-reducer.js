import { combineReducers } from 'redux'
import { userReducer } from './user/reducer'
import { statsReducer } from './stats/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  stats: statsReducer
})

export default rootReducer
