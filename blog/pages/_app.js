import 'antd/dist/antd.css'
import '../static/style/common.less'
import '../static/style/pages/index.less'
import '../static/style/pages/article.less'
import '../static/style/pages/detailed.less'
import { AnimatePresence } from 'framer-motion'

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} route={router.route} key={router.route} />
    </AnimatePresence>
  )
}
