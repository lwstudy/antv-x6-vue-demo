/**
 * 登录验证中间件
 * @param instance
 * @param params
 * @return {Promise<any>}
 */
export default function (instance, params) {
  if (instance.isLogin()) {
    return Promise.resolve(params)
  }
  return Promise.reject(params)
  
}
