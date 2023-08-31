/**
 * 角色验证中间件
 * @param instance
 * @param params
 * @return {Promise<any>}
 */
export default function (instance, params) {
  const {args, required} = params
  const match = required
    ? args.every(n => instance.is(n))
    : args.some(n => instance.is(n))
  return match ? Promise.resolve(match) : Promise.reject(params)
}
