import React, { useState } from 'react'
import Link from 'next/link'
import { List, Image } from 'antd'
import '../static/style/components/blogList.less'
import { CalendarFilled, FolderOpenFilled, TagFilled } from '@ant-design/icons'
import { formatTime } from '../util/index'

const BlogList = (props) => {
  const [articleList] = useState(props.articleList)
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  return (
    <>
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
                <div className="item-title ellipsis-txt">{item.title}</div>
              </Link>
              <div className="item-meta">
                <span className="item-meta-wrapper">
                  <CalendarFilled /> 发表于 {formatTime(item.add_time, 'yyyy-MM-dd hh:mm')}
                </span>
                {
                  item.category && item.category.length ? (
                    <span className="item-meta-wrapper">
                      <span className="item-meta-separator">|</span>
                      <FolderOpenFilled />
                      {item.category.map((ele) => (
                        <span className="item-meta-tag" key={ele.id}>
                          <Link href={'/detailed?id=' + item.id}>{ele.name}</Link>
                        </span>
                      ))}
                    </span>
                  ) : ''
                }
                {
                  item.tag && item.tag.length ? (
                    <span className="item-meta-wrapper">
                      <span className="item-meta-separator">|</span>
                      <TagFilled />
                      {item.tag.map((ele) => (
                        <span className="item-meta-tag" key={ele.id}>
                          <Link href={'/detailed?id=' + item.id}>{ele.name}</Link>
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
    </>
  )
}

export default BlogList
