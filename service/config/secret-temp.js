/**
 * secret.js 模板
 */

module.exports = {
  // mysql 连接配置
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'xxx',
    password: process.env.MYSQL_PASSWORD || 'xxx',
    database: process.env.MYSQL_DATABASE || 'xxxxxx',
  },
  // jwt
  tokenConfig: {
    privateKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
  },
}
