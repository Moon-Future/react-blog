import './index.scss'
import { Button } from 'antd'

export default function Header(props) {
  const { userInfo } = props

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    props.history.push('/login')
  }

  return (
    <>
      <span>{userInfo.nickname}</span>
      <Button type="link" onClick={logout}>退出</Button>
    </>
  )
}