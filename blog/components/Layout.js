import '../static/style/components/layout.less'
import Head from 'next/head'
import Header from '../components/Header'
import PoetrySentence from '../components/PoetrySentence'
import ScrollTop from '../components/ScrollTop'
import Footer from '../components/Footer'
import { MyIcon } from '../util'

const Layout = (props) => {
  const { route, pageDesc, homeFlag, catalogData } = props
  const children = Array.isArray(props.children) ? props.children : [props.children]
  const components = {}
  children.forEach((ele) => {
    components[ele.key] = ele
  })

  return (
    <>
      <Head>
        <title>欢迎来到我的世界</title>
      </Head>
      <div className="layout-container">
        <Header route={route} />

        {
          components.top ? components.top : (
            <div className="page-background" style={{height: homeFlag ? '100vh' : '400px'}}>
            <div className="page-content">
              <span className="blog-desc">{ pageDesc || '沉淀酝酿，厚积薄发' }</span>
              {homeFlag && <PoetrySentence />}
            </div>
            {
              homeFlag && (
                <div className="scroll-down">
                  <MyIcon type="icon-scroll-down" />
                </div>
              )
            }
          </div>
          )
        }

        <div className="main-container">
          <div className="main-content">
            {components.main}
            {components.pagination}
          </div>
          <div className="aside-content">{components.aside}</div>
        </div>

        <Footer />
        <ScrollTop catalogData={catalogData} />
      </div>
    </>
  )
}

export default Layout
