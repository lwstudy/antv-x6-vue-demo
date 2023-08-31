const fs = require('fs')
const url = require('url')
const isEqual = require('lodash/isEqual')
const _set = require('lodash/set')
// const core = require('../index')
const utils = require('../utils')
const frontMatter = require('./front-matter')
const routesRender = require('../renders/routes')
const routesWrapperRender = require('../renders/routes-wrapper')


const vueFileRegex = /\.vue$/

// const dir = core.ViewsPath


/**
 * 当前目录文件解析元数据缓存
 * 数据示例
 * {'file path': {file:文件路径, name: 文件名, path: 路由路径, parent: 上级路径, vue: 是否vue后缀文件, meta: 标记数据}}
 * @type {FilesMap}
 */
let FilesMap = null

/**
 * 解析函数，把路由配置解析成js代码
 * @param routes
 * @return {*}
 */
function render(routes) {
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
  const content = render([])
  saveFile(content, path)
}


/**
 * 检测文件是否存在
 * @param dir
 * @param file
 * @return {boolean}
 */
function isExistFile(dir, file) {
  return fs.existsSync(utils.join(dir, file))
}


/**
 * 解析文件得到标记信息
 * @param root 目录
 * @param path 文件路径
 * @return {{path: string, parent: string, file: *, meta: *, vue: boolean, name: *}}
 */
function parseFile(root, path) {
  const msg = utils.parsePath(path)
  const absolutePath = utils.join(root, path)
  const info = fs.statSync(absolutePath)
  const isDirectory = info.isDirectory()
  let meta = null
  try {
    meta = frontMatter(absolutePath)
  } catch (e) {
    utils.log(e, 'error')
  }

  return {
    file: path,
    name: msg.base,
    path: url.format(utils.join('/', msg.dir, msg.name)),
    parent: url.format(msg.dir),
    vue: !isDirectory,
    meta: meta
  }
}

/**
 * 采集文件下全部文件的标记信息
 * @param dir
 */
function collectFilesMap(dir) {
  const files = utils.getFiles(dir)
    // 筛选出vue文件
    .filter(file => vueFileRegex.test(file))
    // 取出相对根目录路径
    .map(file => file.replace(dir, ''))
  const result = {}
  files.forEach(file => {
    result[file] = parseFile(dir, file)
  })
  return result
}

/**
 * 递归元数据转化成数组
 * @param data
 * @param parent
 * @return {Array}
 */
function walk(data = {}, parent) {
  const nodes = []
  for (const key in data) {
    const item = data[key]
    if (item.vue) {
      nodes.push(item)
    } else {
      const path = utils.join(parent, key)
      const node = {
        name: key,
        path: path,
        vue: false,
        children: walk(item, path)
      }
      nodes.push(node)
    }
  }
  return nodes

}

/**
 * 元数据转换成树结构
 * @param map
 * @return {Array}
 */
function mapToTree(map) {
  const list = Object.keys(map).map(key => map[key])
  const result = {}
  list.forEach(item => {
    const attrs = item.path.substring(1).split('/')
    _set(result, attrs.join('.'), item)
  })

  return walk(result, '/')
}

/**
 * 分析元数据结构树，得到路由数据
 * @param tree
 * @param name
 * @param path
 * @return {{layout: *, path: string, excludes: *[], name: string, index: *, files: *[], any: *}}
 */
function analyser(tree = [], name = '', path = '/') {
  // 布局文件
  const layout = tree.find(item => item.name === '_layout.vue')
  // 外置 404 文件
  const any = tree.find(item => item.name === '_404.vue')
  // 内置 404 文件
  const innerAny = tree.find(item => item.name === '404.vue')
  // 主页
  const index = tree.find(item => item.name === 'index.vue')
  // 子目录
  const children = tree.filter(item => !!item.children)

  // 不放入二级路由的页面
  const excludes = tree.filter(item => {
    return /^_/.test(item.name) && ![layout, any].includes(item)
  })

  // 纳入路由的其他文件，不包含：布局、404、主页、外置页面
  const files = tree.filter(item => {
    return ![layout, any, index, innerAny].includes(item) && !children.includes(item) && !excludes.includes(item)
  })

  const config = {
    name: name,
    path: path,
    layout,
    index,
    any,
    files,
    excludes,
    innerAny
  }

  // 递归子目录
  if (children.length > 0) {
    config.children = children.map(child => {
      return analyser(child.children, child.name, child.path)
    })
  }

  return config

}

