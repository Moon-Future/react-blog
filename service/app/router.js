'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  const adminAuth = app.middleware.adminauth()
  // 前端
  router.post('/api/getHomeData', controller.article.getHomeData)
  router.post('/api/getArticleData', controller.article.getArticleData)
  router.post('/api/getArticleDetailed', controller.article.getArticleDetailed)

  // 后台
  router.post('/api/getArticleList', controller.article.getArticleList)
  router.post('/api/getArticle', controller.article.getArticle)
  router.post('/api/addArticle', adminAuth, controller.article.addArticle)
  router.post('/api/delArticle', adminAuth, controller.article.delArticle)

  router.post('/api/getTagList', controller.tag.getTagList)
  router.post('/api/addTag', adminAuth, controller.tag.addTag)
  router.post('/api/delTag', adminAuth, controller.tag.delTag)

  router.post('/api/getCategoryList', controller.category.getCategoryList)
  router.post('/api/addCategory', adminAuth, controller.category.addCategory)
  router.post('/api/delCategory', adminAuth, controller.category.delCategory)

  router.post('/api/register', controller.user.register)
  router.post('/api/login', controller.user.login)
  router.post('/api/checkAuth', controller.user.checkAuth)

  router.get('/api/test/get', controller.test.get)
}
