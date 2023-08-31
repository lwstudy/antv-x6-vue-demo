/**
 *  生产环境编译完成后，复制已编译好的主题样式文件到发布目录
 *
 *  @author chenhuachun
 */

const utils = require('../utils')

class CopyThemeAfterCompiledPlugin {
  constructor (opt = {}) {
    this.options = {
      // 源文件目录
      from: '',
      // 复制到目录
      to: '',
      ...opt
    }
  }
  
  apply (compiler) {
    compiler.hooks.done.tap('copy', () => {
      const o = this.options
      utils.copyFiles(o.from, o.to)
    })
  }
}

module.exports = CopyThemeAfterCompiledPlugin
