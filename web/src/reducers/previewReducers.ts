import { PreviewActionTypes } from 'src/type'
import { PreviewActions } from 'src/actions/previewActions'

export interface IRssState {
  rss: string
  error: boolean
  isFetching: boolean
}

const initialState: IRssState = {
  rss: '',
  error: false,
  isFetching: false,
}

const reducer = (
  state: IRssState = initialState,
  action: PreviewActions
): IRssState => {
  switch (action.type) {
    case PreviewActionTypes.FETCH_RSS_START:
      return {
        ...state,
        isFetching: true,
      }
    case PreviewActionTypes.FETCH_RSS_SUCCESS:
      return {
        ...state,
        rss: action.payload.rss,
        error: false,
        isFetching: false,
      }
    case PreviewActionTypes.FETCH_RSS_ERROR:
      return {
        ...state,
        error: true,
        isFetching: false,
      }
    default: {
      return state
    }
  }
}

export default reducer
