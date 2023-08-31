/**
 * 编译生产环境主题样式
 *
 * @author chenhuachun
 */
const process = require('child_process')
const {logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils')
const fs = require('fs')
const config = require('../config')()
const utils = require('../utils')
const core = require('../index')


// 获取项目的主题变量文件
const themeConfigFiles = fs.readdirSync(core.ProjectThemeVarPath) || []

// 编译临时存放的目录
const tempDir = core.ProductionThemesCompiledPath

// 编译完成后输出的css目录路径
const compiledCssPath = utils.join(core.BuildThemeDistPath, config.assetsDir, 'css')

// 主题名称数组
const themes = themeConfigFiles.map(item => {
  return item.replace('.scss', '').substring(1)
}).filter(item => item !== 'default')

/**
 * 编译函数
 * @param themes 主题名称数组
 */
function builder(themes, app) {
  if (themes.length === 0) return
  const theme = themes.pop()
  const appLabel = app ? `APP=${app}` : ''
  const cmd = `node ./node_modules/cross-env/src/bin/cross-env.js BUILD_THEME=true THEME=${theme} ${appLabel} node node_modules/@vue/cli-service/bin/vue-cli-service.js build`
  logWithSpinner(`打包生产环境主题【${theme}】`)
  process.exec(cmd, function (err, sto) {
    if (err) {
      utils.log(err, 'error')
      console.log(sto)
      return
    }
    // utils.log(`>>> 生产环境主题【${theme}】打包成功！`, 'success')
    stopSpinner()
    // 存储结果到临时文件夹
    utils.copyFiles(compiledCssPath, tempDir)

    // 删除临时目录
    utils.rm(core.BuildThemeDistPath)
    // 递归
    builder(themes)
  })
}


module.exports = function (app) {
  // 先删除上次编译产生的临时文件
  utils.rm(tempDir)
  utils.rm(core.BuildThemeDistPath)
// 执行编译
  builder(themes, app)
}
