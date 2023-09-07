/* eslint valid-jsdoc: "off" */

'use strict'
const { mysql } = require('./secret')
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/dist'),
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606043519902_395'

  // add your middleware config here
  config.middleware = []

  config.cluster = {
    listen: {
      path: '',
      port: 9002,
      hostname: '0.0.0.0',
    }
  }

  // 连接mysql
  config.mysql = {
    // database configuration
    client: {
      // host
      host: mysql.host,
      // port
      port: mysql.port,
      // username
      user: mysql.user,
      // password
      password: mysql.password,
      // database
      database: mysql.database,
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  // 解决跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
