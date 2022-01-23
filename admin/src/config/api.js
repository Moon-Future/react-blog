const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:9002' : ''

const API = {
  getArticleList: HOST + '/api/getArticleList',
  getArticle: HOST + '/api/getArticle',
  addArticle: HOST + '/api/addArticle',
  delArticle: HOST + '/api/delArticle',

  getTagList: HOST + '/api/getTagList',
  addTag: HOST + '/api/addTag',
  delTag: HOST + '/api/delTag',

  getCategoryList: HOST + '/api/getCategoryList',
  addCategory: HOST + '/api/addCategory',
  delCategory: HOST + '/api/delCategory',

  register: HOST + '/api/register',
  login: HOST + '/api/login',

  checkAuth: HOST + '/api/checkAuth',
}

export default API
