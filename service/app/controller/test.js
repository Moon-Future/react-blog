'use strict'
const Controller = require('egg').Controller

class TagController extends Controller {
  async get() {
    this.ctx.body = { message: 'Hello You Got It' }
  }
}

module.exports = TagController
