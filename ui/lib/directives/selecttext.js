/**
 * 划词选择显示对应的菜单按钮
 * @module utils/directives/selecttext
 * @author 潘浩玮
 */
import {on, off} from 'element-ui/lib/utils/dom'
import bus from '../utils/bus'
// const documentBody = window.document.body

// 获取划取选中的词
const getSelectText = function () {
  const text = window.getSelection ? window.getSelection() : document.selection.createRange().text
  return text.toString()
}

// 获取鼠标最后停留位置
const getMousePos = function (e) {
  const pos = {
    left: e.clientX + window.document.documentElement.scrollLeft,
    top: e.clientY + window.document.documentElement.scrollTop
  }
  return pos
}

/**
 *
 * 指令 v-selecttext
 * @export
 * @example
 *
 * <div v-selecttext:菜单名></div>
 * <xdh-context-menu ref="菜单名"></xdh-context-menu>
 *
 * import selecttext from '@/utils/directives/selecttext'
 * export default {
 *    directives: {
 *      selecttext
 *    }
 *  }
 */
export default {
  /**
   * 元素在页面渲染时回调，在这里进行实例化selecttext
   * @param {HtmlElement} el 指令的宿主元素
   * @param {Object} binding vue指令binding的对象
   * @param {Object} vnode vue编译生成的虚拟节点
   */
  bind(el, binding, vnode) {
    /**
     * 判断 指令绑定的 value 值为 parent
     * 直接 派发 选中的文字以及其他信息
     */
    if (binding.value && binding.value === 'parent') {
      el.__selMUp = function (e) {
        const selectText = getSelectText()
        if (selectText.length > 0) {
          bus.$emit('selectTextMouseDown', {
            pos: getMousePos(e),
            text: selectText,
            el: el,
            vnode: vnode
          })
        }
      }
      el.__selMDown = function () {
        // 移除选中的字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        bus.$emit('selectTextMouseUp')
      }
      on(el, 'mouseup', el.__selMUp)
      on(el, 'mousedown', el.__selMDown)
    } else {
      const contextmenu = vnode.context.$refs[binding.arg]
      if (Array.isArray(contextmenu.$refs.references)) {
        contextmenu.$refs.references.push({el, vnode})
      } else {
        contextmenu.$refs.references = [{el, vnode}]
      }
      contextmenu.$contextmenuId = el.id || contextmenu._uid
      /** 显示菜单
       * @param e
       * @private
       */
      el.__showmenu = function (e) {
        const selectText = getSelectText()
        if (selectText.length > 0) {
          contextmenu.show(getMousePos(e), selectText)
        }
      }

      /** 隐藏菜单
       * @private
       */
      el.__hidemenu = function () {
        // 移除选中的字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        contextmenu.hide()
      }
      on(el, 'mousedown', el.__hidemenu)
      on(el, 'mouseup', el.__showmenu)
    }
  },
  unbind(el) {
    off(el, 'mousedown', el.__selMDown)
    off(el, 'mouseup', el.__selMUp)
    off(el, 'mousedown', el.__hidemenu)
    off(el, 'mouseup', el.__showmenu)
  }
}
