import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const SSRHOST = `http://${publicRuntimeConfig.HOST}:9002`
const HOST = `http://localhost:9002`

export const SSRAPI = {
  getArticleList: SSRHOST + '/api/getArticleList',
  getArticle: SSRHOST + '/api/getArticle',
}

export const API = {
  getArticleList: HOST + '/api/getArticleList',
  getArticle: HOST + '/api/getArticle',
}
