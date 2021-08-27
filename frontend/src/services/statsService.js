import { ifetch } from '../api/fetch'
import { FETCH_STATS_URL } from '../consts'

export const statsService = {
  fetchStats: async authToken => {
    const response = await ifetch(FETCH_STATS_URL, { authToken })
    const data = await response.json()

    return {
      data,
      ok: response.ok,
      status: response.status
    }
  }
}
