// const fs = require('fs')
const core = require('../index')
const utils = require('../utils')
const pathList = require(utils.join(core.LibPath, 'widgets/path.js'))

module.exports = function(args = []) {
  const pathName = args[0]
  if (!pathName || !pathList[pathName]) {
    utils.log('缺少 工具参数 或 没有当前工具', 'error')
    return
  }
  const widgetPath = utils.join(core.LibPath, 'widgets', pathList[pathName]) 

  const localPath = utils.join(core.ProjectRootPath, '.my', 'widgets', pathList[pathName]) 
  
  // console.log(widgetPath, localPath)

  utils.copy(widgetPath, localPath)
  utils.log(`工具已经安装成功,位置：${localPath}`, 'success')
}