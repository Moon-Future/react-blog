import { Avatar, Divider, Popover, Image } from 'antd'
import '../static/style/components/author.less'
import { WechatFilled, GithubFilled } from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-box card-box">
      <Avatar className="author-avatar" size={100} src="https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/avatar/avatar-default.jpg" />
      <div className="author-introduction">
        程序不过是梦， 生于无形无象的禅中， 我们只是那做梦的人。
        <Divider className="author-divide">社交账号</Divider>
        <Popover
          placement="top"
          content={() => {
            return <Image src="../static/images/Wechat.jpg" preview={false} />
          }}
          trigger="hover"
        >
          <Avatar className="author-social" size={32} icon={<WechatFilled />} className="account" />
        </Popover>
        <a href="https://github.com/Moon-Future/react-blog" target="_blank">
          <Avatar className="author-social" size={32} icon={<GithubFilled />} className="account" />
        </a>
      </div>
    </div>
  )
}

export default Author
