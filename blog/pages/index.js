import React from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import PoetrySentence from '../components/PoetrySentence'

const sentenceVariants = {
  initial: { scale: 0.96, opacity: 1 },
  exit: {
    scale: 0.6,
    y: -100,
    x: 300,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      poetry: {},
      sentence: '',
      finish: false,
    }
  }

  render() {
    const { route } = this.props
    return (
      <motion.div initial="initial" animate="enter" exit="exit" className="container index-container">
        <Head>
          <title>MyBlog</title>
        </Head>

        <Header route={route} />

        <div className="page-background">
          <motion.div initial="initial" animate="enter" exit="exit" variants={sentenceVariants} >
            <PoetrySentence />
          </motion.div>
        </div>
      </motion.div>
    )
  }
}
