<template>
  <div class="my-corner-mark" :class="classes">
    <div class="my-corner-mark__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 角标
   * @module $ui/components/my-corner-mark
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 内容
   */
  export default {
    name: 'MyCornerMark',
    /**
     * 属性参数
     * @member props
     * @property {string} [type=primary] 颜色，支持'primary', 'success', 'warning', 'danger'
     * @property {string} [size] 尺寸，支持 'large', '', 'small',
     * @property {string} [target] 添加到目标的选择器
     *
     */
    props: {
      type: {
        type: String,
        default: 'primary',
        validator(val) {
          return ['primary', 'success', 'warning', 'danger'].includes(val)
        }
      },
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['large', '', 'small'].includes(val)
        }
      },
      target: [String, HTMLElement]
    },
    computed: {
      classes() {
        return {
          [`is-${this.size}`]: !!this.size,
          [`is-${this.type}`]: !!this.type
        }
      }
    },
    mounted() {
      this.targetEl = typeof this.target === 'string'
        ? document.querySelector(this.target)
        : this.target
      if (this.targetEl) {
        this.targetEl.appendChild(this.$el)
      }
    },
    beforeDestroy() {
      if (this.targetEl) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

