'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.post('/api/getArticleList', controller.article.getArticleList)
  router.post('/api/getArticle', controller.article.getArticle)
  router.post('/api/addArticle', controller.article.addArticle)

  router.post('/api/getTagList', controller.tag.getTagList)
  router.post('/api/addTag', controller.tag.addTag)
  router.post('/api/delTag', controller.tag.delTag)
}
