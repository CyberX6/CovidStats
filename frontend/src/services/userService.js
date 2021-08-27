import { ifetch } from '../api/fetch'
import { SIGNIN_URL } from '../consts'

export const userService = {
  signInUser: async ({ payload }) => {
    const url = SIGNIN_URL.replace(':email', payload.email).replace(
      ':password',
      payload.password
    )

    const response = await ifetch(url, { options: { method: 'POST' } })
    const data = await response.json()

    return {
      data,
      ok: response.ok,
      status: response.status
    }
  }
}
