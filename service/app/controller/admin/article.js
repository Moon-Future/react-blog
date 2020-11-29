'use strict'
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, '../../../article')
const Controller = require('egg').Controller

class ArticleController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }

  // 获取文章列表
  async getArticle() {
    let result = await this.app.mysql.select('article')
    this.ctx.body = result
  }

  // 新增文章
  async addArticle() {
    const { title, content, summary, coverSrc, tags, flag } = this.ctx.request.body
    const result = await this.app.mysql.get('article', { title })
    if (result) {
      this.ctx.status = 202
      this.ctx.body = {
        message: '文章标题已存在',
      }
    } else {
      const data = {
        id: shortid.generate(),
        user_id: shortid.generate(),
        title,
        summary,
        cover: coverSrc,
        tag: tags.join(','),
        add_time: Date.now(),
        view: 0,
        state: flag ? 1 : 0,
      }
      // 文章内容写入文件
      fs.writeFileSync(path.join(filePath, title + '.md'), content, 'utf-8')
      const result = await this.app.mysql.insert('article', data)
      const insertSuccess = result.affectedRows === 1
      if (!insertSuccess) {
        this.ctx.status = 202
        this.ctx.body = { message: '新增失败，请稍后重试' }
      } else {
        this.ctx.body = { message: '新增成功' }
      }
    }
  }
}

module.exports = ArticleController
