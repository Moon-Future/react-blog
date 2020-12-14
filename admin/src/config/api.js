const HOST = 'http://127.0.0.1:9002'

const API = {
  getArticleList: HOST + '/api/getArticleList',
  getArticle: HOST + '/api/getArticle',
  addArticle: HOST + '/api/addArticle',
  delArticle: HOST + '/api/delArticle',

  getTagList: HOST + '/api/getTagList',
  addTag: HOST + '/api/addTag',
  delTag: HOST + '/api/delTag',

  register: HOST + '/api/register',
  login: HOST + '/api/login'
}

export default API
