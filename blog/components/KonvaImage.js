import React, { useEffect, useState } from 'react'
import Konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
const URLImage = ({ src, hue, saturation, width, height }) => {
  const [image] = useImage(src, 'Anonymous')
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (image) {
      ref.current.cache()
    }
  }, [image])

  return <Image image={image} width={1903} height={639} ref={ref} hue={hue} saturation={saturation} filters={[Konva.Filters.HSL]} />
}

// const KonvaImage = (porps) => {
//   const [hue, setHue] = useState(0)
//   const [flag, setFlag] = useState(true)

//   // useEffect(() => {
//   //   let timer = setInterval(() => {
//   //     console.log('xxx', hue)

//   //     setHue((hue) => hue - 20)
//   //     if (flag && hue <= 150) {
//   //       console.log('xxx1')
//   //       let tmp = hue + 50
//   //       if (tmp >= 150) {
//   //         setFlag(false)
//   //       }
//   //       setHue((hue) => hue + 50)
//   //     }
//   //     if (!flag && hue >= 0) {
//   //       console.log('xxx2')
//   //       let tmp = hue - 50
//   //       if (tmp <= 0) {
//   //         setFlag(true)
//   //       }
//   //       setHue((hue) => hue - 50)
//   //     }
//   //   }, 1000)

//   //   return () => clearInterval(timer)
//   // }, [hue])

//   return (
//     // Stage - is a div wrapper
//     // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
//     // Rect and Circle are not DOM elements. They are 2d shapes on canvas
//     <Stage width={1300} height={768}>
//       <Layer>
//         <URLImage src={porps.src} hue={hue} saturation={0} />
//       </Layer>
//     </Stage>
//   )
// }

class KonvaImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hue: 0,
      saturation: 0,
    }
  }

  componentDidMount() {
    this.flag = true
    this.timer = setInterval(() => {
      let hue = this.state.hue
      if (this.flag && hue <= 150) {
        hue += 30
        if (hue > 150) {
          this.flag = false
        }
        this.setState({ hue, saturation: 1 })
      } else if (!this.flag && hue >= 0) {
        hue -= 30
        if (hue < 0) {
          this.flag = true
        }
        this.setState({ hue, saturation: 0 })
      }
    }, 500)

    console.log('xxx', document, document.documentElement.clientWidth, document.documentElement.clientHeight)
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
  }

  render() {
    return (
      // Stage - is a div wrapper
      // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
      // Rect and Circle are not DOM elements. They are 2d shapes on canvas
      <Stage width={this.width} height={this.height}>
        <Layer>
          <URLImage src={this.props.src} hue={this.state.hue} saturation={0} width={this.width} height={this.height} />
        </Layer>
      </Stage>
    )
  }
}

export default KonvaImage
