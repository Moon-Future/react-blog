import axios from 'axios'
import { message } from 'antd'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // router.replace({
  //   path: '/login',
  //   query: {
  //     redirect: router.currentRoute.fullPath
  //   }
  // })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, message) => {
  // 状态码判断
  switch (status) {
    // 400
    case 400:
      message.error(message)
      break
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token 过期
    // 清除 token 并跳转登录页
    case 403:
      message.error('登录过期，请重新登录', 'error')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      // setTimeout(() => {
      //   toLogin()
      // }, 1000)
      break
    // 404 请求不存在
    case 404:
      message.error('请求的资源不存在', 'error')
      break
    case 500:
      message.error('服务器开小差啦😅', 'error')
      break
    default:
      console.log(message)
  }
}

let instance = axios.create({ timeout: 1000 * 12 })
let CancelToken = axios.CancelToken
let pending = {}
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

function removePending(key, isRequest = false) {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}

instance.interceptors.request.use(
  (config) => {
    // 取消重复请求
    removePending(config.url + '&' + config.method, true)
    config.cancelToken = new CancelToken((c) => {
      pending[config.url + '&' + config.method] = c
    })
    // 每次发送请求之前判断 vuex 中是否存在 token
    // 如果存在，则统一在 http 请求的 header 都加上 token，这样后台根据 token 判断你的登录情况
    // 即使本地存在 token，也有可能 token 是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    removePending(res.config.url + '&' + res.config.method)
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (res.status === 200) {
      res.data.message && message.success(res.data.message)
      return Promise.resolve(res)
    } else if (res.status === 202) {
      // 已接受。已经接受请求，但未处理完成
      res.data.message && message.info(res.data.message)
      return Promise.reject(res)
    } else {
      return Promise.reject(res)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  (error) => {
    const { response } = error
    if (response) {
      removePending(response.config.url + '&' + response.config.method)
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新 state 的 network 状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
    }
  }
)

export default instance
