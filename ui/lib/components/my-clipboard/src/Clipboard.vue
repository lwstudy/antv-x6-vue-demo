<template>
  <Tooltip v-bind="tooltipOptions">
    <component :is="tag"
               class="my-clipboard"
               :class="{'is-disabled': disabled}"
               :data-clipboard-text="clipboardText"
               :data-clipboard-target="clipboardTarget"
               :data-clipboard-action="clipboardAction">
      <slot></slot>
    </component>
  </Tooltip>
</template>

<script>

  /**
   *  剪切板组件
   *  @module $ui/components/my-clipboard
   */

  import {Tooltip} from 'element-ui'
  import ClipboardJS from 'clipboard'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义显示内容
   */
  export default {
    name: 'MyClipboard',
    components: {
      Tooltip
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [tag=span] 容器标签名
     * @property {String|Function} [text] 要复制的文本，支持函数方式自定义内容
     * @property {String|Function} [target] 复制目标DOM，支持选择器或函数表示，不设置就是组件根DOM
     * @property {String|Function} [action] 动作，支持 copy 和 cut
     * @property {Boolean|Object} [tooltip] ElTooltip 配置参数
     * @property {Boolean|Object} [message] ElMessage 配置参数
     * @property {string} [defaultTip=复制] 默认tooltip文本
     * @property {string} [successTip=复制成功] 复制成功tooltip文本
     * @property {Boolean} [disabled=false] 禁用
     */
    props: {
      tag: {
        type: String,
        default: 'span'
      },
      text: {
        type: [String, Function]
      },
      target: {
        type: [String, Function]
      },
      action: {
        type: [String, Function]
      },
      // 消息提示反馈
      message: [Boolean, Object],
      tooltip: [Object, Boolean],
      defaultTip: {
        type: String,
        default: '复制'
      },
      successTip: {
        type: String,
        default: '复制成功'
      },
      disabled: Boolean
    },
    data() {
      return {
        tip: this.defaultTip
      }
    },
    computed: {
      clipboardText() {
        if (typeof this.text === 'string') {
          return this.text
        }
        return null
      },
      clipboardTarget() {
        if (typeof this.target === 'string') {
          return this.target
        }
        return null
      },
      clipboardAction() {
        if (typeof this.action === 'string') {
          return this.action
        }
        return null
      },
      options() {
        const opt = {}
        if (typeof this.text === 'function') {
          opt.text = this.text
        }
        if (typeof this.action === 'function') {
          opt.action = this.action
        }
        if (typeof this.target === 'function') {
          opt.action = this.target
        }
        return opt
      },
      tooltipOptions() {
        return {
          content: this.tip,
          placement: 'top',
          ...(this.tooltip || {}),
          disabled: (this.disabled || !this.tooltip)
        }
      },
      messageOptions() {
        return {
          message: this.successTip,
          type: 'success',
          ...(this.message || {})
        }
      }
    },
    watch: {
      options() {
        this.dispose()
        this.$nextTick(() => {
          this.instance()
        })
      },
      disabled(val) {
        this.dispose()
        if (val) {
          this.$nextTick(() => {
            this.instance()
          })
        }
      }
    },
    methods: {
      instance() {
        this.clipboard = new ClipboardJS(this.$el, this.options)
        this.clipboard.on('success', e => {
          this.tooltipHandler()
          this.messageHandler()
          /**
           * 复制成功时触发
           * @event success
           * @param {Object} e 事件对象
           */
          this.$emit('success', e)
          e.clearSelection();
        })

        this.clipboard.on('error', e => {
          /**
           * 复制失败时触发
           * @event error
           * @param {Object} e 事件对象
           */
          this.$emit('error', e)
        })
      },
      dispose() {
        clearTimeout(this.timerId)
        this.clipboard && this.clipboard.destroy()
        this.clipboard = null
      },
      tooltipHandler() {
        this.tip = this.successTip
        clearTimeout(this.timerId)
        this.timerId = setTimeout(() => {
          this.tip = this.defaultTip
        }, 3000)
      },
      messageHandler() {
        if (!this.message) return
        this.$message({...this.messageOptions})

      },
      /**
       * 触发复制
       * @method copy
       */
      copy() {
        this.$el.click()
      }
    },
    mounted() {
      !this.disabled && this.instance()
    },
    beforeDestroy() {
      this.dispose()
    }

  }
</script>

