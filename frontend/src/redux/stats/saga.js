import { call, put, fork, select, delay } from 'redux-saga/effects'
import {
  fetchStatsFailed,
  fetchStatsRequested,
  fetchStatsSucceeded
} from './actions'
import { statsService } from '../../services/statsService'

export function* fetchStats() {
  yield delay(1000)

  try {
    const user = yield select(({ user }) => user)

    let response = yield call(statsService.fetchStats, user.data.access_token)

    if (response.ok) {
      yield put(fetchStatsSucceeded({ data: response.data }))
    } else {
      yield put(fetchStatsFailed({ data: response.data }))
    }
  } catch (error) {
    yield put(fetchStatsFailed({ data: error }))
  }
}

export default function* watcher() {
  yield fork([fetchStatsRequested, fetchStats])
}
