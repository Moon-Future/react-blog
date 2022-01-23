'use strict'
const Controller = require('egg').Controller

class CategoryController extends Controller {
  async getCategoryList() {
    const { all } = this.ctx.request.body
    const param = all ? {} : { off: 0 }
    const result = await this.app.mysql.select('category', {
      where: param,
    })
    this.ctx.body = result
  }

  async addCategory() {
    if (!this.ctx.userInfo.root) {
      this.ctx.status = 403
      this.ctx.body = { message: '没有权限' }
      return
    }
    const { id, name, desc } = this.ctx.request.body
    const count = await this.app.mysql.count('category')
    let request
    if (id) {
      request = await this.app.mysql.update('category', { id, name, desc })
    } else {
      request = await this.app.mysql.insert('category', {
        id: count + 1,
        name,
        desc
      })
    }
    if (request.affectedRows === 1) {
      this.ctx.body = { message: '成功' }
    } else {
      this.ctx.status = 202
      this.ctx.body = { message: '失败，请稍后重试' }
    }
  }

  async delCategory() {
    if (!this.ctx.userInfo.root) {
      this.ctx.status = 403
      this.ctx.body = { message: '没有权限' }
      return
    }
    const { id, off } = this.ctx.request.body
    const request = await this.app.mysql.update('category', { id, off })
    if (request.affectedRows === 1) {
      this.ctx.body = { message: '成功' }
    } else {
      this.ctx.status = 202
      this.ctx.body = { message: '失败，请稍后重试' }
    }
  }
}

module.exports = CategoryController
