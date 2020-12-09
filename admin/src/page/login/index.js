import { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons'
import ajax from '../../util/ajax'
import './index.scss'
const crypto = require('crypto')

export default function Login(props) {
  const [background, setBackground] = useState('')
  const [loginStatus, setLoginStatus] = useState(true)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    ajax.get('https://api.no0a.cn/api/bing/0').then((res) => {
      setBackground(res.data.bing.url)
    })
  }, [])

  const onFinish = (values) => {
    const { username, password, nickname } = values
    const word = crypto.createHash('sha1').update(password).digest('hex')
    let data
    if (loginStatus) {
      data = { username, password: word }
      ajax.post('login', data).then(res => {
        localStorage.setItem('token', res.data.token)
        props.history.push('/')
      })
    } else {
      data = { username, password: word, nickname }
      ajax.post('register', data).then(res => {
        setInitialValues({ username, password })
        setLoginStatus(true)
      })
    }
  }

  const changePage = (e) => {
    e.preventDefault()
    setLoginStatus(!loginStatus)
  }

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})` }}>
      <Form name="normal_login" className="login-form" initialValues={initialValues} onFinish={onFinish}>
        <Form.Item name="username" rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          }
        ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        {
          loginStatus ? (
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="/login" onClick={e => changePage(e)}>register now!</a>
            </Form.Item>
          ) : (
            <>
              <Form.Item name="confirm" dependencies={['password']} rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject('The two passwords that you entered do not match!')
                  },
                })
              ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item
                name="nickname"
                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}>
                <Input prefix={<SmileOutlined />} placeholder="Nickname" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
                Or <a href="/login" onClick={e => changePage(e)}>Login now!</a>
              </Form.Item>
            </>
          )
        }
        
      </Form>
    </div>
  )
}
