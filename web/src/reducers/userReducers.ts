import { AuthenticationActionTypes, IUser } from 'src/type'
import { AuthenticationAction } from 'src/actions/authenticationActions'

export interface IUserState {
  error: boolean
  user: IUser
}

const initialState: IUserState = {
  error: false,
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
