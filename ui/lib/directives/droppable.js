/**
 * 元素可放置指令
 * @module utils/directives/droppable
 * @author 陈华春
 */

import Events from '../utils/events'
import {addClass, removeClass} from 'element-ui/lib/utils/dom'

// 可放置元素className
const DROPPABLE_CLASS = 'xdh-droppable'

// 拖拽进入到可放置区，元素className
const DRAG_ENTER_CLASS = 'xdh-droppable--enter'

// 空函数
const noop = function () {
}

/**
 * 放置类实例化参数选项
 * @const
 * @type {object}
 * @property {String|String[]} [accept=null] 设置可放置的draggable分组名称，字符串或数组，多个分组字符串可用英文逗号分隔
 * @property {String} [enterClass=xdh-droppable--enter] 拖拽进入可放置区的元素className
 * @property {boolean} [disabled=false] 是否禁用
 * @property {function} [onDragEnter] 拖拽进入放置区时回调
 * @property {function} [onDragOver] 拖拽经过放置区时回调
 * @property {function} [onDragLeave] 拖拽离开放置区时回调
 * @property {function} [onDrop] 拖拽放置时回调
 */
const defaultOptions = {
  // 设置可放置的draggable分组名称，字符串或数组，多个分组字符串可用英文逗号分隔
  accept: null,

  enterClass: DRAG_ENTER_CLASS,

  // 是否禁用
  disabled: false,

  // 拖拽进入回调
  onDragEnter: noop,
  // 拖拽经过回调
  onDragOver: noop,

  // 拖拽离开回调
  onDragLeave: noop,

  // 放置回调
  onDrop: noop
}

/**
 * 可放置类 继承 [Events]{@link module:utils/events~Events}
 * @class
 * @extends Events
 */
class Droppable extends Events {
  /**
   * 构造函数
   * @param {HtmlDocument} document HTML 文档对象
   * @param {HtmlElement} el 需要拖拽的元素
   * @param {object} [options] 参数选项，默认值：[defaultOptions]{@link module:utils/directives/droppable~defaultOptions}
   */
  constructor(document, el, options) {
    super()
    /**
     * HTML文档对象
     * @type {HtmlDocument}
     */
    this.document = document
    /**
     * 需要拖拽的元素
     * @type {HtmlElement}
     */
    this.el = el
    this.init(options)
  }

  init(options) {
    /**
     * 实例化选项参数对象
     * @member {Object}
     */
    this.options = Object.assign({},
      defaultOptions,
      options === false ? {disabled: true} : options || {})
    const o = this.options
    if (typeof o.accept === 'string') {
      this.options.accept = o.accept.split(',')
    }
    addClass(this.el, DROPPABLE_CLASS)
    this.$on('drag-enter', this.handleDragEnter.bind(this))
    this.$on('drag-over', this.handleDragOver.bind(this))
    this.$on('drag-leave', this.handleDragLeave.bind(this))
    this.$on('drop', this.handleDrop.bind(this))
  }

  handleDragEnter(e) {
    addClass(this.el, this.options.enterClass)
    this.options.onDragEnter(e)
  }

  handleDragOver(e) {
    this.options.onDragOver(e)
  }

  handleDragLeave(e) {
    removeClass(this.el, this.options.enterClass)
    this.options.onDragLeave(e)
  }

  handleDrop(e) {
    removeClass(this.el, this.options.enterClass)
    this.options.onDrop(e)
  }

  /**
   * 销毁，释放内存
   */
  destroy() {
    super.destroy()
    removeClass(this.el, DROPPABLE_CLASS)
    removeClass(this.el, this.options.enterClass)
  }

  /**
   *  当选项参数改变时调用，更新组件
   * @param {object} [options] 参数选项, 参考：[defaultOptions]{@link module:utils/directives/droppable~defaultOptions}
   */
  reset(options) {
    this.destroy()
    this.init(options)
  }
}

/**
 * 指令 v-droppable
 * @export
 *
 * @example
 *
 *  <div v-droppable="{accept:'drag'}"></div>
 *
 *  import droppable from '@/utils/directives/ddroppable'
 *  export default {
 *    directives: {
 *      droppable
 *    }
 *  }
 */
export default {
  /**
   * 元素在页面渲染时回调，在这里进行实例化 Droppable
   * @param {HtmlElement} el 指令的宿主元素
   * @param {Object} binding Vue指令binding对象
   */
  bind(el, binding) {
    el.__droppable__ = new Droppable(window.document, el, binding.value)
  },
  componentUpdated(el, binding) {
    // const instance = el.__droppable__
    // instance.reset(binding.value)
  },
  /**
   * 元素在页面销毁时回调，在这里销毁Draggable实例
   * @param el
   */
  unbind(el) {
    const instance = el.__droppable__
    instance.destroy()
  }
}
