/**
 * 生产环境编译, 引入主题文件信息描述的js文件
 *
 */
const fs = require('fs')
const utils = require('../utils')


class InsertThemeScriptInHtmlPlugin {
  constructor(opt) {
    this.options = {

      // 应用名称
      appName: null,

      // 生产环境编译主题时的临时存放目录
      tempDir: '',

      // 主题样式文件的访问路径
      path: '',

      // theme.js文件保存路径
      savePath: '',
      // theme.js 在html的引用路径
      baseUrl: '',

      ...opt
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InsertThemeScriptInHtmlPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('insert', (data, callback) => {
        const themes = {}
        // const tempDir = utils.join(this.options.tempDir, this.options.baseUrl)
        // 目录不存在，不处理
        if (!fs.existsSync(this.options.tempDir)) {
          callback(null, data)
        }
        // 读取主题文件名称
        const themeFiles = fs.readdirSync(this.options.tempDir) || []
        // 无主题文件，不需要创建
        if (themeFiles.length === 0) return

        // 构造主题的访问路径映射
        themeFiles.forEach(file => {
          const name = file.split('-')[0]
          themes[name] = utils.urlFormat(utils.join(this.options.path, file))
        })

        const varName = this.options.appName ? `__MY_THEMES_${this.options.appName}__` : '__MY_THEMES__'
        const content = `(function(global){global.${varName}=${JSON.stringify(themes)}})(window)`
        utils.writeFile(utils.join(this.options.savePath, 'theme.js'), content)
        const file = utils.urlFormat(utils.join(this.options.baseUrl, '/theme.js?t=' + (new Date().getTime())))
        data.assets.js = [file].concat(data.assets.js)
        callback(null, data)
      })
    })
  }
}

module.exports = InsertThemeScriptInHtmlPlugin
