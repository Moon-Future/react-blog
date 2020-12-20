'use strict'
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller
const { tokenConfig } = require('../../config/secret')

class UserController extends Controller {
  async register() {
    const { username, password, nickname } = this.ctx.request.body
    const user = await this.app.mysql.get('user', { username })
    if (user) {
      this.ctx.status = 400
      this.ctx.body = { message: '用户已存在' }
      return
    }
    const result = await this.app.mysql.insert('user', {
      id: shortid.generate(),
      username,
      password,
      nickname,
      create_time: Date.now(),
    })
    if (result.affectedRows === 1) {
      this.ctx.body = { message: '注册成功' }
    } else {
      this.ctx.status = 400
      this.ctx.body = { message: '注册失败，请稍后重试' }
    }
  }

  async login() {
    const { username, password } = this.ctx.request.body
    let result = await this.app.mysql.get('user', { username })
    if (!result) {
      this.ctx.status = 400
      this.ctx.body = { message: '用户不存在' }
      return
    }
    result = await this.app.mysql.get('user', { username, password })
    if (!result) {
      this.ctx.status = 400
      this.ctx.body = { message: '账号或密码错误' }
      return
    }
    const userInfo = {
      id: result.id,
      username: result.username,
      nickname: result.nickname,
    }
    const token = jwt.sign(userInfo, tokenConfig.privateKey, { expiresIn: '7d' })
    this.ctx.body = { token: 'Bearer ' + token }
  }

  async checkAuth() {
    const token = this.ctx.header.authorization
    if (!token) {
      this.ctx.body = { status: 0 }
      return
    }
    try {
      const userInfo = jwt.verify(token.split(' ')[1], tokenConfig.privateKey)
      this.ctx.body = { userInfo: userInfo }
    } catch (e) {
      this.ctx.body = { status: 0 }
    }
  }
}

module.exports = UserController
