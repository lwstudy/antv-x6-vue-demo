/**
 * 工程配置
 */
const fs = require('fs')
const utils = require('./utils')
const core = require('./index')
const merge = require('lodash/merge')
const configPath = utils.join(core.ProjectRootPath, 'my.config.js')
let myConfig = null
// 如果项目工程根目录有 my.config.js 文件，即读取配置文件，合并到配置信息
if (!myConfig && fs.existsSync(configPath)) {
  myConfig = core.IsInstalled ? require('../../../../my.config.js') : require('../my.config')
}

let __config__ = {
  /**
   * 部署应用时的基本 URL, VueCli v3.3 改名为 publicPath
   */
  publicPath: '/',

  /**
   * 入口文件
   */
  entry: './src/main.js',

  /**
   * 开发环境端口号
   */
  devServerPort: 8000,

  /**
   * 开发环境代理配置, 不能设置空对象 {}
   */
  devServerProxy: null,

  /**
   * dist 预览服务器端口
   */
  previewServerPort: 7000,

  /**
   * 生成的生产环境构建文件的目录
   */
  outputDir: 'dist',

  /**
   * 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   */
  assetsDir: 'assets',

  /**
   * 扩展的静态资源目录，只对主站有效
   */
  extendContentBase: [],

  /**
   * 强制 eslint-loader 将 lint 错误输出为编译错误
   */
  lintOnSave: 'error',

  /**
   *  开启预加载，页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容
   *
   *  Prefetch 链接将会消耗带宽。
   *  如果你的应用很大且有很多 async chunk，而用户主要使用的是对带宽较敏感的移动端，
   *  那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。
   */
  prefetch: false,

  /**
   * 生产环境打包dll
   */
  dll: ['vue', 'vue-router', 'vuex', 'axios', 'path-to-regexp', 'nprogress'],


  /**
   * 文档开发环境启动端口号
   */
  docsDevPort: 3001,

  /**
   * 文档部署目录
   */
  docsBaseUrl: '/my/',

  /**
   * 文档编译输出目录
   */
  docsOutputDir: 'web',

  /**
   * 自动生成路由表
   */
  autoRoutes: true,

  /**
   * 服务端启动端口号
   */
  serverPort: 7001,

  /**
   * 开启静态配置
   */
  staticConfig: true,

  /**
   * 代码生成器配置
   */
  coder: {
    methodTypeMap: {
      fetch: 'post',
      get: 'get',
      add: 'post',
      update: 'patch',
      remove: 'delete',
      batch: 'post'
    },
    methodSuffixMap: {
      fetch: '/list',
      get: '/:id',
      add: '',
      update: '',
      remove: '/delete/:id',
      batch: '/delete '
    }
  },

  /**
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  transpileDependencies: ['@xdh/my'],

  // 生成环境是否生成SourceMap
  productionSourceMap: false,

  /**
   * 开启模拟数据
   */
  mock: process.env.NODE_ENV !== 'production',

  /**
   * 开启微应用服务
   */
  microApp: false,

  // Webpack自定义配置
  chainWebpack: chain => {
  }
}

__config__ = merge(__config__, myConfig || {})


module.exports = config => {
  if (config) {
    return merge(__config__, config || {})
  }
  return __config__
}
