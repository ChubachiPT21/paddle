import { AuthenticationActionTypes, IUser } from 'src/type'
import { AuthenticationAction } from 'src/actions/authenticationActions'

export interface IUserState {
  error: boolean
  signError: boolean
  user: IUser
}

const initialState: IUserState = {
  error: false,
  signError: false,
  user: {
    email: '',
    token: '',
  },
}

const reducer = (
  state: IUserState = initialState,
  action: AuthenticationAction
): IUserState => {
  switch (action.type) {
    case AuthenticationActionTypes.AUTHENTICATION_START:
      return {
        ...state,
      }
    case AuthenticationActionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        signError: false,
        error: false,
      }
    case AuthenticationActionTypes.AUTHENTICATION_SIGN_ERROR:
      return {
        ...state,
        signError: true,
      }
    case AuthenticationActionTypes.AUTHENTICATION_ERROR:
      return {
        ...state,
        error: true,
      }
    default: {
      return state
    }
  }
}

export default reducer
