import { call, put, fork, take } from 'redux-saga/effects'
import { signInFailed, signInRequested, signInSucceeded } from './actions'
import { userService } from '../../services/userService'

export function* signIn({ payload }) {
  try {
    let response = yield call(userService.signInUser, { payload })

    if (response.ok) {
      yield call(payload.setCookies(response.data.access_token))
      yield put(signInSucceeded({ data: response.data }))
    } else {
      yield put(
        signInFailed({
          errorMessage: response.data?.message,
          errorCode: response.status
        })
      )
    }
  } catch (error) {
    yield put(signInFailed({ errorMessage: error.message }))
  }
}

export default function* watcher() {
  while (true) {
    const { payload } = yield take([signInRequested().type])
    yield fork(signIn, { payload })
  }
}
