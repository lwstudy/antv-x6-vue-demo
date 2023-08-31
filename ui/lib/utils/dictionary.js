/**
 * 字典数组与映射对象互转模块
 * @module $ui/utils/dictionary
 * @author 陈华春
 */

/**
 * 数组转换成映射对象
 * @param {Object[]} array 要转换的数组
 * @param {string} label 健名称
 * @param {string} value 值名称
 * @return {Object}
 */
export function arrayToMap(array = [], label = 'label', value = 'value') {
  const map = Object.create(null)
  array.forEach(item => {
    map[item[label]] = item[value]
  })
  return map
}

/**
 * 映射对象转换成数组
 * @param {Object} map 要转换的映射对象
 * @param {string} label 健名称
 * @param {string} value 值名称
 * @return {Object[]}
 */
export function mapToArray(map, label = 'label', value = 'value') {
  return Object.keys(map).map(key => {
    return {
      [label]: key,
      [value]: map[key]
    }
  })
}

/**
 * 数组keys转换成对象
 * @param {string[]} keys
 * @returns {object}
 */
export function keysToMap(keys = []) {
  const map = Object.create(null)
  keys.forEach(key => {
    map[key] = key
  })
  return map
}

/**
 * 对象映射转换成数组keys
 * @param {object} map
 * @returns {string[]}
 */
export function mapToKeys(map) {
  return Object.keys(map)
}
