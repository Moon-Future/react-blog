import '../static/style/components/blogList.less'
import Link from 'next/link'
import { List, Image } from 'antd'
import { formatTime, MyIcon } from '../util'

const BlogList = (props) => {
  const { articleList } = props
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  return (
    <div className="blog-list-container">
      <List
        itemLayout="vertical"
        dataSource={articleList}
        renderItem={(item, index) => (
          <List.Item className="list-item card-box">
            <div className={`item-cover ${index % 2 !== 0 ? 'right' : ''}`}>
              <Link href={'/detailed?id=' + item.id}>
                <a><Image width={'100%'} preview={false} src={item.cover || defaultCover} /></a>
              </Link>
            </div>
            <div className="item-info"> 
              <Link href={'/detailed?id=' + item.id}>
                <a className="item-title ellipsis-txt">{item.title}</a>
              </Link>
              <div className="item-meta">
                <span className="item-meta-wrapper">
                  <MyIcon type="icon-calendar" /> 发表于 {formatTime(item.add_time, 'yyyy-MM-dd hh:mm')}
                </span>
                {
                  item.category && item.category.length ? (
                    <span className="item-meta-wrapper">
                      <span className="item-meta-separator">|</span>
                      <MyIcon type="icon-category" />
                      {item.category.map((ele) => (
                        <span className="item-meta-tag" key={ele.id}>
                          <Link href={'/category?id=' + item.id}>{ele.name}</Link>
                        </span>
                      ))}
                    </span>
                  ) : ''
                }
                {
                  item.tag && item.tag.length ? (
                    <span className="item-meta-wrapper">
                      <span className="item-meta-separator">|</span>
                      <MyIcon type="icon-tags" />
                      {item.tag.map((ele) => (
                        <span className="item-meta-tag" key={ele.id}>
                          <Link href={'/tag?id=' + item.id}>{ele.name}</Link>
                        </span>
                      ))}
                    </span>
                  ) : ''
                }
              </div>
              <div className="item-summary">{item.summary}</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default BlogList
