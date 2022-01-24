import React from 'react'
import '../static/style/components/recentBlog.less'
import Link from 'next/link'
import { List, Image } from 'antd'
import { HistoryOutlined } from '@ant-design/icons'
import { formatTime } from '../util/index'

const RecentBlog = (props) => {
  const recentList = [
    {
      id: '111',
      title: '222',
      cover: 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_01.jpg',
      add_time: 1643040840590
    },
    {
      id: '222',
      title: '22211',
      cover: 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_01.jpg',
      add_time: 1643040840590
    }
  ]
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  return (
    <div className="recent-div card-box">
      <div className="recent-headline">
        <HistoryOutlined />
        <span className="recent-title">最新文章</span>
      </div>
      <List
        itemLayout="vertical"
        dataSource={recentList}
        renderItem={(item) => (
          <List.Item className="recent-item">
            <div className="recent-cover">
              <Link href={'/detailed?id=' + item.id}>
                <a><Image width={'100%'} preview={false} src={item.cover || defaultCover} /></a>
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
