import '../static/style/components/project.less'
import { Image } from 'antd'

const Project = () => {
  return (
    <div className="project-box card-box">
      <div className="project-item">
        <Image src="../static/images/project-01.png" width={100} preview={false} />
        <div className="project-txt">
          <p className="project-title">垃圾分类小程序</p>
          <p className="project-desc">快来看看你是什么垃圾吧~</p>
        </div> 
      </div>
    </div>
  )
}

export default Project
