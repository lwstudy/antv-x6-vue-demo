/**
 * http 静态文件服务器创建方法
 *
 * @author chenhuachun
 */
const express = require('express')
const opn = require('opn')
const bodyParser = require('body-parser')
const utils = require('../utils')

/**
 * 设置通用响应头
 * @param req
 * @param res
 */
function setHeaders(req, res) {
  res.set({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': req.get('Origin') || '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUSH,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE'
  })
}

/**
 * 创建服务器函数
 * @param {Object} options 参数选项
 * @param {number} options.port 服务启动端口号
 * @param {string} options.root 文件系统根目录路径
 * @param {string} options.path 浏览器打开后访问目录路径
 * @param {boolean} options.open 是否自动打开浏览器
 * @param {object[]} routes 路由配置 {path, type, handler}
 * @return {{app, server}}
 */
function createHttpServer({port, root, path, routes, open}) {
  const app = express()
  
  // 设置静态目录
  if (root) {
    app.use('/', express.static(root))
  }
  
  // 参数转换成json格式
  app.use(bodyParser.json())
  
  // 通用响应头设置
  app.use(function (req, res, next) {
    setHeaders(req, res)
    next()
  })
  
  routes = routes || []
  // 设置接口路由
  routes.forEach(({path, type, handler}) => {
    app[type || 'get'](path, handler)
  })
  
  // 处理跨域
  app.options('/*', (req, res) => {
    res.send(null)
  })
  
  // 启动http服务
  const server = app.listen(port, function (err) {
    
    if (err) utils.log(err, 'error')
    
    const port = server.address().port
    const host = `http://127.0.0.1:${port}`
    const url = host + utils.join('/', path || '')
    
    utils.log(`http server listening at ${host}`, 'success')
    
    // 打开浏览器
    opn && opn(url)
    
  })
  return {
    app,
    server
  }
}

module.exports = createHttpServer
