const axios = require('axios')
const api = require('../config/api')

function ajax(config) {
  return axios(config)
}

ajax.prototype.get = function (url, params) {
  return axios.get(api[url], params)
}

ajax.prototype.post = function (url, data) {
  return axios.post(api[url], data)
}

module.exports = ajax
