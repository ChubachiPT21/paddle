import { Action, Dispatch } from 'redux'
import { CreateSourceActionTypes, ISource } from 'src/type'

import sourcesRequest from 'src/api/sourcesRequest'

interface ICreateSourceAction extends Action {
  type: CreateSourceActionTypes.CREATE_SOURCE_START
}

interface ICreateSourceSuccess extends Action {
  type: CreateSourceActionTypes.CREATE_SOURCE_SUCCESS
  payload: {
    source: ISource
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

const createSourceSuccess = (source: ISource): ICreateSourceSuccess => ({
  type: CreateSourceActionTypes.CREATE_SOURCE_SUCCESS,
  payload: {
    source,
  },
})

const createSourceError = (error: Error): ICreateSourceError => ({
  type: CreateSourceActionTypes.CREATE_SOURCE_ERROR,
  payload: {
    error,
  },
})

export const createSource = (title: string, url: string) => {
  return (dispatch: Dispatch) => {
    dispatch(createSourceBegin())
    return sourcesRequest
      .createSource(title, url)
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
