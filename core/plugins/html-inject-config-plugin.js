/**
 * 在html文件注入配置文件
 * @author chenhuachun@xdh.net.cn
 *
 * @example
 *
 * new HtmlInjectConfig()
 */


/**
 * @class
 */
class HtmlInjectConfigPlugin {
  /**
   * 构造函数
   */
  constructor(baseUrl = '') {
    this.files = [baseUrl + 'config.js?t=' + (new Date().getTime())]
  }
  
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlInjectConfigPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectConfig', (data, callback) => {
        data.assets.js = this.files.concat(data.assets.js)
        callback(null, data)
      })
    })
  }
}

module.exports = HtmlInjectConfigPlugin
