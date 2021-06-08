import { combineReducers } from 'redux'

import feed from './feedReducers'
import source from './sourceReducers'
import user from './userReducers'
import search from './previewReducers'
import createSource from './createSourceReducers'

const reducers = combineReducers({
  feed,
  source,
  user,
  search,
  createSource,
})

export default reducers
