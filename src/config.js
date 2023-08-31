import {set as setConfig} from '$ui/config'

// 写入运行时配置
setConfig({

  /**
   * 路由模式
   */
  router: {
    mode: 'hash',
    base: '/'
  },

  /**
   * 是否应用自动生成的路由配置
   */
  autoRoutes: true,

  /**
   * 权限控制配置
   */
  access: {
    // 启用请求权限控制
    axios: true,

    // 启用路由权限控制
    router: true,

    // 缓存存储方式 session 或 local
    storage: 'session',

    // 登录页面路径
    loginPath: '/login',

    // 权限不足页面路径
    authorizePath: '/403'

    // preprocess: ({to, from, access, next}) => {
    //   return new Promise(resolve => {
    //     let info = ''
    //     info = to.query.info  
    //     setTimeout(() => {
    //     if(info) { // 单点登录
    //       console.log('info', info, to) 
    //       next = next({path: to.path})
    //       resolve()
    //     } else { 
    //       resolve();
    //     }
    //     }, 200) 
    //   });
    // }
  },
  /**
   * 开启访问分析追踪
   */
  analysis: true
})

