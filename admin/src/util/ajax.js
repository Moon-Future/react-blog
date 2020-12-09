import axios from './axios'
import api from '../config/api'

const ajax = {
  get(url, params) {
    return axios.get(api[url] || url, params)
  },
  post(url, params) {
    return axios.post(api[url] || url, params)
  }
}

export default ajax