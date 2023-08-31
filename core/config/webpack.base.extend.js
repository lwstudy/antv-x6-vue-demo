/**
 *  开发环境 和 生产环境的共同webpack配置
 *
 *  @author chenhuachun
 */
const utils = require('../utils')
const HtmlInjectConfigPlugin = require('../plugins/html-inject-config-plugin')
const core = require('../index')
const config = require('../config')()

module.exports = function (chain, theme, app) {
  const entry = app ? `./apps/${app.name}/main.js` : config.entry
  // 修改入口文件
  chain.entry('app')
    .clear()
    .add(entry).end();

  // 不显示文件过大警告
  chain.performance.hints(false)

  // 自动注入注册ElementUI组件代码
  chain.module.rule('vue')
    .use('component-loader')
    .loader(core.ComponentLoaderPath)
    .tap(opt => {
      return {
        ...opt,
        cacheDirectory: utils.join(core.ProjectRootPath, 'node_modules/.cache/vue-loader'),
        theme: theme
      }
    })

  // 增加 ui 别名
  chain.resolve.alias.set('$ui', core.LibPath)

  // 增加 $my 别名
  chain.resolve.alias.set('$my', core.TempPath)

  // 增加 $apps 别名
  chain.resolve.alias.set('$apps', core.AppsPath)

  let configBaseUrl = config.publicPath
  let contentBase = config.extendContentBase || []
  let extraEnv = {}
  if (app) {
    // 是否设置独立的静态配置
    if (app.staticConfig) {
      configBaseUrl = app.publicPath || utils.join(config.publicPath, app.name, '/')
      chain.plugin('HtmlInjectConfigPlugin').use(HtmlInjectConfigPlugin, [configBaseUrl])
    }
    contentBase = app.contentBase || []
    extraEnv = {
      // 子应用不需要 MY_MICRO_APP
      MY_MICRO_APP: JSON.stringify('false'),
      MY_MOCK: JSON.stringify(`${!!app.mock}`)
    }
  } else {
    // 注入配置文件
    if (config.staticConfig) {
      chain.plugin('HtmlInjectConfigPlugin').use(HtmlInjectConfigPlugin, [configBaseUrl])
    }
    extraEnv = {
      MY_MICRO_APP: JSON.stringify(`${!!config.microApp}`),
      MY_MOCK: JSON.stringify(`${!!config.mock}`)
    }

  }

  // 注入环境变量
  chain
    .plugin('define')
    .tap(opt => {
      const env = opt[0]['process.env']
      Object.assign(env, extraEnv)
      opt[0] = {
        'process.env': env
      }
      return opt
    })

  // 扩展复制静态目录
  chain.plugin('copy').tap(opt => {
    const items = contentBase.map(dir => {
      const toPath = utils.join(core.ProjectRootPath, config.outputDir, configBaseUrl)
      return {
        from: utils.join(core.ProjectRootPath, dir),
        to: toPath,
        toType: 'dir',
        ignore: [
          '.DS_Store',
          '.idea'
        ]
      }
    })
    opt[0] = opt[0].concat(items)
    return opt
  })


}
