import { Image } from 'antd'
import '../static/style/components/project.scss'

const Project = () => {
  return (
    <div className="project-div comm-box">
      <div className="project-item">
        <Image src="../static/images/project-01.png" width={100} />
        <div className="projec-txt">
          <p className="project-title">垃圾分类小程序</p>
          <p className="project-descr">快来看看你是什么垃圾吧~</p>
        </div> 
      </div>
    </div>
  )
}

export default Project
