/**
 *  jsdoc 配置工厂函数
 *  @author chenhuachun
 */
const utils = require('../utils')
module.exports = function (src, out, readme) {
  return {
    tags: {
      allowUnknownTags: true,
      dictionaries: ['jsdoc', 'closure']
    },
    source: {
      include: [
        utils.resolve(src),
        utils.resolve(readme)
      ],
      includePattern: '\\.(vue|js)$'
    },
    plugins: [
      'plugins/markdown',
      utils.resolve('core/plugins/vue-jsdoc-plugin.js')
    ],
    templates: {
      cleverLinks: false,
      monospaceLinks: false
    },
    opts: {
      destination: utils.resolve(out),
      template: 'core/templates/jsdoc'
    }
  }
}
