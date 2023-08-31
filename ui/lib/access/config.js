export default {
  // 缓存key
  cacheKey: '__MY_ACCESS__',

  // 缓存存储方式 session 或 local
  storage: 'session',

  // 启用请求拦截
  axios: true,

  // 登录页面路径
  loginPath: '/login',

  // 登录页面是路由，false表示url模式
  loginPathIsRoute: true,

  // 权限不足页面路径
  authorizePath: '/403',

  // 权限不足页面是路由
  authorizePathIsRoute: true,

  // token注入请求头的名称
  authorization: 'Authorization',

  // 请求拦截函数，axios=true 有效
  request: null,

  // 请求响应成功拦截函数，axios=true 有效
  response: null,

  // 请求响应失败拦截函数，axios=true 有效
  responseFail: null,

  // 启用路由守卫
  router: true,

  // VueRouter实例
  $router: null,

  // Vuex实例
  $store: null,

  // 进入路由预处理函数，在进入路页面前进行某些处理，例如单点登录，必须返回Promise
  preprocess: null,

  // 前置路由守卫
  beforeEach: null,

  // 后置路由守卫
  afterEach: null,

  // 中间件名称分隔符
  nameSplit: ':',

  // 中间件参数个数分隔符
  paramSplit: ',',

  // 中间件参数值列表分隔符
  argSplit: '|',

  // can中间件的角色分隔符
  canRoleSplit: '.',

  // 权限层级分隔
  canParentSplit: '#',

  // 路由数组判断的字段
  routerListProp: 'path', 

  // 路由加载进度控制
  progress: null
}

