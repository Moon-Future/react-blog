import React from 'react'
import '../static/style/components/timelineList.less'
import Link from 'next/link'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Timeline } from 'antd'

const TimelineList = (props) => {
  const { title = '分类', type = '前端', count = 9 } = props

  return (
    <div className="timeline-box card-box">
      <Timeline>
        <Timeline.Item>
          <p>{title} - {type} - {count}</p>
        </Timeline.Item>
        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="green">
          <p>2022</p>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export default TimelineList
