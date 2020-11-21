import Head from 'next/head'
import Header from '../components/Header'
import '../static/style/pages/index.css'

const Home = () => (
  <div className="container">
    <Head>
      <title>MyBlog</title>
    </Head>

    <Header />
  </div>
)

export default Home
