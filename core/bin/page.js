const fs = require('fs')
const core = require('../index')
const utils = require('../utils')
const packageJSON = core.IsInstalled ? require('../../../../../package.json') : require('../../package.json')

function isExistApp(app) {
  return !!(packageJSON.apps || {})[app]
}

module.exports = function (args = []) {
  const [page, local, app] = args
  if (!page || !local) {
    utils.log('缺少 page 和 local 参数', 'error')
    return
  }
  if (app && !isExistApp(app)) {
    utils.log(`子应用 ${app} 不存在`, 'error')
    return;
  }

  const pagePath = utils.join(core.LibPath, 'pages', page + '.vue')
  if (!fs.existsSync(pagePath)) {
    utils.log(`不存在 ${page} 的页面模板`, 'warning')
    return
  }
  const localPath = app
    ? utils.join(core.AppsPath, app, 'views', local + '.vue')
    : utils.join(core.ProjectRootPath, 'src', 'views', local + '.vue')
  if (fs.existsSync(localPath)) {
    utils.log(`当前目录已存在 ${local} 的文件，请更换名称或删除该文件。`, 'warning')
    return
  }
  utils.copyFile(pagePath, localPath)
  utils.log(`页面已经安装成功,位置：${localPath}`, 'success')
}
