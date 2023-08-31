<template>
  <div class="my-float-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * 浮动布局子项
   * @module $ui/components/my-float-item
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 定义内容，子组件
   */

  export default {
    name: 'MyFloatItem',
    inject: {
      wrapper: {
        default: null
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [float=left] 浮动方向 可选：left、right、none
     */
    props: {
      // 浮动方向
      float: {
        type: String,
        default: 'left',
        validator(val) {
          return ['none', 'left', 'right'].includes(val)
        }
      }
    },
    computed: {
      classes() {
        if (!this.wrapper) return
        let float = this.float
        if (this.wrapper.reverse) {
          float = this.float === 'right' ? 'left' : (this.float === 'left' ? 'right' : 'none')
        }
        return [
          `is-${float}`,
          {
            'is-fit': this.wrapper.fit
          }
        ]
      }
    }
  }
</script>


