import 'antd/dist/antd.css'
import '../static/style/common.less'
import { AnimatePresence } from 'framer-motion'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import Layout from '../components/Layout'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} route={router.route} key={router.route} />)
  // return (
  //   // <AnimatePresence exitBeforeEnter>
  //   //   <Component {...pageProps} route={router.route} key={router.route} />
  //   // </AnimatePresence>
  //   <Layout>
  //     <Component {...pageProps} route={router.route} key={router.route} />
  //   </Layout>
  // )
}
