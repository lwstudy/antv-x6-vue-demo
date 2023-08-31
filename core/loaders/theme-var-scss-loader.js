/**
 * 主题样式变量文件更换 webpack loader
 * @author chenhuachun
 */

const utils = require('../utils')
module.exports = function (source) {
  const vars = `@import "${utils.urlFormat(this.query.vars)}";\n`
  return vars + source
}
