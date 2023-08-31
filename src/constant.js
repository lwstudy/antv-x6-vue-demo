/**
 * 常量配置, 子应用也共享这个文件
 */

/**
 * 读取静态配置（优先读取public/config.js中的IP端口）
 * @private
 */
const __MY_CONFIG__ = window.__MY_CONFIG__ || {}

/**
 * 接口服务器
 * @type {*|string}
 */
export const API_HOST = __MY_CONFIG__.API_HOST || 'http://127.0.0.1:8080'
