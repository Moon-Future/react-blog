'use strict'
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, '../../article')
const Controller = require('egg').Controller

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath)
}

class ArticleController extends Controller {
  // 获取文章列表
  async getArticleList() {
    const result = await this.app.mysql.select('article')
    const tagAll = await this.app.mysql.select('tag')
    result.forEach(item => {
      const tagSplit = item.tag.split(',')
      const tag = []
      tagAll.forEach(ele => {
        if (tagSplit.includes(ele.id + '')) {
          tag.push({ id: ele.id, name: ele.name })
        }
      })
      item.tag = tag
    })
    this.ctx.body = result
  }

  async getArticle() {
    // allTag 是否获取全部标签，新增文章时需要全部和已选
    const { id, allTag } = this.ctx.request.body
    const result = await this.app.mysql.get('article', { id: id })
    if (result) {
      const tagSplit = result.tag.split(',')
      const tag = []
      const tagAll = await this.app.mysql.select('tag', {
        where: { off: 0 }
      })
      tagAll.forEach(ele => {
        const obj = { id: ele.id, name: ele.name }
        if (tagSplit.includes(ele.id + '')) {
          if (allTag) {
            obj.selected = true
          }
          tag.push(obj)
        } else if (allTag) {
          tag.push(obj)
        }
      })
      result.tag = tag
      result.mdContent = fs.readFileSync(path.join(filePath, result.title + '.md'), 'utf-8')
      this.ctx.body = result
    } else {
      this.ctx.status = 202
      this.ctx.body = { message: '未找到此文章' }
    }
  }

  // 新增、更新文章
  async addArticle() {
    const { id, title, content, summary, coverSrc, tags, flag, addTime, updTime } = this.ctx.request.body
    const data = {
      title,
      summary,
      cover: coverSrc,
      tag: tags.join(','),
      add_time: addTime || Date.now(),
      state: flag ? 1 : 0,
    }
    if (id) {
      // 更新
      data.id = id
      data.upd_time = updTime || Date.now()
      const result = await this.app.mysql.get('article', { id })
      const res = await this.app.mysql.update('article', data)
      const insertSuccess = res.affectedRows === 1
      if (insertSuccess) {
        if (result.title !== title) {
          fs.renameSync(path.join(filePath, result.title + '.md'), path.join(filePath, title + '.md'))
        }
        fs.writeFileSync(path.join(filePath, title + '.md'), content, 'utf-8')
        this.ctx.body = { message: '更新成功' }
      } else {
        this.ctx.status = 202
        this.ctx.body = { message: '更新失败，请稍后重试' }
      }
    } else {
      // 新增
      data.id = shortid.generate()
      data.user_id = shortid.generate()
      data.view = 0
      const result = await this.app.mysql.get('article', { title })
      if (result) {
        this.ctx.status = 202
        this.ctx.body = {
          message: '文章标题已存在',
        }
      } else {
        const res = await this.app.mysql.insert('article', data)
        const insertSuccess = res.affectedRows === 1
        if (insertSuccess) {
          // 文章内容写入文件
          fs.writeFileSync(path.join(filePath, title + '.md'), content, 'utf-8')
          this.ctx.body = { message: '新增成功' }
        } else {
          this.ctx.status = 202
          this.ctx.body = { message: '新增失败，请稍后重试' }
        }
      }
    }
  }
}

module.exports = ArticleController