function transformToken(config, context) {
  // 处理主页
  if (config.index) {
    context.push({
      path: config.index.path.replace('/index', '').replace(/\/\$/gi, '/:'),
      component: config.index.path.substring(1),
      meta: utils.stringify(config.index.meta)
    })
  }

  // 处理普通页面
  config.files.forEach(file => {
    context.push({
      path: file.path.replace(/\/\$/gi, '/:'),
      component: file.path.substring(1),
      meta: utils.stringify(file.meta)
    })
  })

  // 处理子目录
  if (config.children) {
    config.children.forEach(child => {
      context = context.concat(transform(child))
    })
  }

  // 处理内置的404
  if (config.innerAny) {
    context.push({
      path: config.innerAny.path.replace('/404', '/*').replace(/\/\$/gi, '/:'),
      component: config.innerAny.path.substring(1),
      meta: utils.stringify(config.innerAny.meta)
    })
  }

  return context
}

/**
 * 路由数据转换成配置信息
 * @param config
 * @return {Array}
 */
function transform(config) {
  let routes = []

  if (config.layout) {

    const route = {
      path: utils.urlFormat(config.path).replace(/\/\$/gi, '/:'),
      component: config.layout.path.substring(1),
      meta: utils.stringify(config.layout.meta),
      children: []
    }

    route.children = transformToken(config, route.children)
    routes.push(route)

    config.excludes.forEach(file => {
      routes.unshift({
        path: file.path.replace(/\/_/gi, '/').replace(/\/\$/gi, '/:'),
        component: file.path.substring(1),
        meta: utils.stringify(file.meta)
      })
    })

  } else {
    config.files = config.files.concat(config.excludes)
    routes = transformToken(config, routes)
  }

  // 处理404页面
  if (config.any) {
    routes.push({
      path: config.any.path.replace('_404', '*'),
      component: config.any.path.substring(1),
      meta: utils.stringify(config.any.meta)
    })
  }


  return routes
}

/**
 * 检查文件的标记是否发生了改变
 * @param file
 * @param message
 * @return {boolean}
 */
function isChange(file, message) {
  const item = FilesMap[file]
  return !isEqual(message, item)
}


/**
 * 生成路由配置
 * @param viewsPath 视图文件夹绝对路径
 * @param outPath 数据路由配置文件路径
 * @param disabled 是否禁用
 */
function build(viewsPath, outPath, disabled = false) {
  // 如果禁用，将还原初始空配置，不做任何处理
  if (disabled) {
    cleanFile(outPath)
    return
  }

  if (!FilesMap) {
    FilesMap = collectFilesMap(viewsPath)
  }
  const tree = mapToTree(FilesMap)
  const config = analyser(tree)
  const routes = transform(config)
  const content = render(routes)
  saveFile(content, outPath)
  utils.log('>>> 更新路由文件', 'success')
}

/**
 * 侦听文件变化做响应处理
 * @param viewsPath 视图文件夹绝对路径
 * @param outPath 数据路由配置文件路径
 * @param disabled 是否禁用
 */
function watch(viewsPath, outPath, disabled = false) {

  build(viewsPath, outPath, disabled)

  if (disabled) return

  if (!FilesMap) {
    FilesMap = collectFilesMap(viewsPath)
  }

  fs.watch(viewsPath, {recursive: true}, (eventType, filename) => {

    const file = '/' + filename
    if (!vueFileRegex.test(file)) {
      return
    }

    // 新增、修改文件
    if (isExistFile(viewsPath, file)) {
      const message = parseFile(viewsPath, file)
      // 标记是否发生了变化
      if (isChange(file, message)) {
        FilesMap[file] = message
        build(viewsPath, outPath, disabled)
      }
    } else {
      // 删除了文件
      delete FilesMap[file]
      build(viewsPath, outPath, disabled)
    }

  })

  utils.log(`watch: ${viewsPath}`, 'success')
}

module.exports = {
  watch,
  build
}



