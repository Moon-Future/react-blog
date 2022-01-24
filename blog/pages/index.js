import { motion } from 'framer-motion'
import Head from 'next/head'
import PoetrySentence from '../components/PoetrySentence'
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import AsideCard from '../components/AsideCard'
import '../static/style/pages/index.less'
import { createFromIconfontCN } from '@ant-design/icons'
import axios from 'axios'
import { SSRAPI } from '../config/api'

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2220107_frnkhisqosw.js', // 在 iconfont.cn 上生成
})

const sentenceVariants = {
  initial: { scale: 0.96, opacity: 1 },
  exit: {
    scale: 0.6,
    y: -100,
    x: 300,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const Home = (props) => {
  const { articleList, route } = props

  return (
    <motion.div initial="initial" animate="enter" exit="exit" className="container index-container">
      <Head>
        <title>欢迎来到我的世界</title>
      </Head>

      <Layout
        top={
          <div className="page-background" key="ssss111">
            <motion.div className="page-content" initial="initial" animate="enter" exit="exit" variants={sentenceVariants}>
              <span className="blog-desc">沉淀酝酿，厚积薄发</span>
              <PoetrySentence />
            </motion.div>
            <div className="scroll-down">
              <MyIcon type="icon-scroll-down" />
            </div>
          </div>
        }
        main={<BlogList articleList={articleList} />}
        aside={<AsideCard />}
      >
      </Layout>
    </motion.div>
  )
}

export async function getServerSideProps(context) {
  try {
    const result = await axios.post(SSRAPI.getArticleList)
    return {
      props: { articleList: result.data }, // will be passed to the page component as props
    }
  } catch (e) {
    return {
      props: { articleList: [] }, // will be passed to the page component as props
    }
  }
}

export default Home
