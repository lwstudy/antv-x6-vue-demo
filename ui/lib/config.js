/**
 * 运行时配置
 */

const merge = require('lodash/merge')

const __config__ = {
  /**
   * 版本号
   */
  version: '4.2.5',
  /**
   * debug 模式
   */
  debug: process.env.NODE_ENV !== 'production',

  /**
   * 子应用名称
   */
  appName: null,

  /**
   * 路由path前缀，只对hash模式的子应用有效
   */
  routePrefix: null,

  /**
   * 路由配置
   */
  router: {
    /**
     *  路由模式: hash / history
     */
    mode: 'hash',
    /**
     * 应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
     */
    base: '/'
  },

  /**
   * 读取自动创建的路由表配置
   */
  autoRoutes: true,

  /**
   * Vuex配置
   */
  vuex: {
    /**
     * 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
     */
    strict: process.env.NODE_ENV !== 'production'
  },
  /**
   * 属性名映射
   */
  keys: {
    code: 'code',
    data: 'data',
    message: 'msg',
    total: 'total',
    list: 'list',
    page: 'page',
    limit: 'limit',
    pages: 'pages'
  },

  /**
   * 请求响应状态码
   */
  statusCode: {
    // 响应成功
    success: 0,

    // 未登录, 或登录失效
    notLogin: 401,

    // 权限不足
    authorize: 403,

    // 系统内部错误
    error: 500
  },

  /**
   * axios 实例配置
   */
  axios: {
    /**
     * 请求头
     */
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    /**
     * 超时时间
     */
    timeout: 0,
    /**
     * 携带验证
     */
    withCredentials: true,
    /**
     * 响应数据类型
     */
    responseType: 'json',
    /**
     * 请求内容长度
     */
    maxContentLength: -1
  },
  /**
   * svg图标配置
   */
  svg: {
    viewBox: '0 0 1024 1024',
    width: '1em',
    height: '1em',
    fill: 'currentColor'
  },
  /**
   *  权限控制实例配置
   */
  access: {},
  /**
   * 模拟数据配置
   */
  mock: {
    timeout: '50-200'
  },
  /**
   * 缩放页面
   */
  scale: {
    // 基准宽度
    width: 1920,
    // 基准高度
    height: 1080,
    // 是否禁用缩放功能
    disabled: true,
    // 是否锁定比例, 注意：不锁定比例，弹窗位置可能会出现偏移
    lock: true
  },
  /**
   * 启用统计埋点
   */
  analysis: false,
  /**
   * 微服务启动配置， 设置为 null / false 表示关闭微服务功能
   */
  microApp: {
    // 是否开启预加载，默认为 true。
    prefetch: false,
    //  可选，是否为单实例场景，默认为 true
    singular: true,
    // 可选，是否开启沙箱，默认为 true, 在开发环境开启sandbox时加载子应用切换主题，热更新会报错
    sandbox: process.env.NODE_ENV === 'production'
  }
}

export default __config__


export function set(config) {
  merge(__config__, config || {})
}
