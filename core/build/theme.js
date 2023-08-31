/**
 * 主题预编译, 把Element 和 UI 主题scss 预先编译成css, 提高运行时编译效率
 *
 * @author chenhuachun
 *
 */

const fs = require('fs')
const webpack = require('webpack')
const {logWithSpinner, stopSpinner} = require('@vue/cli-shared-utils')
const utils = require('../utils')
const core = require('../index')

// webpack config 创建函数
const configFactory = require('../config/webpack.theme.factory')


/**
 * 获取本地的主题配置文件
 * @return {{file: *, name: *}[]}
 */
function getLocalVarFiles() {
  const path = core.ProjectThemeVarPath
  const dirs = fs.readdirSync(path) || []
  return dirs.map(item => {
    return {
      file: item,
      name: utils.kebabCase(item.replace('.scss', ''))
    }
  })
}

/**
 * 获取主题编译后存放位置
 * @param type
 * @return {string}
 */
function getSavePath(type) {
  return type === 'el' ? core.OutputElementThemePath : core.OutputUIThemePath
}

/**
 * 获取样式源码目录
 * @param type
 * @return {string}
 */
function getSrcPath(type) {
  return type === 'el' ? core.ElementThemeSrcPath : core.UIThemeSrcPath
}

/**
 * 创建入口文件js文件，并写入scss引用， webpack4入口文件必须要js文件
 * @param type 框架类型了 ，el 或 ui
 * @param entryDir 入口文件存放目录
 * @return {*[]}
 */
function createEntryFile(type, entryDir) {
  const themeSrcDir = getSrcPath(type)
  if (!fs.existsSync(themeSrcDir)) {
    utils.log(`${themeSrcDir} 目录不存在`, 'error')
    return []
  }
  const files = (fs.readdirSync(themeSrcDir) || [])
    .filter(item => item.includes('.scss'))

  files.forEach(item => {
    const msg = utils.parsePath(item)
    const content = type === 'el'
      ? `import 'element-ui/packages/theme-chalk/src/${msg.base}'`
      : `import '${utils.urlFormat(utils.join(core.LibPath, 'styles', msg.base))}'`;

    utils.writeFile(`${entryDir}/${msg.base.replace('.scss', '.js')}`, content, 'utf-8')
  })
  return files
}

/**
 * 构建入口的配置信息
 * @param files 入口文件名数组
 * @param entryDir 入口文件目录
 */
function getEntry(files, entryDir) {
  const entry = {}
  files.forEach(file => {
    const name = file.replace('.scss', '')
    entry[name] = utils.join(entryDir, name + '.js')
  })
  return entry
}

/**
 * 清理无用的文件
 * @param {string} type 框架类型了 ，el 或 ui
 * @param {object} theme 主题描述对象
 * @param {string} entryDir
 */
function clean(type, theme, entryDir) {
  const savePath = getSavePath(type)
  const buildDir = utils.join(savePath, theme.name, 'build')
  utils.rm(entryDir)
  utils.rm(buildDir)
}

function filesWriteToIndex() {
  const dir = utils.join(core.LibPath, 'styles')
  const files = fs.readdirSync(dir) || []
  const scss = files.filter(f => (f.includes('.scss') && f !== 'index.scss'))
  const content = scss.map(f => {
    return `@import "${f}";`
  })
  fs.writeFileSync(utils.join(dir, 'index.scss'), content.join('\n'), 'utf-8')
}


/**
 * 编译函数
 * @param type
 * @param themes
 * @param entryDir
 * @param callback
 */
function build(type, themes, entryDir, callback) {
  const theme = themes.pop()
  // utils.log(`正在编译${type === 'el' ? 'Element' : 'UI'}主题【${theme.name}】...`)
  logWithSpinner(`编译${type === 'el' ? 'Element' : 'UI'}主题【${theme.name}】`)

  // 创建入口文件
  const files = createEntryFile(type, entryDir)


  // 入口文件构造成webpack配置的entry对象
  const entry = getEntry(files, entryDir)


  // 构建webpack配置
  const config = configFactory(theme, entry, getSavePath(type))


  // 执行编译
  webpack(config, (err, stats) => {
    // 编译成功，清理无用文件
    clean(type, theme, entryDir)

    if (err || stats.hasErrors()) {
      callback && callback(stats, false)
    } else {
      // utils.log(`>>> ${type === 'el' ? 'Element' : 'UI'}主题【${theme.name}】编译成功！`, 'success')
      stopSpinner()
      callback && callback(stats, true)
      if (themes.length > 0) {
        build(type, themes, entryDir, callback)
      }
    }
  })
}

module.exports = function (type = 'el', callback) {
  filesWriteToIndex()
  // 同步官方变量文件
  // copySrcToLocal(type)
  const savePath = getSavePath(type)
  const entryDir = utils.join(savePath, '.entry')

  // 获取项目主题文件
  const themes = getLocalVarFiles() || []

  // 递归编译主题
  if (themes.length > 0) {
    build(type, themes, entryDir, callback)
  } else {
    utils.log('主题配置文件', 'warning')
  }
}


