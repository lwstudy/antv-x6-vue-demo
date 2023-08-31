const _ = require('lodash')

/**
 * 路由外层代码
 * @param {object} options 参数数据
 * @param {string} options.content 内容
 */
module.exports = _.template(`
/**
* 该文件由 .my/core/build/routes-builder-plugin.js webpack插件自动生成
*/
export default function ({get}) {
  return <%= content %>
  
}

`)
