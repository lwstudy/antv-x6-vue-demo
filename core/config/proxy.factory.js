/**
 * webpack 子应用 代理构建函数
 */
const utils = require('../utils')
const config = require('../config')()

module.exports = function (apps) {
  // 无代理要返回 null，不能返回{}
  let proxy = null
  Object.keys(apps).forEach(name => {
    const item = apps[name]
    proxy = proxy || {}
    proxy[utils.urlFormat(utils.join(config.publicPath, item.name))] = {
      ws: true,
      changeOrigin: true,
      target: `http://localhost:${item.port}`
    }
  })
  return proxy
}
