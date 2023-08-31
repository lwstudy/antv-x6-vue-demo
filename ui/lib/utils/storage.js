/**
 * 缓存操作模块，提供sessionStorage和localStorage操作
 * @module $ui/utils/storage
 * @author 陈华春
 */


/**
 * sessionStorage
 * @const
 * @type {Storage}
 */
export const SESSION = window.sessionStorage || {}

/**
 * localStorage
 * @type {Storage}
 */
export const LOCAL = window.localStorage || {}

/**
 * 保存缓存
 * @param {string} key 缓存key
 * @param {String|Object|Array} value 缓存值，对象、数组类型自动JSON.stringify成字符串
 * @param {Storage} [storage=sessionStorage] 存储方式 SESSION 或 LOCAL
 */
export function save(key, value, storage = SESSION) {
  const str = typeof value === 'object' ? JSON.stringify(value) : value
  storage.setItem(key, str)
}

/**
 * 获取缓存
 * @param {string} key 缓存key
 * @param {Storage} [storage=sessionStorage] 存储方式 SESSION 或 LOCAL
 * @returns {String|Object|Array}
 */
export function get(key, storage = SESSION) {
  const info = storage.getItem(key)
  if (info) {
    if (typeof info === 'object') return info
    const regex = /^({[\W\w]*})|(\[[\W\w]*])$/
    return regex.test(info) ? JSON.parse(info) : info
  }
  return null
}

/**
 * 删除缓存
 * @param {string} key 缓存key
 * @param {Storage} [storage=sessionStorage] 存储方式 SESSION 或 LOCAL
 */
export function remove(key, storage = SESSION) {
  storage.removeItem(key)
}

/**
 * 删除全部缓存
 * @param {Storage} [storage=sessionStorage] 存储方式 SESSION 或 LOCAL
 */
export function clear(storage = SESSION) {
  storage.clear()
}
