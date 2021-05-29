import { Action, Dispatch } from 'redux'
import { AuthenticationActionTypes, IAuthentication, IUser } from '../type'
import authenticationRequest from '../api/authenticationRequest'

interface IAuthenticationAction extends Action {
  type: AuthenticationActionTypes.AUTHENTICATION_START
}

interface IAuthenticationSuccess extends Action {
  type: AuthenticationActionTypes.AUTHENTICATION_SUCCESS
  payload: {
    user: IUser
  }
}

interface IAuthenticationError extends Action {
  type: AuthenticationActionTypes.AUTHENTICATION_ERROR
  payload: {
    error: Error
  }
}

const authenticationStart = (): IAuthenticationAction => ({
  type: AuthenticationActionTypes.AUTHENTICATION_START,
})

const authenticationSuccess = (user: IUser): IAuthenticationSuccess => ({
  type: AuthenticationActionTypes.AUTHENTICATION_SUCCESS,
  payload: {
    user,
  },
})

const authenticationError = (error: Error): IAuthenticationError => ({
  type: AuthenticationActionTypes.AUTHENTICATION_ERROR,
  payload: {
    error,
  },
})

export const signUp = (authenticationInput: IAuthentication) => {
  return (dispatch: Dispatch) => {
    dispatch(authenticationStart())
    return authenticationRequest
      .signUp(authenticationInput)
      .then((res) => {
        dispatch(authenticationSuccess(res.data as IUser))
      })
      .catch((error) => {
        dispatch(authenticationError(error))
      })
  }
}

export const signIn = (authenticationInput: IAuthentication) => {
  return (dispatch: Dispatch) => {
    dispatch(authenticationStart())
    return authenticationRequest
      .signIn(authenticationInput)
      .then((res) => {
        dispatch(authenticationSuccess(res.data))
      })
      .catch((error) => {
        dispatch(authenticationError(error))
      })
  }
}

export type AuthenticationAction =
  | IAuthenticationAction
  | IAuthenticationSuccess
  | IAuthenticationError
