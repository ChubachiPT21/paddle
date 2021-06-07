import { combineReducers } from 'redux'

import feed from './feedReducers'
import source from './sourceReducers'
import user from './userReducers'
import preview from './previewReducers'

const reducers = combineReducers({
  feed,
  source,
  user,
  preview,
})

export default reducers
