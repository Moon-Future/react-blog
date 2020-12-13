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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const height = document.documentElement.clientHeight
      if (document.documentElement.scrollTop > height + 300) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [])

  return (
    <>
      <span id={id} className="scroll-top-target"></span>
      {show ? (
        <Anchor onClick={click}>
          <Link className="scroll-top-icon" href={`#${id}`} title={<RocketTwoTone />}></Link>
        </Anchor>
      ) : null}
    </>
  )
}