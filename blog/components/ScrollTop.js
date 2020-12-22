import { useState, useEffect } from 'react'
import { Anchor } from 'antd'
import { RocketTwoTone } from '@ant-design/icons'
import '../static/style/components/scrollTop.less'

const { Link } = Anchor

export default function ScrollTop() {
  const [show, setShow] = useState(false)
  const id = 'toTop-abcdefg'

  const click = (e) => {
    e.preventDefault()
  }

  const scrollListen = () => {
    const height = document.documentElement.clientHeight
    if (document.documentElement.scrollTop > height + 300) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListen)
    return () => {
      window.removeEventListener('scroll', scrollListen)
    }
  }, [])

  return (
    <>
      <span id={id} className="scroll-top-target"></span>
      {show ? (
        <Anchor onClick={click} className="scroll-top-anchor">
          <Link className="scroll-top-icon" href={`#${id}`} title={<RocketTwoTone />}></Link>
        </Anchor>
      ) : null}
    </>
  )
}
