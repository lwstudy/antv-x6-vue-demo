/**
 * 提供常用辅助函数
 * @module $ui/utils/util
 */


const _isEqual = require('lodash/isEqual')
const _get = require('lodash/get')
const _set = require('lodash/set')
const _cloneDeep = require('lodash/cloneDeep')
const _random = require('lodash/random')

// requestAnimationFrame 适配函数
const raFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
  return window.setTimeout(callback, 1000 / 60);
};

/**
 * 动画延时函数
 * @function
 * @param {function} callback 动画回调函数
 * @return {number} id 标识
 *
 * @example
 *
 * import {requestAnimationFrame} from '$ui/utils/util'
 * requestAnimationFrame(() => {
 *   // do sth ....
 *
 * })
 */
export const requestAnimationFrame = raFrame

/**
 * 清除动画延时
 * @function
 * @param {number} id 标识
 *
 * @example
 *
 * import {requestAnimationFrame, cancelAnimationFrame} from '$ui/utils/util'
 * const id = requestAnimationFrame(()= > {
 *   // do sth
 * })
 * cancelAnimationFrame(id)
 */
export const cancelAnimationFrame = window.cancelAnimationFrame || window.webkitRequestAnimationFrame || function (id) {
  window.clearTimeout(id);
};


/**
 * 判断两个对象是否相等
 * @param {*} object 对象1
 * @param {*} other 对象2
 * @return {boolean}
 */
export function isEqual(object, other) {
  return _isEqual(object, other)
}

/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
export function debounce(fn, delay = 20, isImmediate = false, context = this) {
  // 使用闭包，保存执行状态，控制函数调用顺序
  let timer;

  return function () {
    const _args = [].slice.call(arguments)

    clearTimeout(timer);

    const _fn = function () {
      timer = null;
      if (!isImmediate) fn.apply(context, _args);
    };

    // 是否滚动时立刻执行
    const callNow = !timer && isImmediate;

    timer = setTimeout(_fn, delay);

    if (callNow) fn.apply(context, _args);
  }
}

/**
 * 节流函数
 * @param {function} fn 事件处理函数
 * @param {object} [context=this] 上下文对象
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @returns {Function} 事件处理函数
 */
export function throttle(fn, context = this, isImmediate = false) {
  let isLocked;
  return function () {
    const _args = arguments

    if (isLocked) return

    isLocked = true
    raFrame(function () {
      isLocked = false;
      fn.apply(context, _args)
    })

    isImmediate && fn.apply(context, _args)
  }
}


/**
 * 生成随机GUID
 * @return {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}

/**
 * 生成唯一id
 * @return {string}
 */
export function uid() {
  const rnd = Math.floor(Math.random() * 1000)
  const timestamp = new Date().getTime()
  return [timestamp, rnd].join('')
}

/**
 * 根据path查找对象或数组中的某个属性
 * @param {object|array} object 要检索的对象
 * @param {string|array} path 要获取属性的路径
 * @param {string} [defaultValue] 如果解析值是 undefined ，这值会被返回。
 * @return {undefined|*}
 *
 * @example
 *
 *  import {get} from '$ui/utils/util'
 *  const object = { 'a': [{ 'b': { 'c': 3 } }] };
 *  get(object, 'a[0].b.c') // -> 3
 */
export function get(object, path, defaultValue) {
  return _get(object, path, defaultValue)
}

/**
 * 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象
 * @param {object} object 要修改的对象
 * @param {string|array} path 要设置的对象路径
 * @param {*} value 要设置的值
 */
export function set(object, path, value) {
  return _set(object, path, value)
}

/**
 * 深拷贝
 * @param {*} value  要深拷贝的值
 * @return {*} 返回拷贝后的值
 */
export function cloneDeep(value) {
  return _cloneDeep(value)
}

/**
 * 区间随机数
 * @param {*} value  要深拷贝的值
 * @return {*} 返回拷贝后的值
 */
export function random(value) {
  return _random(value)
}

/**
 * 对数组按制定字段名称进行分组
 * @param {Array} data 数组数组
 * @param {string} [field=group] 分组字段名称
 * @returns {object} 结果
 *
 * @example
 * [{name:1, group:'a'},{name:2, group:'a'}, {name:3, group:'b'}]  ->
 * {
 *  'a':[{name:1, group:'a'}, {name:2, group:'a'}]
 *  'b': [{name:3, group:'b'}]
 * }
 */
export function grouping(data = [], field = 'group') {
  const result = {
    default: []
  }
  data.forEach(item => {
    const group = item[field]
    if (group) {
      if (!result[group]) {
        result[group] = []
      }
      result[group].push(item)
    } else {
      result.default.push(item)
    }
  })
  return result
}



/**
 * 分页获取数据
 * @param {Array} data 源数据
 * @param {number} [page=1] 当前页面，1开始
 * @param {number} [size=10] 页大小，默认10
 * @return {Array}
 */
export function pager(data, page = 1, size = 10) {
  if (!data) return []
  const start = (page - 1) * size
  const end = start + size
  return data.length > start ? data.slice(start, end) : []
}

