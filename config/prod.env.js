const fs = require('fs')
const path = require('path')
const version = fs.readFileSync(path.resolve(__dirname, '../.version'), 'utf8').split('=')[1].trim()

module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API: '"https://api-prod"',
  publishBase: `"https://listen-dev-zhujiali.oss-cn-hangzhou.aliyuncs.com/crm/${version}/"`,
  DOMAIN: `"${process.env.DOMAIN}"`
}
