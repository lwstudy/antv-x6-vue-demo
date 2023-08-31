/**
 * 判断路径中间件
 * @param instance
 * @param params
 * @return {Promise<any>}
 */
 import Queue from '$ui/utils/queue'
 export default function (instance, params) {  
  const {routerList} = instance.vm.access
  const {routerListProp} = instance.options
  // 无注册routerList 不拦截
  if (!routerList || (routerList && !routerList.length)) {
    return Promise.resolve(params)
  } else {
    const {args} = params  
    // 无指定路径不拦截
    if (!args.length) { 
      return Promise.resolve(params)
    } else {
      return new Promise((resolve, reject) => {
        new Queue((path) => {
          const targetIndex = routerList.findIndex((item) => {
            return item[routerListProp] === path
          })
          if (targetIndex >= 0) {
            return Promise.resolve()
          } else {
            return Promise.reject(new Error())
          }
        }, args.slice()).$once('error', () => {
          reject(params)
        })
        .$once('complete', () => {
          resolve(params)
        })
        .start()
      })
    }   
  }
  
}