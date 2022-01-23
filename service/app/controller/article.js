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
    const result = await this.app.mysql.query('SELECT a.*, b.username, b.nickname FROM article as a, user as b WHERE a.off != 1 AND a.user_id = b.id ORDER BY a.add_time DESC')
    const tagAll = await this.app.mysql.select('tag')
    const categoryAll = await this.app.mysql.select('category')
    result.forEach((item) => {
      const tagSplit = (item.tag || '').split(',')
      const categorySplit = (item.category || '').split(',')
      const tag = []
      const category = []
      tagAll.forEach((ele) => {
        if (tagSplit.includes(ele.id + '')) {
          tag.push({ id: ele.id, name: ele.name, color: ele.color, background: ele.background })
        }
      })
      categoryAll.forEach((ele) => {
        if (categorySplit.includes(ele.id + '')) {
          category.push({ id: ele.id, name: ele.name, desc: ele.desc })
        }
      })
      item.tag = tag
      item.category = category
    })
    this.ctx.body = result
  }

  async getArticle() {
    // edit 是否获取全部标签，新增文章时需要全部和已选
    const { id, edit } = this.ctx.request.body
    const result = (await this.app.mysql.query('SELECT a.*, b.username, b.nickname FROM article as a, user as b WHERE a.id = ? AND a.user_id = b.id', [id]))[0]
    if (result) {
      // 新增阅读量
      edit ? null : await this.app.mysql.update('article', { id: id, view: result.view + 1 })
      const tagSplit = (result.tag || '').split(',')
      const categorySplit = (result.category || '').split(',')
      const tag = []
      const category = []
      const tagAll = await this.app.mysql.select('tag', {
        where: { off: 0 },
      })
      const categoryAll = await this.app.mysql.select('category', {
        where: { off: 0 },
      })
      // 更新文章，从所有标签中筛选已选标签
      tagAll.forEach((ele) => {
        const obj = { id: ele.id, name: ele.name, color: ele.color, background: ele.background }
        if (tagSplit.includes(ele.id + '')) {
          if (edit) {
            obj.selected = true
          }
          tag.push(obj)
        } else if (edit) {
          tag.push(obj)
        }
      })
      categoryAll.forEach((ele) => {
        const obj = { id: ele.id, name: ele.name, desc: ele.desc }
        if (categorySplit.includes(ele.id + '')) {
          if (edit) {
            obj.selected = true
          }
          category.push(obj)
        } else if (edit) {
          category.push(obj)
        }
      })
      result.tag = tag
      result.category = category
      result.mdContent = fs.readFileSync(path.join(filePath, result.title + '.md'), 'utf-8')
      this.ctx.body = result
    } else {
      this.ctx.status = 400
      this.ctx.body = { message: '未找到此文章' }
    }
  }

  // 新增、更新文章
  async addArticle() {
    const { id, title, content, summary, coverImg, topImg, backgroundImg, tags, categories, flag, addTime, updTime, userId } = this.ctx.request.body
    const userInfo = this.ctx.userInfo
    const data = {
      title,
      summary,
      cover: coverImg,
      topImg,
      backgroundImg,
      tag: tags.join(','),
      category: categories.join(','),
      add_time: addTime || Date.now(),
      state: userInfo.root ? (flag ? 1 : 0) : 0,
    }
    if (id) {
      // 更新
      data.id = id
      data.upd_time = updTime
      const result = await this.app.mysql.get('article', { id })
      // 非管理员不能更新他人文章
      if (userInfo.id !== result.user_id && !userInfo.root) {
        this.ctx.status = 403
        this.ctx.body = { message: '没有权限' }
        return
      }
      const res = await this.app.mysql.update('article', data)
      const insertSuccess = res.affectedRows === 1
      if (insertSuccess) {
        if (result.title !== title) {
          fs.renameSync(path.join(filePath, result.title + '.md'), path.join(filePath, title + '.md'))
        }
        fs.writeFileSync(path.join(filePath, title + '.md'), content, 'utf-8')
        this.ctx.body = { message: '更新成功' }
      } else {
        this.ctx.status = 400
        this.ctx.body = { message: '更新失败，请稍后重试' }
      }
    } else {
      // 新增
      data.id = shortid.generate()
      data.user_id = userId
      data.view = 0
      const result = await this.app.mysql.get('article', { title })
      if (result) {
        this.ctx.status = 400
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
          this.ctx.status = 400
          this.ctx.body = { message: '新增失败，请稍后重试' }
        }
      }
    }
  }

  async delArticle() {
    const { id } = this.ctx.request.body
    const userInfo = this.ctx.userInfo
    const article = await this.app.mysql.get('article', { id: id }) 
    if (userInfo.id != article.user_id && !userInfo.root) {
      this.ctx.status = 403
      this.ctx.body = { message: '没有权限' }
      return
    }
    const request = await this.app.mysql.update('article', { id, off: 1 })
    if (request.affectedRows === 1) {
      this.ctx.body = { message: '成功' }
    } else {
      this.ctx.status = 400
      this.ctx.body = { message: '失败，请稍后重试' }
    }
  }
}

module.exports = ArticleController
