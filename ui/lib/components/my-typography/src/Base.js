/**
 * 基础文本组件
 */
import {MyClipboard, MyIcon} from '$ui'
import {Tooltip, Input} from 'element-ui'
import isStyleSupport from '$ui/utils/styleChecker'
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
import Editable from './Editable'
import ellipsisHelper from './ellipsis'

// 是否支持CSS多行文本省略号
const isLineClampSupport = isStyleSupport('webkitLineClamp')

// 是否支持CSS单行文本省略号
const isTextOverflowSupport = isStyleSupport('textOverflow')

const ELLIPSIS_STR = '...'

/**
 * 添加包裹容器
 * @param h
 * @param blocks
 * @param content
 * @return {*}
 */
function wrapperDecorations(h, blocks, content) {
  let currentContent = content;
  const {mark, code, underline, del, strong, pre} = blocks

  function wrap(needed, tag) {
    if (!needed) return;

    currentContent = h(tag, {}, [].concat(currentContent));
  }

  wrap(pre, 'pre')
  wrap(strong, 'strong')
  wrap(underline, 'u')
  wrap(del, 'del')
  wrap(code, 'code')
  wrap(mark, 'mark')

  return currentContent
}

// 获取虚拟节点的文本
function getInnerText(children = []) {
  let texts = []
  children.forEach(node => {
    if (node.children) {
      texts = texts.concat(getInnerText(node.children))
    }
    if (node.text) {
      texts.push(node.text)
    }
  })
  return texts.join('')
}


