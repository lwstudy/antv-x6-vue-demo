/**
 * 初始化配置
 */

import './config'

/**
 * 获取全局配置
 */
import globalConfig from '$ui/config'

/**
 * 子应用提供的能力
 */
import {Vuex, getView, progress, createMicroApp} from '$ui/app'

/**
 *  基础通用样式
 */
import '@/style/index.scss'

/**
 * 项目自定义的路由, 手动写的
 */
const routesFactory = require(`$apps/${process.env.APP}/router/routes`).default

/**
 * 按views目录下文件自动生成的路由
 */
const autoRoutesFactory = require(`$my/routes/${process.env.APP}`).default

/**
 * 项目Vuex实例参数选项
 */
const vuexOptions = require(`$apps/${process.env.APP}/store/index`).default

/**
 * 全局共享数据 Vuex实例
 */
const store = new Vuex.Store(vuexOptions)

/**
 * 如果启用了自动创建路由功能，获取路由配置信息
 * @type {Array}
 */
const autoRoutes = globalConfig.autoRoutes ? autoRoutesFactory({get: getView}) : []

/**
 * 项目手工配置的路由与自动路由合并
 */
const routes = routesFactory({get: getView}).concat(autoRoutes)

/**
 * 前端微服务应用
 */
const microApp = createMicroApp({
  el: '#app',
  config: globalConfig,
  routes,
  store,
  progress
})

/**
 * 如果没有主应用，即独立运行
 */
if (!window.__POWERED_BY_MY_APPS__) {
  if (process.env.MY_MOCK === 'true') {
    require('@/mock/index')
  }
  microApp.mount()
}


/**
 * 子应用启动的钩子
 * @type {bootstrap}
 */
export const bootstrap = microApp.bootstrap

/**
 * 子应用挂载钩子
 */
export const mount = microApp.mount

/**
 * 子应用卸载钩子
 */
export const unmount = microApp.unmount

/**
 * 子应用更新
 */
export const update = microApp.update

