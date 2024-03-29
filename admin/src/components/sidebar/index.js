import './index.scss'
import { Menu, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

const menuList = [
  { title: '首页', url: '/' },
  {
    title: '文章管理',
    children: [
      { title: '文章列表', url: '/articleList' },
      { title: '新增文章', url: '/addArticle' },
    ],
  },
  { title: '目录', url: '/category' },
  { title: '标签', url: '/tag' },
]

export default function SideBar(props) {
  const { pathname } = props
  return (
    <div className="sidebar">
      <div className="logo">
        <Avatar className="avatar" size={50} src="https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/avatar/avatar-default.jpg" />
        <span>Blog's Admin</span>
      </div>
      <Menu defaultSelectedKeys={['/']} selectedKeys={[pathname]} mode="inline" theme="dark">
        {menuList.map((ele, index) => {
          return ele.children ? (
            <SubMenu key={index} title={ele.title}>
              {ele.children.map((v, k) => {
                return (
                  <Menu.Item key={v.url}>
                    <Link to={v.url}>{v.title}</Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          ) : (
            <Menu.Item key={ele.url}>
              <Link to={ele.url}>{ele.title}</Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}