export default {
  components: {
    MyClipboard,
    MyIcon,
    Tooltip,
    Input,
    Editable
  },
  /**
   * 属性参数
   * @member props
   * @property {String} [tag=article] 生成标签名称
   * @property {VNode[]} [children] 内容虚拟DOM
   * @property {Boolean} [copyable=false] 是否可拷贝
   * @property {String} [copyText] 复制文本内容, 默认取虚拟DOM的innerText
   * @property {Boolean} [delete=false] 添加删除线样式
   * @property {Boolean} [disabled=false] 禁用文本样式
   * @property {Boolean} [editable=false] 是否可编辑
   * @property {Boolean} [ellipsis=false] 设置自动溢出省略
   * @property {Number} [rows=1] 超出几行显示省略， ellipsis true 有效
   * @property {Boolean} [expandable=false] 显示展开按钮 ellipsis true 有效
   * @property {Boolean|Object} [tooltip] 显示tooltip，ellipsis true 有效
   * @property {Boolean} [mark=false] 添加标记样式
   * @property {Boolean} [underline=false] 添加下划线样式
   * @property {Boolean} [code=false] 添加引用样式
   * @property {Boolean} [strong=false] 是否加粗
   * @property {Boolean} [pre=false] 保留格式
   * @property {Boolean} [small=false] 字体变小
   * @property {String} [type] 文本类型 '', 'primary', 'secondary', 'warning', 'danger'
   */
  props: {
    tag: {
      type: String,
      default: 'article'
    },
    children: {
      type: Array
    },
    // 是否可拷贝
    copyable: Boolean,
    // 复制文本内容
    copyText: String,
    // 添加删除线样式
    delete: Boolean,
    // 禁用文本
    disabled: Boolean,
    // 是否可编辑
    editable: Boolean,
    // 设置自动溢出省略
    ellipsis: Boolean,
    // ellipsis true 有效
    rows: {
      type: Number,
      default: 1
    },
    // ellipsis true 有效
    expandable: Boolean,
    // 显示tooltip，ellipsis true 有效, 设置tooltip后，expandable 将失效
    tooltip: [Boolean, Object],
    // 添加标记样式
    mark: Boolean,
    // 添加下划线样式
    underline: Boolean,
    code: Boolean,
    strong: Boolean,
    pre: Boolean,
    small: Boolean,
    type: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'primary', 'secondary', 'warning', 'danger'].includes(val)
      }
    }
  },
  data() {
    this.copyTimerId = null
    return {
      copied: false,
      editing: false,
      ellipsisContent: null,
      isEllipsis: false,
      expanded: false
    }
  },
  computed: {
    classes() {
      const cssEllipsis = this.canUseCSSEllipsis();
      const cssTextOverflow = this.rows === 1 && cssEllipsis;
      const cssLineClamp = this.rows && this.rows > 1 && cssEllipsis;
      return {
        'my-typography': true,
        [`is-${this.type}`]: !!this.type,
        'is-disabled': this.disabled,
        'is-editing': this.editing,
        'is-ellipsis-single-line': (this.ellipsis && cssTextOverflow),
        'is-ellipsis': (this.ellipsis && cssLineClamp),
        'is-pointer': !!this.$listeners.click,
        'is-small': this.small
      }
    },
    styles() {
      const cssEllipsis = this.canUseCSSEllipsis();
      const cssLineClamp = this.rows && this.rows > 1 && cssEllipsis;
      if (cssLineClamp) {
        return {
          '-webkit-line-clamp': this.rows
        }
      }
      return null
    },
    copyIcon() {
      return this.copied ? 'el-icon-check' : 'el-icon-document-copy'
    }
  },
  watch: {
    children() {
      this.resizeOnNextFrame()
    }
  },
  methods: {
    // 检测是否可以用CSS实现省略号功能
    canUseCSSEllipsis() {
      // 如果有操作相关功能，就不能用css实现
      if (this.editable || this.copyable || this.expandable || this.tooltip) {
        return false
      }

      if (this.rows === 1) {
        return isTextOverflowSupport
      }
      return isLineClampSupport
    },
    getText() {
      return getInnerText(this.children)
    },
    setText(text) {
      if (this.children && this.children[0]) {
        this.children[0].text = text
      }
    },
    getCopyText() {
      if (this.copyText) return this.copyText
      return this.getText()
    },
    handleCopy(e) {
      this.copied = true
      clearTimeout(this.copyTimerId)
      this.copyTimerId = setTimeout(() => {
        this.copied = false
      }, 3000)
      /**
       * 复制文字时触发
       * @event copy
       * @param {Object} 事件对象
       */
      this.$emit('copy', e)
    },
    handleEdit() {
      this.editing = true
      /**
       * 开始编辑时触发
       * @event editing
       */
      this.$emit('editing')
    },
    toggleExpand() {
      this.expanded = !this.expanded
      /**
       * 展开或收起时触发
       * @event expand
       * @param {Boolean} expanded 是否展开
       */
      this.$emit('expand', this.expanded)
    },
    handleEditorSave(text) {
      this.editing = false
      this.setText(text)
      /**
       * 编辑结束时触发
       * @event edited
       * @param {String} text 文本内容
       */
      this.$emit('edited', text)
      this.resizeOnNextFrame()
    },
    handleTextChange(text) {
      /**
       * 编辑文本改变时触发
       * @event change
       * @param {String} text 文本内容
       */
      this.$emit('change', text)
    },
    resizeOnNextFrame() {
      if (this.editing || !this.ellipsis) return
      this.$nextTick(() => {
        this.syncEllipsis()
      })
    },
    syncEllipsis() {
      if (!this.children || this.children.length === 0) return
      if (!this.rows || this.rows < 0) return

      if (this.canUseCSSEllipsis()) return

      const {content, ellipsis} = ellipsisHelper(
        this.$el,
        this.rows,
        this.children,
        this.renderOperations()
      )

      this.ellipsisContent = content
      this.isEllipsis = ellipsis
    },
    renderCopy() {
      if (!this.copyable) return
      return (
        <my-clipboard class="my-typography__copy"
                      tooltip
                      text={this.getCopyText}
                      onSuccess={this.handleCopy}>
          <my-icon name={this.copyIcon}
                   class={{'my-typography__copy-icon': true, 'is-copied': this.copied}}></my-icon>
        </my-clipboard>
      )
    },
    renderEdit() {
      if (!this.editable) return
      return (
        <Tooltip class="my-typography__edit"
                 content="编辑"
                 placement="top">
        <span>
          <my-icon class="my-typography__edit-icon"
                   name="el-icon-edit"
                   onClick={this.handleEdit}></my-icon>
        </span>
        </Tooltip>
      )
    },
    renderExpand() {
      if (!this.ellipsis || !this.expandable || this.tooltip) return
      if (!this.isEllipsis) return
      return (<a class="my-typography__expand" onClick={this.toggleExpand}>{this.expanded ? '收起' : '展开'}</a>)
    },
    renderEditInput() {
      return (
        <Editable value={this.getText()}
                  onChange={this.handleTextChange}
                  onSave={this.handleEditorSave}></Editable>
      )
    },
    renderOperations() {
      return [this.renderExpand(), this.renderEdit(), this.renderCopy()].filter(vnode => vnode)
    },
    renderTooltip(h, vnode) {
      if (!this.ellipsis || !this.tooltip) return vnode
      if (!this.isEllipsis) return vnode
      const props = {
        content: this.getText(),
        placement: 'top',
        ...this.tooltip
      }

      return (
        <Tooltip {...{props}}>{vnode}</Tooltip>
      )
    }
  },

  render(h) {
    // 编辑模式，渲染编辑器
    if (this.editing) {
      return h(this.tag, {class: this.classes}, [this.renderEditInput()])
    }
    let children = []
    // 需要js计算的显示省略号
    if (this.isEllipsis && !this.expanded) {
      children = this.ellipsisContent.concat(ELLIPSIS_STR, this.renderOperations())
    } else {
      // 无省略号
      children = [].concat(
        wrapperDecorations(h, {
          strong: this.strong,
          mark: this.mark,
          underline: this.underline,
          del: this.delete,
          code: this.code,
          pre: this.pre
        }, this.children),
        this.renderOperations()
      )
    }
    const vnode = h(this.tag, {
      class: this.classes,
      style: this.styles
    }, children)
    return this.renderTooltip(h, vnode)
  },
  mounted() {
    if (this.ellipsis) {
      addResizeListener(this.tooltip ? this.$el.parentNode : this.$el, this.resizeOnNextFrame)
      this.resizeOnNextFrame()
    }
  },
  beforeDestroy() {
    clearTimeout(this.copyTimerId)
    if (this.ellipsis) {
      removeResizeListener(this.tooltip ? this.$el.parentNode : this.$el, this.resizeOnNextFrame)
    }
  }
}
