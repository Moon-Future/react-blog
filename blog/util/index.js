export function formatTime(date, format) {
  if (!date) return ''
  date = typeof date === 'number' ? new Date(date) : date
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function fontSizeAuto(oriWidth) {
  return function () {
    let viewportWidth = document.documentElement.clientWidth
    if (viewportWidth > oriWidth) {
      viewportWidth = oriWidth
    }
    if (viewportWidth < 320) {
      viewportWidth = 320
    }
    document.documentElement.style.fontSize = viewportWidth / (oriWidth / 100) + 'px'
  }
}

export function throttle(fn, wait) {
  let previous = 0
  return function () {
    const context = this
    const arg = arguments
    const now = Date.now()
    if (now - previous > wait) {
      fn.apply(context, arg)
      previous = now
    }
  }
}

// 获取今日诗词
export const getPoetry = {
  keyName: 'jinrishici-token',
  load(callback, errHandler) {
    if (window.localStorage && window.localStorage.getItem(this.keyName)) {
      return this.commonLoad(callback, errHandler, window.localStorage.getItem(this.keyName))
    } else {
      return this.corsLoad(callback, errHandler)
    }
  },
  corsLoad(callback, errHandler) {
    const newCallBack = (result) => {
      window.localStorage.setItem(this.keyName, result.token)
      callback(result)
    }
    return this.sendRequest(newCallBack, errHandler, 'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2')
  },
  commonLoad(callback, errHandler, token) {
    return this.sendRequest(
      callback,
      errHandler,
      'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=' + encodeURIComponent(token)
    )
  },

  sendRequest(callback, errHandler, apiUrl) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', apiUrl)
    xhr.withCredentials = true
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText)
        if (data.status === 'success') {
          callback(data)
        } else {
          if (errHandler) {
            errHandler(data)
          } else {
            console.error('今日诗词API加载失败，错误原因：' + data.errMessage)
          }
        }
      }
    }
  },
}

// 随机数

export const getRandomNumberByRange = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start)
}

export const hasClassName = (name, dom = document.body) => {
  const className = dom.className
  const classNameList = className.split(' ')
  return classNameList.includes(name)
}

export const addClassName = (name, dom = document.body) => {
  const className = document.body.className
  const classNameList = className.split(' ')
  if (classNameList.includes(name)) return
  classNameList.push(name)
  document.body.className = classNameList.join(' ')
}

export const removeClassName = (name, dom = document.body) => {
  const className = document.body.className
  const classNameList = className.split(' ')
  if (!classNameList.includes(name)) return
  classNameList.splice(classNameList.indexOf(name), 1)
  document.body.className = classNameList.join(' ')
}

export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


import { createFromIconfontCN } from '@ant-design/icons'
export const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2220107_m0hciglnvh.js', // 在 iconfont.cn 上生成
})