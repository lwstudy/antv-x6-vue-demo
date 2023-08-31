/**
 * 组件助手模块
 * @module $ui/utils/helper
 */

/**
 * 组件前缀
 * @member prefix
 */
export const prefix = 'My'

/**
 * 命名空间
 * @member {string}
 */
export const namespace = prefix.toLowerCase()

/**
 * 为组件添加安装方法
 * @param {Object} Mod Vue组件
 * @return {Object}
 */
export function install(Mod) {

  Mod.install = Vue => {
    if (typeof window !== 'undefined') {
      require('../analysis').default(Mod)
    }
    return Vue.component(Mod.name, Mod)
  }
  return Mod
}
