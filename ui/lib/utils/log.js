/**
 * 日志打印模块
 * @module $ui/utils/log
 * @author chenhuachun
 */

import globalConfig from '../config'

// 提示颜色配置
const colors = {
  default: '#35495E',
  primary: '#3488ff',
  success: '#43B883',
  warn: '#e6a23c',
  error: '#f56c6c'
}

/**
 * 内部调用 console 对象的方法
 * @private
 * @param {string} name 方法名称
 * @param {Array} args 参数数组
 */
function applyMethod(name, args) {
  const debug = globalConfig.debug
  if (!debug) return;
  if (!window) return;
  if (!window.console) return;
  
  const method = window.console[name]
  try {
    method.apply(window.console, args)
  } catch (e) {
  
  }
  
}

/**
 * 打印信息日志
 */
export function log() {
  applyMethod('log', arguments)
}

/**
 * 打印警告日志
 * @param {...string}  日志内容
 */
export function warn() {
  applyMethod('warn', arguments)
}

/**
 * 打印错误日志
 * @param {...string}  日志内容
 */
export function error() {
  applyMethod('error', arguments)
}

/**
 * 打印信息
 */
export function info() {
  applyMethod('info', arguments)
}

/**
 * 枚举对象属性
 * @param {...string}  对象
 */
export function dir() {
  applyMethod('dir', arguments)
}

/**
 * 输出提示信息
 * @param {string} title 标题
 * @param {string} info 内容
 * @param {string} [type=primary] 颜色类型，支持：primary/success/warn/error
 */
export function tip(title, info, type = 'primary') {
  log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${colors[type]}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}

/**
 * 创建log日志实例，返回一个包含全部输入日志方法集合的对象
 * @return {log}
 */
export function create() {
  const methods = {
    warn,
    error,
    tip,
    dir,
    info
  }
  const _log = log
  Object.assign(_log, methods)
  return _log
}

