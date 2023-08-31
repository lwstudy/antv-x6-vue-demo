/**
 * 初始化运行时配置
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './config'

/**
 * 获取全局运行时配置
 */
import globalConfig from '$ui/config'

/**
 * 项目自定义的路由, 手动写的
 */
import routesFactory from '@/router/routes'

/**
 * 按views目录下文件自动生成的路由
 */
import autoRoutesFactory from '$my/routes/index'

/**
 * 项目Vuex实例参数选项
 */
import vuexOptions from '@/store/index'


/**
 * 项目样式文件
 */
import '@/style/index.scss'


// 全局字典管理函数
import {
  getOptionsMap,
  formatFilterInit
} from '@/helper/dict-management/index'

// // 全局（字典）过滤器
// import formatFilter from '@/helper/filter';

/**
 * 主应用增强
 */
const {
  Vue,
  Vuex,
  Router,
  getView,
  progress,
  Access,
  appRender
} = require('$ui/index')


Vue.prototype.$getOptionsMap = getOptionsMap


/**
 * 全局共享数据 Vuex实例
 */
const store = new Vuex.Store(vuexOptions)

// 注册全局过滤器‘formFilter’
Vue.filter('formatFilter', formatFilterInit(store));


/**
 * 如果启用了自动创建路由功能，获取路由配置信息
 * @type {Array}
 */
const autoRoutes = globalConfig.autoRoutes ? autoRoutesFactory({
  get: getView
}) : []

/**
 * 项目手工配置的路由与自动路由合并
 */
const routes = routesFactory({
  get: getView
}).concat(autoRoutes)

/**
 * 实例化路由
 * @type {Router}
 */
const router = new Router({
  routes,
  ...globalConfig.router
})

/**
 * 注册权限控制实例
 */
const access = new Access(Vue, {
  ...globalConfig.access,
  $router: router,
  $store: store,
  progress
})

/**
 * 模拟数据，生产环境不加载模拟数据
 */
if (process.env.MY_MOCK === 'true') {
  require('@/mock/index')
}

const params = {
  el: '#app',
  store,
  router,
  access
}

// 开启了微应用服务
if (process.env.MY_MICRO_APP === 'true') {
  /**
   * 注册的子应用列表
   */
  const apps = require('./apps').default
  const {
    masterRender,
    registerApps,
    parseAppConfig,
    appStart
  } = require('$ui/master')

  // 解析子应用配置
  params.apps = parseAppConfig(apps)
  // 注册子应用
  registerApps(params.apps)
  // 渲染主应用
  masterRender(params)
  // 启动微应用服务
  appStart(globalConfig.microApp || {})

} else {
  // 关闭了微应用服务，直接渲染根组件
  appRender(params)
}
