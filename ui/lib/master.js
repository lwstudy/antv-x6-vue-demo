/**
 * 主应用
 */

import uiConfig from '$ui/config'
import {Vue} from './enhance'
import {MyMasterApp} from '$ui'
import {
  registerMicroApps,
  start,
  setDefaultMountApp,
  runAfterFirstMounted,
  loadMicroApp,
  initGlobalState
} from 'qiankun'

/**
 * 解析微应用配置
 * @param {Array|string[]} apps {name,container,activeRule,entry,mode,publicPath}
 * @return {*}
 */
export function parseAppConfig(apps = []) {
  const publicPath = '/'
  return apps.map(item => {
    const app = typeof item === 'string'
      ? {
        name: item,
        mode: 'hash'
      }
      : item
    return {
      container: '#my-micro-app',
      activeRule: activeRule(app.name, app.mode, app.publicPath),
      entry: app.entry ? app.entry : `${(app.publicPath || publicPath)}${app.name}/`,
      ...app
    }
  })
}

/**
 * 判断是否激活子应用
 * @param {string} appName 应用名称
 * @param {string} mode 路由模式 hash 或 history
 * @param {string} publicPath 部署路径
 * @return {function(*): (*|boolean)}
 */
export function activeRule(appName, mode = 'hash', publicPath = '/') {
  // single-spa 回调location
  return location => {
    if (mode === 'hash') {
      // return _app && _app.$route.path.startsWith(`/${appName}`)
      return location.hash.startsWith(`#/${appName}`)
    }
    return location.pathname.startsWith(publicPath + appName)
  }
}

/**
 * 应用渲染函数
 * @param {object} params
 * @param {string} params.el 组件渲染节点
 * @param {Vuex} params.store vuex实例
 * @param {VueRouter} params.router 路由实例
 * @param {Array} params.apps 子应用列表
 * @param {Array} params.access 权限控制实例
 */
export function masterRender({el, store, router, apps, access}) {
  return new Vue({
    components: {
      MyMasterApp
    },
    el: el,
    store,
    router,
    access,
    data() {
      return {
        matchApp: null
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler(val) {
          this.matchApp = apps.find(app => app.activeRule(window.location))
        }
      }
    },
    render(h) {
      const props = {
        initGlobalState,
        matchApp: this.matchApp,
        ...uiConfig.scale
      }
      return h('my-master-app', {props})
    }
  })
}

/**
 * 注册子应用
 * @param {Array} apps 子应用列表
 * @param {Object} [lifeCycles] 生命周期回调，{beforeLoad, beforeMount, afterMount, beforeUnmount, afterUnmount}
 */
export function registerApps(apps = [], lifeCycles) {
  // 主应用标识
  window.__POWERED_BY_MY_APPS__ = true
  registerMicroApps(apps, lifeCycles)
}

/**
 * 异步获取views目录组件的函数
 * @function getView
 * @param {string} path vue文件相对views目录的路径，不需要文件扩展名
 * @return {Promise} promise
 *
 * @example
 * // 获取 views/index.vue 组件
 *  getView('index')
 */
export const getView = require('$ui/import/view/' + process.env.NODE_ENV)

/**
 * 前端微服务启动函
 * @function appStart
 * @param {Object} opts 参数选项
 * @param {boolean} [opts.prefetch=true] Whether to prefetch assets of sub apps after first sub app mounted
 * @param {boolean} [opts.jsSandbox=true] While sandbox enabled, we could guarantee that sub apps is isolated with each others
 * @param {boolean} [opts.singular=true] Only one sub app display at one runtime, that means a sub app will wait to mount until the before one unmounted
 * @param {Function} [opts.fetch=window.fetch] Set a custom fetch function
 */
export const appStart = start

/**
 * 设置在主应用启动默认启动的app
 * @function setDefaultApp
 * @param {string} appName 应用名称
 */
export const setDefaultApp = appName => setDefaultMountApp(`/${appName}`)

/**
 * 手动加载微应用
 * @function loadApp
 * @param {string|HTMLElement} el 容器
 * @param {string|object} app 应用配置
 * @param {object} configuration  可选，微应用的配置信息
 */
export const loadApp = (el, app, configuration) => {
  const appMessage = parseAppConfig([app])[0]
  appMessage.container = el
  return loadMicroApp(appMessage, configuration)
}

/**
 * 第一个子应用渲染后触发的回调函数
 * @function firstAppMounted
 * @param {function} effect
 */
export const firstAppMounted = runAfterFirstMounted

/**
 * 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
 */
export const initState = initGlobalState


