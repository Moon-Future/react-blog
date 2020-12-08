import { Affix } from 'antd'
import '../static/style/components/catalog.scss'

export default function Catalog(props) {
  const { tocify } = props
  return (
    <Affix offsetTop={90}>
      { tocify && tocify.render() }
    </Affix>
  )
}
