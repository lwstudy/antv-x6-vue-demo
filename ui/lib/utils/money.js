/**
 * 金额格式转换模块
 * @module $ui/utils/money
 * @author 陈华春
 */


/**
 * 金额格式转换函数
 * @param {string|number} val  金额
 * @param {number} n 保留小数位
 * @param {string} prefix 前缀单位
 * @return {string}
 *
 */
export function format(val, n = 2, prefix = '￥') {
  const s = parseFloat(String(val).replace(/[^\d.-]/g, '')).toFixed(n) + '';
  const l = s.split('.')[0].split('').reverse()
  const r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }

  return prefix + t.split('').reverse().join('') + '.' + r;
}


/**
 * 金额格式转换成数字类型
 * @param {string} str 金额
 * @return {number}
 */
export function reverse(str) {
  return parseFloat(str.replace(/[^\d.-]/g, ''));
}
