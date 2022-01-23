import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import PoetrySentence from '../components/PoetrySentence'
import ScrollTop from '../components/ScrollTop'
import '../static/style/pages/index.less'
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons'

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
  const { route } = props

  return (
    <motion.div initial="initial" animate="enter" exit="exit" className="container index-container">
      <Head>
        <title>欢迎来到我的世界</title>
      </Head>

      <Header route={route} />

      <div className="page-background">
        <motion.div className="page-content" initial="initial" animate="enter" exit="exit" variants={sentenceVariants}>
          <span className="blog-desc">沉淀酝酿，厚积薄发</span>
          <PoetrySentence />
        </motion.div>
        <div className="scroll-down">
          <MyIcon type="icon-scroll-down" />
        </div>
      </div>

      <div className="main-content">
        222
      </div>

      <ScrollTop />
    </motion.div>
  )
}

export default Home
