import '../static/style/components/recentBlog.less'
import Link from 'next/link'
import { List, Image } from 'antd'
import { formatTime, MyIcon } from '../util'

const RecentBlog = (props) => {
  const { recentArticle } = props
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  return (
    <div className="recent-box card-box">
      <div className="card-headline">
        <MyIcon type="icon-recent" />
        <span className="card-title">最新文章</span>
      </div>
      <List
        itemLayout="vertical"
        dataSource={recentArticle}
        renderItem={(item) => (
          <List.Item className="recent-item">
            <div className="recent-cover">
              <Link href={'/detailed?id=' + item.id}>
                <a><Image width={'100%'} height={'100%'} preview={false} src={item.cover || defaultCover} /></a>
              </Link>
            </div>
            <div className="recent-info">
              <Link href={'/detailed?id=' + item.id}>
                <a className="ellipsis-txt" title={item.title}>{item.title}</a>
              </Link>
              <span className="recent-date">{formatTime(item.add_time, 'yyyy-MM-dd hh:mm')}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default RecentBlog
