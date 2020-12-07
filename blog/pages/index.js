import { Row, Col } from 'antd'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import Author from '../components/Author'
import Project from '../components/Project'
import BlogList from '../components/BlogList'
import { fontSizeAuto, throttle } from '../util/index'
import axios from 'axios'
import api from '../config/api'

const postVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] } },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  },
}

const Home = (props) => {
  const { articleList, route } = props
  return (
    <motion.div initial="initial" animate="enter" exit="exit" className="container index-container">
      <Head>
        <title>MyBlog</title>
      </Head>

      <Header route={route} />

      <div className="page-background"></div>
    </motion.div>
  )
}

export async function getServerSideProps(context) {
  const result = await axios.post(api.getArticleList)
  return {
    props: { articleList: result.data }, // will be passed to the page component as props
  }
}

export default Home
