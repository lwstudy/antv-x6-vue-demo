/**
 * 子应用
 */
import {MyChildApp} from '$ui'
import {
  Vue,
  Vuex,
  Router,
  progress,
  Access
} from './enhance'

import uiConfig from '$ui/config'

export {
  Vue,
  Vuex,
  Router,
  progress,
  Access
}

/**
 * 异步获取子组件views目录组件的函数
 * @function getView
 * @param {string} path vue文件相对views目录的路径，不需要文件扩展名
 * @return {Promise} promise
 *
 * @example
 * // 获取 /apps/app1/views/index.vue 组件
 *  getView('index')
 */
export const getView = require('$ui/import/app/' + process.env.NODE_ENV)

/**
 * 路由实例
 * @type {VueRouter}
 */
let router = null

/**
 * 子应用根组件实例
 */
let instance = null

/**
 * 权限控制实例
 */
let access = null

/**
 * 子应用启动时钩子函数
 * @return {Promise<void>}
 */
async function bootstrap() {
  progress.done()
}

/**
 * 子应用销毁是的钩子函数
 * @return {Promise<void>}
 */
async function unmount() {
  if (!instance) return
  instance.$destroy();
  // 解决子应用内存泄漏问题
  instance.$el.innerHTML = '';
  instance = null
  router = null
  access = null
}


/**
 * 修改路由配置，在path前补上应用名称
 * @param {Array} routes
 * @param {string} prefix
 * @param {Object} parent 父路由
 */
export function inject(routes = [], prefix = '', parent = null) {
  if (!prefix) return
  routes.forEach(route => {
    const path = route.path
    if (path.startsWith('/') || path === '') {
      route.path = `${prefix}${route.path}`
    } else {
      route.path = parent ? parent.path : `${prefix}`
    }
    if (route.children) {
      inject(route.children, prefix, route)
    }
  })
}

/**
 * 创建前端微服务子应用
 * @param {object} opts 参数选项
 * @param {string} opts.el 子应用挂载的节点
 * @param {Array} opts.routes 子应用路由配置
 * @param {Object} opts.config 配置信息
 * @param {Vuex} store vuex实例
 * @return {*}
 */
export function createMicroApp({el, routes, config, store}) {
  if (config.routePrefix) {
    inject(routes, config.routePrefix)
  }
  return {
    /**
     * 子应用渲染钩子函数
     * @return {Promise<void>}
     */
    async mount(props) {
      router = new Router({
        routes,
        ...config.router
      })
      access = new Access(Vue, {
        ...config.access,
        $router: router,
        progress
      })
      instance = new Vue({
        components: {
          MyChildApp
        },
        provide() {
          return {
            appProps: props
          }
        },
        router,
        store,
        access,
        render: h => h('my-child-app', {
          props: uiConfig.scale
        })
      }).$mount(el)
    },
    async update(props) {
      console.log('update props', props);
    },
    bootstrap,
    unmount
  }
}





