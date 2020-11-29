module.exports = (app) => {
  const { router, controller } = app
  router.get('/admin/getArticle', controller.admin.article.getArticle)
  router.post('/admin/addArticle', controller.admin.article.addArticle)
  router.get('/admin/index', controller.admin.article.index)
}
