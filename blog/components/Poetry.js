import React, { useState, useEffect } from 'react'
import '../static/style/components/poetry.less'

const Poetry = (props) => {
  const { poetry } = props
  const sentence = poetry && poetry.sentence || ''

  return poetry ? (
    <div className="poetry-box comm-box">
      <div className="poetry-content">
        {poetry.origin.content.map((ele, i) => {
          const index = ele.indexOf(sentence)
          return index === -1 ? (
            <p key={i}>{ele}</p>
          ) : (
            <p key={i}>
              {ele.slice(0, index)} <span className="poetry-sel">{ele.slice(index)}</span>
            </p>
          )
        })}
      </div>
      <p className="poetry-author">
        《{poetry.origin.title}》--{poetry.origin.author}/{poetry.origin.dynasty}
      </p>
    </div>
  ) : null
}

export default Poetry
