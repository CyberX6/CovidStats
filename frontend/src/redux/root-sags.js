import { all } from 'redux-saga/effects'
import userSaga from './user/saga'
import statsSaga from './stats/saga'

export default function* rootSaga() {
  yield all([userSaga(), statsSaga()])
}
