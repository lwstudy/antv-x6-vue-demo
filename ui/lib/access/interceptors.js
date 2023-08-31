import globalConfig from '$ui/config'

/**
 * 请求、响应函数句柄，销毁时需要用到
 */
let requestId, responseId;

/**
 * 默认请求拦截函数
 * @param {Object} vm
 * @param {Object} options
 * @param {object} config axios 请求配置
 * @return {*}
 */
function defaultRequest({access}, options, config) {
  if (access.token) {
    config.headers[options.authorization] = access.token
  }
  return config
}

/**
 * 默认请求响应拦截函数
 * @param {Object} vm
 * @param {Object} options
 * @param {object} res axios 响应数据
 * @return {*}
 */
function defaultResponse({$router}, options, res) {
  // 非JSON格式，不需要拦截
  const config = res.config || {}
  if (config.responseType !== 'json') {
    return res
  }
  if (res.data) {
    // 如果响应的状态码是未登录或登录失效，页面路由跳转到登录页面
    const codeKey = globalConfig.keys.code
    const codeValue = res.data[codeKey].toString()
    const notLoginStatus = globalConfig.statusCode.notLogin.toString()
    const {loginPath, loginPathIsRoute, $router} = options
    if (codeValue === notLoginStatus) {
      if ($router && loginPathIsRoute) {
        $router.push(options.loginPath)
      } else {
        window.location.href = loginPath
      }
    }
  }
  return res
}

/**
 * 默认请求响应错误拦截函数
 * @param {Object} vm
 * @param {Object} options
 * @param {Error} error axios 响应错误
 * @return {*}
 */
function defaultResponseFail(vm, options, error) {
  return Promise.reject(error)
}

export default function (vm, options, accessInstance) {
  const {$axios} = vm
  const {axios, request, response, responseFail} = options

  // 删除请求拦截
  if (requestId !== undefined) {
    $axios.interceptors.request.eject(requestId)
  }

  // 删除响应拦截
  if (responseId !== undefined) {
    $axios.interceptors.response.eject(responseId)
  }

  // 加入拦截
  if (axios) {
    requestId = $axios.interceptors.request.use((request || defaultRequest).bind(accessInstance, vm, options))
    responseId = $axios.interceptors.response.use(
      (response || defaultResponse).bind(accessInstance, vm, options),
      (responseFail || defaultResponseFail).bind(accessInstance, vm, options)
    )
  }

}
