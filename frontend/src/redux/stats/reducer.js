import { FETCH_STATS_FAILED, FETCH_STATS_SUCCEEDED } from './types'

const initialState = {
  loading: true,
  data: undefined,
  error: null
}

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
    case FETCH_STATS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}
