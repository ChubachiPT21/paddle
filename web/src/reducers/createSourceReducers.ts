import { CreateSourceActionTypes } from 'src/type'
import { CreateSourceActions } from 'src/actions/createSourceActions'

export interface ICreateSourceState {
  error: boolean
  isCreating: boolean
}

const initialState: ICreateSourceState = {
  error: false,
  isCreating: false,
}

const reducer = (
  state: ICreateSourceState = initialState,
  action: CreateSourceActions
): ICreateSourceState => {
  switch (action.type) {
    case CreateSourceActionTypes.CREATE_SOURCE_START:
      return {
        ...state,
        isCreating: true,
      }
    case CreateSourceActionTypes.CREATE_SOURCE_SUCCESS:
      return {
        ...state,
        error: false,
        isCreating: false,
      }
    case CreateSourceActionTypes.CREATE_SOURCE_ERROR:
      return {
        ...state,
        error: true,
        isCreating: false,
      }
    default: {
      return state
    }
  }
}

export default reducer
