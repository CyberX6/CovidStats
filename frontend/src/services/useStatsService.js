import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchStatsRequested } from '../redux/stats/actions'

export const useStatsService = () => {
  const dispatch = useDispatch()
  const stats = useSelector(({ stats }) => stats, shallowEqual)

  useEffect(() => {
    dispatch(fetchStatsRequested())
  }, [dispatch])

  return { stats }
}
