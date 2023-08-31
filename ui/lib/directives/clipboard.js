/**
 * 复制内容到剪切板
 * @module $ui/directives/clipboard
 * @author 朱启成
 */

// 引入clipboard
import Clipboard from 'clipboard';

/**
 *
 * 指令 v-clipboard
 * @param {String|Object} options
 * @param {string} [options.text] 需要复制的文本
 * @param {HTMLElement} [options.target] 复制的目标元素
 * @param {string} [options.action] 复制的的动作，cut / copy
 *
 * @example
 * <el-button v-clipboard="复制的文本">复制</el-button>
 * <el-button v-clipboard="{text:'复制的文本'}">复制</el-button>
 * <el-button v-clipboard="{text: function(){ return '复制的文本' }}">复制</el-button>
 */

export default {
  /**
   * 元素在页面渲染时回调，在这里进行实例化clipboards
   * @param {HtmlElement} el 指令的宿主元素
   * @param {Object} binding Vue指令binding对象
   */
  bind(el, binding) {
    const value = typeof binding.value !== 'object' ? {text: binding.value} : (binding.value || {});
    const options = {...value}
    if (value.text) {
      options.text = typeof value.text === 'function'
        ? value.text
        : function () {
          return value.text
        }
    }

    if (value.target) {
      options.target = typeof value.target === 'function'
        ? value.target
        : function () {
          return value.target
        }
    }

    if (value.action) {
      options.action = typeof value.action === 'function'
        ? value.action
        : function () {
          return value.action
        }
    }

    const clipboard = new Clipboard(el, options)

    clipboard.on('success', (e) => {
      value.success && value.success(e)
    })

    clipboard.on('error', (e) => {
      value.error && value.error(e)
    })

    el.__clipboards__ = clipboard
  },
  /**
   * 元素在页面销毁时回调，在这里销毁clipboards实例
   * @param el
   */
  unbind(el) {
    const instance = el.__clipboards__
    instance && instance.destroy()
  }
}
