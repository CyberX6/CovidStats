import {
  SIGNIN_REQUESTED,
  SIGNIN_SUCCEEDED,
  SIGNIN_FAILED,
  SIGNOUT_REQUESTED
} from './types'

export const signInRequested = content => ({
  type: SIGNIN_REQUESTED,
  payload: content
})

export const signInSucceeded = content => ({
  type: SIGNIN_SUCCEEDED,
  payload: content
})

export const signInFailed = content => ({
  type: SIGNIN_FAILED,
  payload: content
})

export const signoutRequested = () => ({
  type: SIGNOUT_REQUESTED
})
