const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
module.exports = () =>
  withLess({
    ...withCSS(),
    // 改为 nginx 代理
    publicRuntimeConfig: {
      HOST: process.env.HOST || 'localhost',
    },
  })
