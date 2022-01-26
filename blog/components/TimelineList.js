import React from 'react'
import '../static/style/components/timelineList.less'
import Link from 'next/link'
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons'
import { Timeline, Image } from 'antd'
import { formatTime } from '../util/index'

const TimelineList = (props) => {
  const { title, type, typeName, typeList, articleList, count } = props.pageData
  const defaultCover = 'https://static-1255423800.cos.ap-guangzhou.myqcloud.com/image/blog/cover-default_02.jpg'

  const listBox = () => {
    return (
      <ul className={`timeline-list ${type === '3' ? 'timeline-list-tag' : ''}`}>
        {
          typeList.map(item => {
            return type === '3' ? (
              <li key={item.id} style={{color: item.background}}>
                <Link href={'/tag?id=' + item.id}><a>{item.name}</a></Link>
              </li>
            ) : (
              <li key={item.id}>
                <Link href={'/category?id=' + item.id}><a>{item.name}</a></Link>
              </li>
            )
          })
        }
      </ul>
    )
  }

  const timelineBox = () => {
    return (
      <Timeline>
        <Timeline.Item key="year">
          <p className="timeline-title">
            {title} - {typeName ? `${typeName} - ` : ''}{count}
          </p>
        </Timeline.Item>
        {articleList.map((item, index) => {
          return (
            <Timeline.Item dot={item.type === 'date' ? <ClockCircleOutlined className="timeline-clock-icon" /> : ''} color={item.type === 'date' ? 'green' : 'blue'} key={index}>
              {
                item.type === 'date' ? <p className="timeline-year">{item.year}</p> : (
                  <div className="timeline-item">
                    <div className="timeline-cover">
                      <Link href={'/detailed?id=' + item.id}>
                        <a><Image width={'100%'} height={'100%'} preview={false} src={item.cover || defaultCover} /></a>
                      </Link>
                    </div>
                    <div className="timeline-info">
                      <span className="timeline-date"><CalendarOutlined /> {formatTime(item.add_time, 'yyyy-MM-dd hh:mm')}</span>
                      <Link href={'/detailed?id=' + item.id}>
                        <a className="ellipsis-txt timeline-link" title={item.title}>{item.title}</a>
                      </Link>
                    </div>
                  </div>
                )
              }
            </Timeline.Item>
          )
        })}
      </Timeline>
    )
  }

  return (
    <div className="timeline-box card-box">
      {
        typeName === '' && type !== '1' ? listBox() : timelineBox()
      }
    </div>
  )
}

export default TimelineList
