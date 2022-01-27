import '../static/style/components/scrollTop.less'
import { useState, useEffect } from 'react'
import { Anchor } from 'antd'
import Catalog from './Catalog'
import { MyIcon, hasClassName, addClassName, removeClassName, debounce } from '../util'

const { Link } = Anchor

export default function ScrollTop(props) {
  const [show, setShow] = useState(false)
  const [otherShow, setOtherShow] = useState(false)
  const [catalogShow, setCatalogShow] = useState(false)
  const [catalogBtnShow, setCatalogBtnShow] = useState(false)
  const { catalogData, route } = props
  const WIDTH = 992

  const click = (e) => {
    e.preventDefault()
  }

  const handleClick = (type) => {
    switch (type) {
      case 'set':
        setOtherShow(!otherShow)
        break
      case 'adjust':
        hasClassName('dark-theme') ? removeClassName('dark-theme') : addClassName('dark-theme')
        break
      case 'catalog':
        setCatalogShow(!catalogShow)
        break
    }
  }

  const scrollListen = () => {
    if (document.documentElement.scrollTop > 200) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const fontSizeAuto = (oriWidth) => {
    return function(){
      var viewportWidth = document.documentElement.clientWidth;
      if(viewportWidth > oriWidth){ viewportWidth = oriWidth; }
      if(viewportWidth < 320){ viewportWidth = 320; }
      document.documentElement.style.fontSize = viewportWidth/oriWidth*100 +'px';	
    }
  }

  const resize = () => {
    const rect = document.body.getBoundingClientRect()
    rect.width - 1 < WIDTH ? addClassName('is-mobile') : removeClassName('is-mobile')
    // 640是原始UI设计大小，也可能是750等等
    fontSizeAuto(750)()
  }

  const resizeListen = debounce(() => {
    resize()
  }, 100)

  useEffect(() => {
    route === '/detailed' ? setCatalogBtnShow(true) : setCatalogBtnShow(false)
    resize()
    window.addEventListener('scroll', scrollListen)
    window.addEventListener('resize', resizeListen)
    return () => {
      window.removeEventListener('scroll', scrollListen)
      window.addEventListener('resize', resizeListen)
    }
  }, [route])

  return (
    <>
      <span id="to-top-xxx" className="scroll-top-target"></span>
      <div className={`mobile-catalog ${catalogShow ? 'mobile-catalog-show' : ''}`}>
        { catalogData ? <Catalog catalogData={catalogData}></Catalog> : '' }
      </div>
      <div className={`setting-container ${show ? 'setting-container-show' : ''}`}>
        {/* <div className={`setting-wrap ${otherShow ? 'setting-wrap-show' : ''}`}>
          <div className="setting-item">{<MyIcon type="icon-read" />}</div>
          <div className="setting-item" onClick={() => handleClick('adjust')}>{<MyIcon type="icon-adjust" />}</div>
          <div className="setting-item">{<MyIcon type="icon-arrows-alt-h" />}</div>
        </div>
        <div className="setting-item setting-set" onClick={() => handleClick('set')}>
          {<MyIcon type="icon-setting" className="setting-set-icon" />}
        </div> */}
        { catalogBtnShow ? (
          <div className="setting-item setting-item-catalog" onClick={() => handleClick('catalog')}>
            <MyIcon type="icon-i-catalog" />
          </div>
        ) : '' }
        <div className="setting-item">
          <Anchor onClick={click} affix={false} showInkInFixed>
            <Link href="#to-top-xxx" title={<MyIcon type="icon-huojian" />} />
          </Anchor>
        </div>
      </div>
    </>
  )
}
