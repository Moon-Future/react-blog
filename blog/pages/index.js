import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import PoetrySentence from '../components/PoetrySentence'
import ScrollTop from '../components/ScrollTop'
import '../static/style/pages/index.less'

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
        <motion.div initial="initial" animate="enter" exit="exit" variants={sentenceVariants}>
          <PoetrySentence />
        </motion.div>
      </div>

      <ScrollTop />
    </motion.div>
  )
}

export default Home
