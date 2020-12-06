'use strict'
const Controller = require('egg').Controller

class TagController extends Controller {
  async getTagList() {
    // all 是否获取删除标签
    const { all } = this.ctx.request.body
    const param = all ? {} : { off: 0 }
    const result = await this.app.mysql.select('tag', {
      where: param,
    })
    this.ctx.body = result
  }

  async addTag() {
    const { id, name, color, background } = this.ctx.request.body
    const count = await this.app.mysql.count('tag')
    let request
    if (id) {
      request = await this.app.mysql.update('tag', { id, name, color, background })
    } else {
      request = await this.app.mysql.insert('tag', {
        id: count + 1,
        name,
        color,
        background,
      })
    }
    if (request.affectedRows === 1) {
      this.ctx.body = { message: '成功' }
    } else {
      this.ctx.status = 202
      this.ctx.body = { message: '失败，请稍后重试' }
    }
  }

  async delTag() {
    const { id, off } = this.ctx.request.body
    const request = await this.app.mysql.update('tag', { id, off })
    if (request.affectedRows === 1) {
      this.ctx.body = { message: '成功' }
    } else {
      this.ctx.status = 202
      this.ctx.body = { message: '失败，请稍后重试' }
    }
  }
}

module.exports = TagController
