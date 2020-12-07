import 'antd/dist/antd.css'
import '../static/style/common.scss'
import '../static/style/pages/index.scss'
import '../static/style/pages/article.scss'
import '../static/style/pages/detailed.scss'
import '../static/style/components/blogContent.scss'
import { AnimatePresence } from 'framer-motion'

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} route={router.route} key={router.route} />
    </AnimatePresence>
  )
}
