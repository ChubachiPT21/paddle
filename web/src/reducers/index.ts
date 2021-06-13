import { combineReducers } from 'redux'

import feed from './feedReducers'
import source from './sourceReducers'
import user from './userReducers'
import search from './previewReducers'

const reducers = combineReducers({
  feed,
  source,
  user,
  search,
})

export default reducers
