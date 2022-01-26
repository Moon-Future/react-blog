'use strict'
const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, '../../article')
const { formatTime } = require('../../utils/index')
const Controller = require('egg').Controller
const { format } = require('path')

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath)
}

// 添加 front-matter，用于 hexo
function writeContent(params) {
  const { title, content, summary, coverImg, topImg, backgroundImg, tagsName, categoriesName, addTime, updTime } = params
  let categoryStr = ''
  let tagStr = ''
  categoriesName.forEach(ele => {
    categoryStr += `\n  - ${ele}`
  })
  tagsName.forEach(ele => {
    tagStr += `\n  - ${ele}`
  })
  const frontMatter =
`---
title: ${title}
date: ${formatTime(addTime || Date.now(), 'yyyy-MM-dd hh:mm:sss')}
description: ${summary}
categories: ${categoryStr}
tags: ${tagStr}
cover: ${coverImg}
top_img: ${topImg}
---

`
  const markdownContent = frontMatter + content
  return markdownContent
}

function formatContent(content) {
  return content.replace(/---(.*?)---/sg, '').trim()
}

function formatData(data, tags, categories) {
  data.forEach((item) => {
    const tagSplit = (item.tag || '').split(',')
    const categorySplit = (item.category || '').split(',')
    const tag = []
    const category = []
    tags.forEach((ele) => {
      if (tagSplit.includes(ele.id + '')) {
        tag.push({ id: ele.id, name: ele.name, color: ele.color, background: ele.background })
      }
    })
    categories.forEach((ele) => {
      if (categorySplit.includes(ele.id + '')) {
        category.push({ id: ele.id, name: ele.name, desc: ele.desc })
      }
    })
    item.tag = tag
    item.category = category
  })
  return data
}

class ArticleController extends Controller {
  // 前端主页数据
  async getHomeData() {
    const { ctx, app } = this
    try {
      const { page = 1, categoryId, tagId } = ctx.request.body
      const pageSize = 10
      const tags = await app.mysql.select('tag')
      const categories = await app.mysql.select('category')
      const recentArticle = await app.mysql.query(`SELECT * FROM article WHERE off != 1 ORDER BY add_time DESC LIMIT ?, ?`, [0, 5])
      let count = 0
      let articleList = []
      if (categoryId) {
        count = await app.mysql.query(`SELECT COUNT(*) as count FROM article WHERE off != 1 AND category LIKE '%${categoryId}%'`)
        articleList = await app.mysql.query(`SELECT * FROM article WHERE off != 1 AND category LIKE '%${categoryId}%' ORDER BY add_time DESC LIMIT ?, ?`, [(page - 1) * pageSize, pageSize])
      } else if (tagId) {
        count = await app.mysql.query(`SELECT COUNT(*) as count FROM article WHERE off != 1 AND tag LIKE '%${tagId}%'`)
        articleList = await app.mysql.query(`SELECT * FROM article WHERE off != 1 AND tag LIKE '%${tagId}%' ORDER BY add_time DESC LIMIT ?, ?`, [(page - 1) * pageSize, pageSize])
      } else {
        count = await app.mysql.query(`SELECT COUNT(*) as count FROM article WHERE off != 1`)
        articleList = await app.mysql.query(`SELECT * FROM article WHERE off != 1 ORDER BY add_time DESC LIMIT ?, ?`, [(page - 1) * pageSize, pageSize])
      }
      articleList = formatData(articleList, tags, categories)
      ctx.body = { articleList, tags, categories, count: count[0].count, recentArticle }
    } catch (e) {
      console.log(e)
      ctx.status = 400
      ctx.body = { message: '/(ㄒoㄒ)/~~ 服务器开小差啦' }
    }
  }

  // 前端主页分页数据
  async getArticleData() {
    const { ctx, app } = this
    try {
      const { page = 1 } = ctx.request.body
      const pageSize = 10
      const tags = await app.mysql.select('tag')
      const categories = await app.mysql.select('category')
      let articleList = await app.mysql.query(`SELECT * FROM article WHERE off != 1 ORDER BY add_time DESC LIMIT ?, ?`, [(page - 1) * pageSize, pageSize])
      articleList = formatData(articleList, tags, categories)
      ctx.body = { articleList }
    } catch (e) {
      ctx.status = 400
      ctx.body = { message: '/(ㄒoㄒ)/~~ 服务器开小差啦' }
    }
  }


