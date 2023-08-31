/**
 * 开发环境在线切换主题配置，通过改变文件触发热更新实现组件主题刷新
 *
 * @author chenhuachun
 */
const utils = require('../utils')
const core = require('../index')
const fs = require('fs')

/**
 * 更换主题
 * @param theme 主题名称
 */
module.exports = function (theme) {
  if (theme) {
    const content = `@import "../themes/${theme}";`
    utils.writeFile(core.ProjectThemeScssFile, content)
    const elCssFile = utils.join(core.TempPath, 'el-themes', theme, 'index.css')
    const uiCssFile = utils.join(core.TempPath, 'ui-themes', theme, 'index.css')
    let cssContent = ''
    try {
      const elCss = fs.readFileSync(elCssFile, 'utf-8')
      const uiCss = fs.readFileSync(uiCssFile, 'utf-8')
      cssContent = [elCss, uiCss].join('\n')
    } catch (e) {
      utils.log(e, 'error')
    }
    return cssContent

  }
}
