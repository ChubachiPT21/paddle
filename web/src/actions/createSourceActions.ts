import { Action, Dispatch } from 'redux'
import { CreateSourceActionTypes, IRss } from 'src/type'

import sourcesRequest from 'src/api/sourcesRequest'

interface ICreateSourceAction extends Action {
  type: CreateSourceActionTypes.CREATE_SOURCE_START
}

interface ICreateSourceSuccess extends Action {
  type: CreateSourceActionTypes.CREATE_SOURCE_SUCCESS
  payload: {
    result: any
  }
}

interface ICreateSourceError extends Action {
  type: CreateSourceActionTypes.CREATE_SOURCE_ERROR
  payload: {
    error: Error
  }
}

const createSourceBegin = (): ICreateSourceAction => ({
  type: CreateSourceActionTypes.CREATE_SOURCE_START,
})

const createSourceSuccess = (result: any): ICreateSourceSuccess => ({
  type: CreateSourceActionTypes.CREATE_SOURCE_SUCCESS,
  payload: {
    result,
  },
})

const createSourceError = (error: Error): ICreateSourceError => ({
  type: CreateSourceActionTypes.CREATE_SOURCE_ERROR,
  payload: {
    error,
  },
})

export const createSource = (rss: IRss) => {
  return (dispatch: Dispatch) => {
    dispatch(createSourceBegin())
    return sourcesRequest
      .createSource(rss)
      .then((res) => {
        dispatch(createSourceSuccess(res.data))
      })
      .catch((error) => {
        dispatch(createSourceError(error))
      })
  }
}

export type CreateSourceActions =
  | ICreateSourceAction
  | ICreateSourceSuccess
  | ICreateSourceError
