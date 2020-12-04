const HOST = 'http://127.0.0.1:7001'

const API = {
  getArticleList: HOST + '/api/getArticleList',
  getArticle: HOST + '/api/getArticle',
  addArticle: HOST + '/api/addArticle',

  getTagList: HOST + '/api/getTagList',
  addTag: HOST + '/api/addTag',
  delTag: HOST + '/api/delTag'
}

export default API
