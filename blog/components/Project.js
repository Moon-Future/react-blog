import '../static/style/components/project.less'
import { Image } from 'antd'

const Project = () => {
  return (
    <div className="project-box card-box">
      <div className="project-item">
        <Image src="https://love100-1255423800.cos.ap-shanghai.myqcloud.com/images/barcode/love100_barcode.jpg" width={100} preview={false} />
        <div className="project-txt">
          <p className="project-title">情侣100件事</p>
          <p className="project-desc">浪漫小事打卡~</p>
        </div> 
      </div>
    </div>
  )
}

export default Project
