import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { signInSucceeded } from '../redux/user/actions'

export const Auth = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [cookies] = useCookies()
  const user = useSelector(({ user }) => user, shallowEqual)

  useEffect(() => {
    if (cookies.authToken && !user.data?.authToken) {
      dispatch(signInSucceeded({ data: { access_token: cookies.authToken } }))
    }

    if (!cookies.authToken) {
      history.push('/login')
    }
  }, [cookies.authToken, dispatch, history, user.data?.authToken])

  return null
}
