/**
 * 树结构数据处理函数
 * @module $ui/utils/tree
 */
 import {cloneDeep} from '$ui/utils/util'
/**
 * 列表转换树结构
 * @param {Object[]} list 列表数据，约定字段名称： id/parentId/children
 * @param {*} [parentId=null] 父节点的值
 * @param {string} [idKey=id] id字段名称
 * @param {string} [parentIdKey=parentId] parentId字段名称
 * @param {boolean} [withRoot=false] 有根节点id时是否保留返回根节点
 * @return {Array}
 */
export function create(list = [], parentId = null, idKey = 'id', parentIdKey = 'parentId', withRoot = false) {
  const _list = cloneDeep(list)  
  const temp = new Map(), tree = []
  _list.forEach(item => {
    temp.set(item[idKey], {...item})
  })
  for (const item of temp.values()) {
    if (item[parentIdKey] === parentId || (!parentId && !item[parentIdKey])) {
      tree.push(item)
    } else {
      const parent = temp.get(item[parentIdKey])
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(item)
      }
    }
  } 
  if (parentId && withRoot) {
    const target = list.find((item) => {
      return item[idKey] === parentId
    }) 
    if (target) {
      target.children = tree
      return [target]
    } else {
      return tree
    }
  } else {
    return tree
  }
  
}

/**
 * 树结构数据相辅助函数
 * @module $ui/utils/tree
 */

/**
 * 遍历树数据节点，查找符合条件的节点
 * @param {Array|Object} data 数据树，如 {id:1, children:[{id:2}]}
 * @param {Boolean} isFindOne 是否只找最先符合条件的一个
 * @param {Function} fn 查找回调函数，回调参数：item 节点，index节点当前兄弟节点中的索引，data 查找的数据树，函数返回true表示符合条件
 * @param {string} [field=children] 子级字段名称
 * @returns {Array|Object} 查找结果，isFindOne为true时返回Object， false时返回Array
 */
export function find(data = [], isFindOne, fn, field = 'children') {
  let result = []
  data = Array.isArray(data) ? data : [data]
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i],
      checked = fn(item, i, data),
      children = item[field]
    if (checked) {
      result.push(item)
      if (isFindOne) break
    }
    if (children) {
      const child = find(children, isFindOne, fn, field)
      if (child) result = result.concat(child)
    }
  }
  return isFindOne ? result[0] || null : result
}


/**
 * 查找节点在树结构数组的路径
 * @param {Array|Object} data 树数据数组， 如 {id:1, children:[{id:2}]}
 * @param {Function} fn 查找回调函数，回调参数：item 节点，index节点当前兄弟节点中的索引，data 查找的数据树，函数返回true表示符合条件
 * @param {string} [field=children] 子级字段名称
 * @return {Array} 节点路径数组
 */
export function findPath(data, fn, field = 'children') {
  const path = []

  function find(array, parent) {
    parent && path.push(parent)
    for (let i = 0, len = array.length; i < len; i++) {
      const item = array[i],
        checked = fn(item, i, array),
        children = item[field]
      // 找到，记录路径，退出循环
      if (checked) {
        path.push(item)
        return true
      }
      if (children && children.length > 0) {
        // 在子级找到，退出循环，自己没有，删除记录的父级
        if (find(children, item)) {
          return true
        } else {
          path.pop()
        }
      }
    }
  }

  find([].concat(data))
  return path

}


const _flat = function(tree, map = {}, idProp = 'id', childrenProp = 'children') { 
  tree.forEach((item) => {
    map[item[idProp]] = item
    if (item[childrenProp]) {
      _flat(item.children, map)
    } 
  })
}
/**
 * 将树状数据摊平为一维数组
 * @param {Array} tree 树数据数组， 如 [{id:1, children:[{id:2}]}]
 * @param {string} [idProp=id] 节点唯一编号字段名称
 * @param {string} [childrenProp=children] 子级字段名称
 * @return {Array} 节点路径数组
 */
export function treeRevert(tree, idProp = 'id', childrenProp = 'children') { 
  const map = {}
  _flat(tree, map, idProp, childrenProp)
  return Object.values(map)
}

