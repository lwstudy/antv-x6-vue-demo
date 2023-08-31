/**
 * 正则表达式模块，常用的表达式集合
 *
 * @module $ui/utils/regex
 */

/**
 * url表达式
 * @member URL
 */
export const URL = /^(http|https):\/\/*/

/**
 * email表达式
 * @member EMAIL
 */
export const EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

/**
 * 身份证号码表达式
 * @member ID
 */
export const ID = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

/**
 * 手机号码表达式
 * @member MOBILE_PHONE
 */
export const MOBILE_PHONE = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

/**
 * 检测字符串是否url
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isUrl(str) {
  return URL.test(str)
}

/**
 * 检测字符串是否邮箱
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isEmail(str) {
  return EMAIL.test(str)
}

/**
 * 检测字符串是否身份证号码
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isId(str) {
  return ID.test(str)
}

/**
 * 检测字符串是否手机号码
 * @param {string} str 需要检测的字符串
 * @returns {boolean}
 */
export function isMobilePhone(str) {
  return MOBILE_PHONE.test(str)
}
