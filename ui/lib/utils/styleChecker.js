/**
 * 检测浏览器是否支持指定的样式
 * @param {string|string[]} styleName 样式名称
 * @return {boolean} 是否支持
 */
const isStyleSupport = (styleName) => {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName]
    const {documentElement} = window.document
    
    return styleNameList.some(name => name in documentElement.style)
  }
  return false
}

/**
 * 是否支持Flex
 * @type {boolean}
 */
export const isFlexSupported = isStyleSupport(['flex', 'webkitFlex', 'Flex', 'msFlex'])

export default isStyleSupport
