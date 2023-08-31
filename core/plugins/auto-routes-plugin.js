/**
 * 根据views目录，自动生成路由表 Webpack 插件
 *
 * @author chenhuachun
 */

const utils = require('../utils')
const builder = require('../build/routes')
const routesRender = require('../renders/routes')
const routesWrapperRender = require('../renders/routes-wrapper')

/**
 * 解析函数，把路由配置解析成js代码
 * @param routes
 * @return {*}
 */
function parse(routes) {
  const content = routesRender({
    items: routes,
    render: routesRender
  })
  const wrapper = routesWrapperRender({
    content: content
  })
  return utils.beautifyJs(wrapper)
}

/**
 * 写入路由代码文件
 * @param content 内容
 * @param path 保存位置
 */
function saveFile(content, path) {
  utils.writeFile(path, content)
}

/**
 * 还原文件默认内容
 * @param path
 */
function cleanFile(path) {
  const content = parse([])
  saveFile(content, path)
}

/**
 * 自动生成路由表 webpack插件
 */
class AutoRoutesPlugin {
  
  constructor(options) {
    this.options = {
      // 是否禁用
      disabled: false,
      
      // 生成的路由表文件路径，包括文件名
      routes: './routes.js',
      
      // views的目录位置
      views: './src/views',
      
      // 开启 FrontMatter
      enableFrontMatter: false,
      
      ...(options || {})
    }
    this.cache = ''
    // views目录路径
    this.views = this.options.views
    
    this.enableFrontMatter = this.options.enableFrontMatter
    
    // 禁用插件时，重置路由文件
    if (this.options.disabled) {
      cleanFile(this.options.routes)
    }
  }
  
  apply(compiler) {
    compiler.hooks.beforeCompile.tap('RoutesBuilderPlugin', () => {
      if (this.options.disabled) return
      const content = parse(builder(this.views))
      if (this.cache !== content) {
        this.cache = content
        saveFile(content, this.options.routes)
      }
      
    })
    
  }
}

module.exports = AutoRoutesPlugin
