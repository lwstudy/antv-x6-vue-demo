/**
 * 工具函数
 * @author chenhuachun
 */

const _path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const url = require('url')
const rm = require('rimraf')
const copy = require('copy-concurrently')
const packageJSON = require('../package')

module.exports = {
  /**
   * 构建文件目录路径
   * @return {string}
   */
  resolve() {
    const args = [__dirname, '../', ...arguments]
    return _path.join.apply(this, args)
  },
  /**
   * 与 require('path') 的 join方法一致
   * @return {string}
   */
  join() {
    return _path.join.apply(this, arguments)
  },

  /**
   * 文件path格式化，适配 mac 和window的差异
   * @param path
   * @returns {string}
   */
  urlFormat(path) {
    return url.format(path)
  },
  /**
   * 方法返回一个对象，其属性表示 path 的重要元素。 尾部的目录分隔符将被忽略
   * @param path
   * @return {ParsedPath}
   */
  parsePath(path) {
    return _path.parse(path)
  },
  /**
   * 输出控制台信息
   * @param {string} msg
   * @param {string} type
   */
  log(msg, type = 'primary') {
    const colors = {
      success: chalk.green,
      warning: chalk.keyword('orange'),
      error: chalk.bold.red,
      primary: chalk.blue
    }
    console.log(colors[type](msg))
  },
  /**
   * 字符转换函数
   * @example
   *
   *  _.kebabCase('Foo Bar'); => 'foo-bar'
   *  _.kebabCase('fooBar'); // => 'foo-bar'
   *  _.kebabCase('__FOO_BAR__'); => 'foo-bar'
   */
  kebabCase(str) {
    return _.kebabCase(str)
  },

  camelCase(str) {
    return _.camelCase(str)
  },

  upperFirst(str) {
    return _.upperFirst(str)
  },
  /**
   * 格式化js代码
   */
  beautifyJs(content) {
    content = content.replace(/(\r\n|\n)\s*/g, '\n')
      .replace(/\(\n/g, '(')
      .replace(/,\n/g, ',')
      .replace(/\/\*\*/g, '\n/**')
      .replace(/\n\/\//g, '\n\n//')
    const beautify = require('js-beautify').js_beautify
    return beautify(content, {
      indent_with_tabs: false,
      indent_size: 2,
      jslint_happy: true,
      end_with_newline: true,
      space_after_anon_function: true
    })
  },
  /**
   * JSON转换成字符串，并把双引号转换成单引号
   * @param json
   */
  stringify(json) {
    const str = JSON.stringify(json)
    return str ? str.replace(/'/g, '\\\'').replace(/"/g, '\'') : ''
  },
  /**
   * 创建文件目录
   * @param dirname
   * @return {boolean}
   */
  mkdir(dirname) {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (this.mkdir(_path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  },
  /**
   * 写文件
   * @param path
   * @param content
   */
  writeFile(path, content) {
    this.mkdir(_path.dirname(path))
    fs.writeFileSync(path, content, 'utf-8')
  },
  /**
   * 复制单个文件
   * @param from
   * @param to
   */
  copyFile(from, to) {
    this.mkdir(_path.dirname(to))
    fs.copyFileSync(from, to)
  },
  /**
   * 复制目录下全部文件，不递归
   * @param fromDir
   * @param toDir
   */
  copyFiles(fromDir, toDir) {
    if (!fs.existsSync(fromDir)) {
      return
    }
    const files = fs.readdirSync(fromDir) || []
    files.forEach(file => {
      const from = this.join(fromDir, file)
      const to = this.join(toDir, file)
      this.copyFile(from, to)
    })
  },
  /**
   * 递归获取文件路径数组
   * @param {string} dir
   */
  getFiles(dir) {
    let result = []
    const files = fs.readdirSync(dir) || []
    files.forEach(file => {
      const fullPath = this.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        result = result.concat(this.getFiles(fullPath))
      } else {
        result.push(fullPath)
      }
    })
    return result
  },
  /**
   * 删除文件和文件夹
   * @param path
   */
  rm(path) {
    rm.sync(path)
  },
  /**
   * 复制文文件夹和文件
   * @param from
   * @param to
   */
  copy(from, to) {
    if (fs.existsSync(to)) {
      this.rm(to)
    }
    return copy(from, to)
  },
  /**
   * 判断两个对象是否相等
   * @param object
   * @param other
   * @return {*}
   */
  isEqual(object, other) {
    return _.isEqual(object, other)
  },
  brand() {
    this.log('-------------------------------------------', 'warning')
    this.log(`【 MyCli 】前端基础脚手架 v${packageJSON.version} \n ———— MY @ 2022`, 'success')
    this.log('-------------------------------------------', 'warning')
  },
  /**
   * 生产唯一id
   * @returns {string}
   */
  uid() {
    return new Date().getTime().toString() + Math.floor(Math.random() * 1000)
  }
}


