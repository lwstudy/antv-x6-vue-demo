<template>
  <div class="my-float" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * 浮动布局组件
   * @module $ui/components/my-float
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 定义内容，子组件
   */

  export default {
    name: 'MyFloat',
    provide() {
      return {
        wrapper: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [reverse=false] 是否左右翻转
     * @property {boolean} [fit=false] 是否充满父容器，即高度100%
     */
    props: {
      // 左右翻转
      reverse: {
        type: Boolean,
        default: false
      },
      // 高度100%
      fit: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes() {
        return {
          'my-float--fit': this.fit
        }
      }
    }
  }
</script>

