/**
 * 权限控制模块
 */

import interceptors from './interceptors'
import guarder from './guarder'
import {SESSION, LOCAL, save, get, remove} from '$ui/utils/storage'
import defaultOptions from './config'

/**
 * 创建 Vue实例
 * @private
 * @param Vue
 * @param options
 * @param storage
 * @return {*}
 */
function createVM(Vue, options, storage) {
  return new Vue({
    data: {
      access: {
        // 当前用户的角色
        roles: [],

        // 当前用户的权限列表
        can: [],

        // 登录token
        token: null,
        
        // 权限路由列表
        routerList: []
      }
    },
    created() {
      // 组件创建时从缓存加载数据
      const cache = get(options.cacheKey, storage)
      if (cache) {
        this.access = cache
      }
    }
  })
}


class Access {
  constructor(Vue, options = {}) {
    this._Vue = Vue
    this.config(options)

    if (this.options.router) {
      // 启用路由守卫
      guarder(this)
    }
  }

  config(options) {
    this.options = {
      ...defaultOptions,
      ...options
    }
    this.storage = this.options.storage === 'session' ? SESSION : LOCAL
    this.vm = createVM(this._Vue, this.options, this.storage)

    // 注入请求拦截
    interceptors(this.vm, this.options, this)

  }

  /**
   * 写入缓存
   */
  save() {
    const {cacheKey} = this.options
    save(cacheKey, this.vm.access, this.storage)
  }

  /**
   * 获取权限数据
   * @return {null|*}
   */
  get() {
    if (!this.vm) return null
    return this.vm.access
  }

  /**
   * 写入登录数据
   * @param {object} data 登录权限的数据，必须要包含 roles 或 can
   */
  login(data = {}) {
    this.vm.access = Object.freeze({login: true, ...data})
    this.save()
  }

  /**
   * 更新登录数据
   * @param {object} data 登录权限的数据，必须要包含 roles 或 can
   */
  update(data = {}) {
    this.vm.access = Object.freeze(Object.assign({}, this.vm.access, data))
    this.save()
  }

  /**
   * 更新角色
   * @param {string[]} roles
   */
  setRole(roles = []) {
    this.vm.access = Object.freeze(Object.assign({}, this.vm.access, {roles: roles}))
    this.save()
  }

  /**
   * 更新权限
   * @param {string[]} can
   */
  setCan(can) {
    this.vm.access = Object.freeze(Object.assign({}, this.vm.access, {can: can}))
    this.save()
  }

  /**
   * 设置token
   * @param {string} token
   */
  setToken(token) {
    this.vm.access = Object.freeze(Object.assign({}, this.vm.access, {token: token}))
    this.save()
  }

  /**
   * 设置routerList
   * @param {array} routerList
   */
  setRouterList(routerList) {
    this.vm.access = Object.freeze(Object.assign({}, this.vm.access, {routerList: routerList}))
    this.save()
  }
  
  /**
   * 是否已登录
   * @return {boolean}
   */
  isLogin() {
    return !!this.vm.access.login
  }

  /**
   * 登出
   */
  logout() {
    this.vm.access = {
      roles: [],
      can: []
    }
    const {cacheKey, $router, loginPath, loginPathIsRoute} = this.options
    remove(cacheKey, this.storage)

    if (loginPathIsRoute && $router) {
      $router.push(loginPath)
    } else {
      window.location.href = loginPath
    }
  }

  /**
   * 鉴权，是否有该角色
   * @param {string|string[]} role 角色或角色数组
   * @param {boolean} [required=false] 是否全匹配
   * @return {boolean}
   */
  is(role, required) {
    const roles = this.vm.access.roles
    if (!roles) return false

    const matches = [].concat(role)
    return required
      ? matches.every(n => roles.includes(n))
      : matches.some(n => roles.includes(n))
  }

  /**
   * 鉴权，是否有该权限
   * @param {string|string[]} can 权限编码或编码数组
   * @param {boolean} [required=false] 是否全匹配
   * @return {boolean}
   */
  has(can, required) {
    const canArray = this.vm.access.can
    if (!canArray) return false

    const matches = [].concat(can)
    return required
      ? matches.every(n => canArray.includes(n) || this.match(n))
      : matches.some(n => canArray.includes(n) || this.match(n))
  }

  /**
   * 匹配是否存在父级权限
   * @param {string} code 权限编码
   * @return {boolean}
   *
   * @example
   * match('menu') // 查询是否有 menu# 开头的权限编码， #是默认层级分隔符
   *
   */
  match(code) {
    const canArray = this.vm.access.can
    if (!canArray) return false
    return canArray.some(item => item.startsWith(`${code}${this.options.canParentSplit}`))
  }

}

export default Access