  // 获取文章列表
  async getArticleList() {
    const { ctx, app } = this
    try {
      const result = await app.mysql.query('SELECT a.*, b.username, b.nickname FROM article as a, user as b WHERE a.off != 1 AND a.user_id = b.id ORDER BY a.add_time DESC')
      const tagAll = await app.mysql.select('tag')
      const categoryAll = await app.mysql.select('category')
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
      ctx.body = result
    } catch (e) {
      ctx.status = 400
      ctx.body = { message: '/(ㄒoㄒ)/~~ 服务器开小差啦' }
    }
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
      let mdContend = fs.readFileSync(path.join(filePath, result.title + '.md'), 'utf-8')
      result.mdContent = formatContent(mdContend)
      this.ctx.body = result
    } else {
      this.ctx.status = 400
      this.ctx.body = { message: '未找到此文章' }
    }
  }

  // 新增、更新文章
  async addArticle() {
    const { ctx, app } = this
    const conn = await app.mysql.beginTransaction()
    try {
      const { id, title, summary, coverImg, topImg, backgroundImg, tags, categories, flag, addTime, updTime, userId } = ctx.request.body
      const userInfo = ctx.userInfo
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
        const result = await conn.get('article', { id })
        // 非管理员不能更新他人文章
        if (userInfo.id !== result.user_id && !userInfo.root) {
          ctx.status = 403
          ctx.body = { message: '没有权限' }
          return
        }
        const res = await conn.update('article', data)
        const insertSuccess = res.affectedRows === 1
        if (insertSuccess) {
          if (result.title !== title) {
            fs.renameSync(path.join(filePath, result.title + '.md'), path.join(filePath, title + '.md'))
          }
          const markdownContent = writeContent(ctx.request.body)
          fs.writeFileSync(path.join(filePath, title + '.md'), markdownContent, 'utf-8')
          await conn.commit()
          ctx.body = { message: '更新成功' }
        } else {
          await conn.rollback()
          ctx.status = 400
          ctx.body = { message: '更新失败，请稍后重试' }
        }
      } else {
        // 新增
        data.id = shortid.generate()
        data.user_id = userId
        data.view = 0
        const result = await conn.get('article', { title })
        if (result) {
          ctx.status = 400
          ctx.body = {
            message: '文章标题已存在',
          }
        } else {
          const res = await conn.insert('article', data)
          const insertSuccess = res.affectedRows === 1
          if (insertSuccess) {
            // 文章内容写入文件
            const markdownContent = writeContent(ctx.request.body)
            fs.writeFileSync(path.join(filePath, title + '.md'), markdownContent, 'utf-8')
            await conn.commit()
            ctx.body = { message: '新增成功' }
          } else {
            await conn.rollback()
            ctx.status = 400
            ctx.body = { message: '新增失败，请稍后重试' }
          }
        }
      }
    } catch (e) {
      await conn.rollback()
      console.log(e)
      ctx.status = 400
      ctx.body = { message: '服务端出错' }
    }
  }

  async delArticle() {
    const { ctx, app } = this
    const conn = await app.mysql.beginTransaction()
    try {
      const { id } = ctx.request.body
      const userInfo = ctx.userInfo
      const article = await conn.get('article', { id: id }) 
      if (userInfo.id != article.user_id && !userInfo.root) {
        ctx.status = 403
        ctx.body = { message: '没有权限' }
        return
      }
      const request = await conn.update('article', { id, off: 1 })
      if (request.affectedRows === 1) {
        await conn.commit()
        ctx.body = { message: '成功' }
      } else {
        await conn.rollback()
        ctx.status = 400
        ctx.body = { message: '失败，请稍后重试' }
      }
    } catch (e) {
      await conn.rollback()
      console.log(e)
      ctx.status = 400
      ctx.body = { message: '服务端出错' }
    }
  }
}

module.exports = ArticleController
