import {
  FETCH_STATS_REQUESTED,
  FETCH_STATS_SUCCEEDED,
  FETCH_STATS_FAILED
} from './types'

export const fetchStatsRequested = () => ({
  type: FETCH_STATS_REQUESTED
})

export const fetchStatsSucceeded = content => ({
  type: FETCH_STATS_SUCCEEDED,
  payload: content
})

export const fetchStatsFailed = content => ({
  type: FETCH_STATS_FAILED,
  payload: content
})
