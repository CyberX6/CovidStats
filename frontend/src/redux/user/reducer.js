import { SIGNIN_SUCCEEDED, SIGNIN_FAILED, SIGNIN_REQUESTED } from './types'

const initialState = {
  loading: true,
  data: undefined,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
    case SIGNIN_FAILED:
      return {
        ...state,
        error: {
          message: action.payload.errorMessage,
          code: action.payload.errorCode
        },
        loading: false
      }
    case SIGNIN_REQUESTED:
      return {
        ...state,
        data: null
      }
    default:
      return state
  }
}
