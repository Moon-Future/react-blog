import { useState, useEffect } from 'react'
import { RedoOutlined } from '@ant-design/icons'
import { getPoetry, formatTime } from '../util/index'

const PoetrySentence = (props) => {
  const [sentence, setSentence] = useState('')
  const [finished, setFinished] = useState(false)
  const [words, setWords] = useState(null)
  const { staticFlag, handlePoetry } = props // 是否静态展示

  useEffect(async () => {
    let timer
    if (words) {
      if (words.length) {
        timer = setTimeout(() => {
          setWords(words)
          setSentence(sentence + words.shift())
        }, 150)
      } else {
        setFinished(true)
      }
    } else {
      let tmp = await todayPoetry()
      if (staticFlag) {
        setFinished(true)
        setSentence(tmp.join(''))
      } else {
        setWords(tmp)
        setSentence(tmp.shift())
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [sentence])

  const todayPoetry = () => {
    return new Promise((resolve) => {
      const now = formatTime(Date.now(), 'yyyy-MM-dd')
      let poetry = localStorage.getItem('poetry')
      if (poetry) {
        poetry = JSON.parse(poetry)
        if (poetry.time === now) {
          handlePoetry && handlePoetry(poetry)
          resolve(poetry.sentence.split(''))
          return
        }
      }
      getPoetry.load((result) => {
        poetry = {
          time: now,
          sentence: result.data.content,
          origin: {
            title: result.data.origin.title,
            author: result.data.origin.author,
            dynasty: result.data.origin.dynasty,
            content: result.data.origin.content,
          },
        }
        handlePoetry && handlePoetry(poetry)
        localStorage.setItem('poetry', JSON.stringify(poetry))
        resolve(poetry.sentence.split(''))
      })
    })
  }

  const refresh = () => {
    getPoetry.load((result) => {
      const poetry = {
        time: formatTime(Date.now(), 'yyyy-MM-dd'),
        sentence: result.data.content,
        origin: {
          title: result.data.origin.title,
          author: result.data.origin.author,
          dynasty: result.data.origin.dynasty,
          content: result.data.origin.content,
        },
      }
      handlePoetry && handlePoetry(poetry)
      localStorage.setItem('poetry', JSON.stringify(poetry))
      if (staticFlag) {
        setSentence(poetry.sentence)
      } else {
        setFinished(false)
        setWords(null)
        setSentence('')
      }
    })
  }

  return (
    <p className="poetry-sentence">
      {sentence}
      {finished ? <RedoOutlined style={{ fontSize: '14px' }} onClick={() => refresh()} /> : null}
      <span style={{ visibility: finished ? 'hidden' : '' }}>|</span>
    </p>
  )
}

export default PoetrySentence
