import { Action, Dispatch } from 'redux'
import { SourceActionTypes, ISource, IRss } from 'src/type'

import sourcesRequest from 'src/api/sourcesRequest'

interface IFetchSourcesAction extends Action {
  type: SourceActionTypes.FETCH_SOURCES_START
}

interface IFetchSourcesSuccess extends Action {
  type: SourceActionTypes.FETCH_SOURCES_SUCCESS
  payload: {
    sources: ISource[]
  }
}

interface IFetchSourcesError extends Action {
  type: SourceActionTypes.FETCH_SOURCES_ERROR
  payload: {
    error: Error
  }
}

interface IDeleteSourceSuccess extends Action {
  type: SourceActionTypes.DELETE_SOURCE_SUCESS
  payload: {
    sourceID: number
  }
}

interface IDeleteSourceError extends Action {
  type: SourceActionTypes.DELETE_SOURCE_ERROR
  payload: {
    error: Error
  }
}

const fetchSourcesBegin = (): IFetchSourcesAction => ({
  type: SourceActionTypes.FETCH_SOURCES_START,
})

const fetchSourcesSuccess = (sources: ISource[]): IFetchSourcesSuccess => ({
  type: SourceActionTypes.FETCH_SOURCES_SUCCESS,
  payload: {
    sources,
  },
})

const fetchSourcesError = (error: Error): IFetchSourcesError => ({
  type: SourceActionTypes.FETCH_SOURCES_ERROR,
  payload: {
    error,
  },
})

const deleteSourceSuccess = (sourceID: number): IDeleteSourceSuccess => ({
  type: SourceActionTypes.DELETE_SOURCE_SUCESS,
  payload: {
    sourceID,
  },
})

const deleteSourceError = (error: Error): IDeleteSourceError => ({
  type: SourceActionTypes.DELETE_SOURCE_ERROR,
  payload: {
    error,
  },
})

export const fetchSources = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchSourcesBegin())
    return sourcesRequest
      .fetchSources()
      .then((res) => {
        dispatch(fetchSourcesSuccess(res.data))
      })
      .catch((error) => {
        dispatch(fetchSourcesError(error))
      })
  }
}

export const createSource = (rss: IRss) => {
  return sourcesRequest
    .createSource(rss.url)
    .then((res) => res.data.sourceID)
    .catch((e) => {
      /* eslint-disable no-console */
      console.error(e)
      return false
    })
}

export const deleteSource = (sourceID: number) => {
  return (dispatch: Dispatch) => {
    return sourcesRequest
      .deleteSource(sourceID)
      .then(() => {
        dispatch(deleteSourceSuccess(sourceID))
      })
      .catch((error) => {
        dispatch(deleteSourceError(error))
      })
  }
}

export type SourceActions =
  | IFetchSourcesAction
  | IFetchSourcesSuccess
  | IFetchSourcesError
  | IDeleteSourceSuccess
  | IDeleteSourceError
