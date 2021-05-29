import { combineReducers } from 'redux'

import feed from './feedReducers'
import source from './sourceReducers'
import user from './userReducers'

const reducers = combineReducers({
  feed,
  source,
  user,
})

export default reducers
