/**
 * vuex store 初始化入口文件
 * @module store/index
 */
import config from '$ui/config'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import custModule from './modules/index'

/**
 * Vuex.Store 实例
 */
export default {
  strict: config.vuex.strict,
  /**
   * 自定义 state 在 [store/state]{@link module:store/state} 中定义
   * @type {Object}
   */
  state,
  modules: {
    ...custModule
  },
  /**
   * 非代码生成器生成的mutations,  在  [store/mutations]{@link module:store/mutations} 中定义
   * @type {Object}
   */
  mutations,
  /**
   * 自定义的getters 在 [module:store/getters]{@link module:store/getters} 中定义
   * @type {Object}
   */
  getters
}
