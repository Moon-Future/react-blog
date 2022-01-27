import '../static/style/components/pagination.less'
import Link from 'next/link'
import { Pagination } from 'antd'

const PaginationComponent = (props) => {
  const { count, current, seoShow = false } = props
  const pageList = new Array(Math.ceil(count / 10)).fill(1)

  const onChange = (page) => {
    props.onChangePage(page)
  }

  return (
    <div className="pagination-box">
      <Pagination defaultCurrent={current} current={current} total={count} showSizeChanger={false} onChange={onChange} />

      <div className="pagination-seo">
        {
          seoShow && pageList.map((ele, index) => {
            return (
              <Link href={`/?page=${index + 1}`} key={index}><a>{index + 1}</a></Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default PaginationComponent
