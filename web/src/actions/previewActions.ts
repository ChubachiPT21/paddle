import { Action, Dispatch } from 'redux'
import previewRequest from 'src/api/previewRequest'
import { PreviewActionTypes } from '../type'

interface IFetchRssAction extends Action {
  type: PreviewActionTypes.FETCH_RSS_START
}

interface IFetchRssSuccess extends Action {
  type: PreviewActionTypes.FETCH_RSS_SUCCESS
  payload: {
    rss: string
  }
}

interface IFetchRssError extends Action {
  type: PreviewActionTypes.FETCH_RSS_ERROR
  payload: {
    error: Error
  }
}

const fetchRssBegin = (): IFetchRssAction => ({
  type: PreviewActionTypes.FETCH_RSS_START,
})

const fetchRssSuccess = (rss: string): IFetchRssSuccess => ({
  type: PreviewActionTypes.FETCH_RSS_SUCCESS,
  payload: {
    rss,
  },
})

const fetchRssError = (error: Error): IFetchRssError => ({
  type: PreviewActionTypes.FETCH_RSS_ERROR,
  payload: {
    error,
  },
})

export const fetchRss = (url: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchRssBegin())
    return previewRequest
      .fetchRss(url)
      .then((res) => {
        dispatch(fetchRssSuccess(res.data))
      })
      .catch((error) => {
        dispatch(fetchRssError(error))
      })
  }
}

export type PreviewActions = IFetchRssAction | IFetchRssSuccess | IFetchRssError
