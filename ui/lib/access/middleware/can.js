function parserCan(instance, can) {
  const {canRoleSplit} = instance.options
  const arr = can.split(canRoleSplit)
  
  return arr.length > 1
    ? {
      role: arr[0],
      can: arr[1]
    }
    : {
      role: null,
      can: arr[0]
    }
}

function matchRule(instance, can) {
  const rule = parserCan(instance, can)
  // 无角色配置
  if (!rule.role) return (instance.has(rule.can) || instance.match(rule.can))
  
  // 有角色，can为通配符
  if (rule.role && rule.can === '*') {
    return instance.is(rule.role)
  } else {
    // 同时有角色与can
    return instance.is(rule.role) && (instance.has(rule.can) || instance.match(rule.can))
  }
}

/**
 * 能力权限验证中间件
 * @param instance
 * @param params
 * @return {Promise<any>}
 */
export default function (instance, params) {
  const {args, required} = params
  const match = required
    ? args.every(n => matchRule(instance, n))
    : args.some(n => matchRule(instance, n))
  return match ? Promise.resolve(match) : Promise.reject(params)
}
