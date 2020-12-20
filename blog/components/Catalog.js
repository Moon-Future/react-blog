import { Anchor } from 'antd'
import '../static/style/components/catalog.less'
const { Link } = Anchor

export default function Catalog(props) {
  const { catalogData } = props
  const items = []
  const data = catalogData.slice()
  for (let i = 0, len = data.length; i < len; i++) {
    let item = data[i]
    if (items.length === 0) {
      items.push(item)
    } else {
      let lastItem = items[items.length - 1]

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 4; i++) {
          const { children } = lastItem
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item]
            break
          }

          lastItem = children[children.length - 1] // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item)
            break
          }
        }
      } else {
        // 置于最顶级
        items.push(item)
      }
    }
  }

  let obj = {}
  const render = (data) => {
    return data.map((ele) => {
      if (obj[ele.anchor]) {
        return null
      } else {
        obj[ele.anchor] = true
        return (
          <Link key={`${ele.anchor}`} href={`#${ele.anchor}`} title={ele.text}>
            {ele.children && render(ele.children)}
          </Link>
        )
      }
    })
  }

  const click = (e) => {
    e.preventDefault()
  }

  return (
    <Anchor targetOffset={90} onClick={click}>
      {render(items)}
    </Anchor>
  )
}
