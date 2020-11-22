import { Avatar, Divider } from 'antd'
import '../static/style/components/author.scss'
import { WechatFilled, GithubFilled, QqCircleFilled } from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="../static/images/avatar.jpg" />
      </div>
      <div className="author-introduction">
        程序不过是梦， 生于无形无象的禅中， 我们只是那做梦的人。
        <Divider className="author-divide">社交账号</Divider>
        <Avatar size={32} icon={<WechatFilled />} className="account" />
        <Avatar size={32} icon={<GithubFilled />} className="account" />
        <Avatar size={32} icon={<QqCircleFilled />} className="account" />
      </div>
    </div>
  )
}

export default Author
