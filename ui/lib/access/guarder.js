/**
 * 路由权限控制模块
 */
import Queue from '$ui/utils/queue'
import loginMiddleware from './middleware/login'
import roleMiddleware from './middleware/role'
import canMiddleware from './middleware/can'
import routerMiddleware from './middleware/router'

// 路由控制中间件
const middlewareMap = {
  login: loginMiddleware,
  role: roleMiddleware,
  can: canMiddleware,
  router: routerMiddleware
}

// 中间件解析缓存
const Caches = {}

/**
 * 解析中间件配置信息
 * @param {string} action 配置信息,如：login / role:admin|user,true / can:add|update|delete,true
 * @param {string} nameSplit 中间件名称分隔符,默认 ：
 * @param {string} paramSplit 参数个数分隔符，默认 ,
 * @param {string} argSplit 值个数分隔符，默认 |
 * @return {object}
 */
function parser(action = '', {nameSplit, paramSplit, argSplit}) {
  let middleware = Caches[action] 
  if (middleware) return middleware
  const arr = action.trim().split(nameSplit)
  const name = arr[0]
  const params = (arr[1] || '').trim().split(paramSplit)
  const args = params[0] ? params[0].trim().split(argSplit) : []
  const required = !!params[1]
  middleware = Caches[action] = {
    name,
    args,
    required
  }
  return middleware
}

/**
 * 队列任务处理函数
 * @param {Access} instance 实例
 * @param {string} action 中间件配置
 * @return {Promise<any>}
 */
function task(instance, action) {
  const params = parser(action, instance.options)
  const middleware = middlewareMap[params.name]
  return middleware
    ? middleware(instance, params)
    : Promise.resolve(middleware)
}

/**
 * 处理鉴权通过
 * @param {Access} instance 实例
 * @param {Function} next 路由跳转函数
 * @param {Queue} queue 队列实例
 */
function handleComplete(instance, next, queue) {
  next()
  queue.destroy()
}

/**
 * 处理鉴权不通过情况
 * @param {Access} instance 实例
 * @param {Function} next 路由跳转函数
 * @param {Object} middleware 中间件
 * @param {string} action 中间件配置
 * @param {Queue} queue 队列实例
 */
function handleFail(instance, next, middleware, action, queue) {
  const {progress} = instance.options
  progress && progress.done()
  queue.destroy()

  // 未登录
  if (middleware.name === 'login') {
    const {loginPath, loginPathIsRoute} = instance.options
    if (loginPathIsRoute) {
      next && next(loginPath)
    } else {
      next && next(false)
      window.location.href = loginPath
    }
  } else {
    // 权限不足
    const {authorizePath, authorizePathIsRoute} = instance.options
    if (authorizePathIsRoute) {
      next && next(authorizePath)
    } else {
      next && next(false)
      window.location.href = authorizePath
    }
  }

}

/**
 * 从匹配的路由提取access中间件
 * @param to
 * @return {*[]}
 */
function getAccess(to) {
  const matched = to.matched
  let access = []
  matched.forEach((match, index) => {
    if (match.meta.access) { 
      access = access.concat(match.meta.access)
    }
    // 遍历权限数组，若为‘router’ 即将当前path设为参数
    access.forEach((item, index) => {
      if (item === 'router') {
        access[index] = `${item}:${to.path}`
      }
    })
  }) 
  // 去重
  const result = [...new Set(access)]
  return result 
}

/**
 * 队列任务
 * @param instance
 * @param {Access} instance 实例
 * @param {Array} access
 * @param {function} handleComplete 鉴权通过处理函数
 * @param {function} handleFail 降权不通过处理函数
 * @param {Function} next 路由跳转函数
 */
export function queueTasks({instance, access, handleComplete, handleFail, next}) {
  // Queue 会修改传入的数组，需要克隆断开引用再传入
  new Queue(task.bind(this, instance), access.slice())
    .$once('error', handleFail.bind(this, instance, next))
    .$once('complete', handleComplete.bind(this, instance, next))
    .start()
}


/**
 * 路由守卫
 * @param {Access} instance Access实例
 */
export default function (instance) {
  const {router, $router, progress, beforeEach, afterEach, preprocess} = instance.options
  if (!router || !$router) return

  // 执行路由鉴权
  const run = function (to, next) {
    const access = getAccess(to)

    // 路由没有配置中间件，即不用鉴权
    if (!access.length) {
      next()
      return
    }
    queueTasks({
      instance,
      access,
      handleComplete,
      handleFail,
      next
    })
  }

  $router.beforeEach((to, from, next) => {
    progress && progress.start()
    // 优先使用 beforeEach
    if (beforeEach) {
      beforeEach.call(instance, to, from, next)
      return
    }
    // 执行预处理
    if (preprocess) {
      preprocess.call(instance, {to, from, access: instance, next}).then(() => {
        run(to, next)
      })
    } else {
      run(to, next)
    }
  })

  $router.afterEach((to, from) => {
    progress && progress.done()
    if (afterEach) {
      afterEach.call(instance, to, from)
    }
  })
}
