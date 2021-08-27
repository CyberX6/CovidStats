import { Button, Form, Input, Layout, message } from 'antd'
import 'antd/dist/antd.css'
import { Content } from 'antd/es/layout/layout'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { signInRequested } from '../redux/user/actions'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user, shallowEqual)
  const history = useHistory()
  const [cookies, setCookie] = useCookies()

  useEffect(() => {
    if (cookies.authToken) {
      history.push('/table')
    }
  }, [cookies.authToken, history])

  const setCookies = token => {
    setCookie('authToken', token)
  }

  if (user.error) {
    message.error(user.error?.message)
  }

  const onFinish = values => {
    const { email, password } = values

    dispatch(signInRequested({ email, password, setCookies }))
  }

  return (
    <Layout>
      <Content>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                pattern: /\S+@\S+\.\S+/,
                message: 'Please input your email!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}
