const config = require('./config')()
const utils = require('./utils')
const core = require('./index')
const baseConfig = require('./config/webpack.base.extend')
const devConfig = require('./config/webpack.dev.extend')
const prodConfig = require('./config/webpack.prod.extend')
const proxyFactory = require('./config/proxy.factory')

// 获取子应用信息
const packageJson = core.IsInstalled ? require('../../../../package.json') : require('../package.json')
const apps = packageJson.apps || {}

const THEME = process.env.THEME || 'default'
let publicPath = utils.join('/', config.publicPath)
let outputDir = utils.join(config.outputDir, config.publicPath)
let port = config.devServerPort
let proxy = null
let app = null

if (process.env.APP) {
  const appName = process.env.APP
  app = apps[appName]
  publicPath = app.publicPath ? utils.join('/', app.publicPath) : utils.join(publicPath, app.name)
  outputDir = app.outputDir ? utils.join(outputDir, app.outputDir) : utils.join(outputDir, app.name)
  port = app.port
} else {
  proxy = proxyFactory(apps)
}

if (config.devServerProxy) {
  proxy = Object.assign(proxy || {}, config.devServerProxy)
}

module.exports = {
  // 网站访问路径（部署目录）
  publicPath: utils.urlFormat(publicPath),

  // 输出目录
  outputDir: process.env.BUILD_THEME ? core.BuildThemeDistPath : outputDir,

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: config.assetsDir,

  // 代码检测提示方式
  lintOnSave: config.lintOnSave,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: config.transpileDependencies,

  // 生成环境是否生成SourceMap
  productionSourceMap: !!config.productionSourceMap,
// TODO:runtime-only处理
  runtimeCompiler: true,

  devServer: {
    // 开发环境服务启动端口号
    port: port,
    // API 代理
    proxy: proxy,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: chain => {

    // 公共配置
    baseConfig(chain, THEME, app)

    // 开发环境配置
    if (process.env.NODE_ENV !== 'production') {
      devConfig(chain, THEME, app)
    }

    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      prodConfig(chain, THEME, app)
    }

    // 注入APP名称
    if (app) {
      chain.plugin('define').tap(opt => {
        if (opt[0] && opt[0]['process.env']) {
          opt[0]['process.env'].APP = `"${app.name}"`
        }
        return opt
      })
      chain.output
        .library(`${app.name}-[name]`)
        .filename('assets/js/[name].[hash:8].js')
        .libraryTarget('umd')
        .jsonpFunction(`webpackJsonp_${app.name}`)
    }

    // 加载用户自定义的chainWebpack
    if (config.chainWebpack) {
      config.chainWebpack(chain)
    }
  }
}
