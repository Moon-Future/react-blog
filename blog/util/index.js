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

