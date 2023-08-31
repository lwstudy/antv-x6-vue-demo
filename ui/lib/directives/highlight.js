/**
 * 高亮显示指定文本
 * @module utils/directives/highlight
 */

import {on, off} from 'element-ui/lib/utils/dom'

const highlightKeyword = (el, binding, vnode) => {
  // 原始内容
  const vdom = vnode.children[0].elm
  const content = (vdom && (vdom.outerHTML || vdom.textContent)) || el.innerHTML || ''
  // 关键
  let keyword = binding.value.keyword
  if (!Array.isArray(keyword)) keyword = [keyword]

  // 节点 class
  const classs = binding.value.class || ''

  // 加入鼠标手势
  let style = ''
  if (typeof binding.value.onclick === 'function') style = 'cursor: pointer'

  // 更新关键标注
  el.innerHTML = content.replace(new RegExp(keyword.join('|'), 'g'), match => {
    return `<span style="${style}" class="xdh-highlight__keyword ${classs}">${match}</span>`
  })
}
// 判断是否缺少必要参数
const hasExit = (el, binding, vnode) => {
  return !(el && binding && binding.value && binding.value.keyword && vnode && vnode.children && vnode.children[0])
}

/**
 * 指令 v-highlight
 * @property {Option} object
 * @property {String|Array} object.keyword 要高亮的关键字
 * @property {String} object.class 高亮关键字自定义样式class, 注：class要为全局设定
 * @property {Function} object.onclick 高亮关键字点击触发,
 */
export default {
  bind(el, binding, vnode) {
    if (hasExit(el, binding, vnode)) return false

    if (typeof binding.value.onclick === 'function') {
      el.__clickKeyword = event => {
        const currEle = event.target
        if (currEle.classList.contains('xdh-highlight__keyword')) {
          binding.value.onclick(currEle.innerText, binding.value)
        }
      }
      on(el, 'click', el.__clickKeyword)
    }
    highlightKeyword(el, binding, vnode)
  },
  componentUpdated(el, binding, vnode) {
    if (hasExit(el, binding, vnode)) return false
    highlightKeyword(el, binding, vnode)
  },
  unbind(el) {
    if (el.__clickKeyword) off(el, 'click', el.__clickKeyword)
  }
}
