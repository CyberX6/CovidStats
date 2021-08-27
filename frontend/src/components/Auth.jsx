import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

export const Auth = () => {
  const history = useHistory()
  const [cookies] = useCookies()

  useEffect(() => {
    if (!cookies.authToken) {
      history.push('/login')
    }
  }, [cookies.authToken, history])

  return null
}
