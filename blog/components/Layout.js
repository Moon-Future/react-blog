import React from 'react'
import Header from '../components/Header'
import ScrollTop from '../components/ScrollTop'
import Footer from '../components/Footer'
import '../static/style/components/layout.less'

const Layout = (props) => {
  const { route } = props

  return (
    <div className="layout-container">

      <Header route={route} />

      { props.top }

      <div className="main-container">
        <div className="main-content">
          { props.main }
        </div>
        <div className="aside-content">
          { props.aside }
        </div>
      </div>

      <Footer />
      <ScrollTop />
    </div>
  )
}

export default Layout
