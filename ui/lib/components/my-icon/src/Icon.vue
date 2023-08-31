<template>
  <i class="my-icon" :class="classes" @click="handleClick">
    <component v-if="svg" :is="name" v-bind="svgProps"></component>
    <slot></slot>
  </i>
</template>

<script>

  /**
   * 图标组件
   * @module $ui/components/my-icon
   *
   */

  /**
   *
   * Theme 主题枚举
   * @static
   * @enum Theme {String}
   */
  const Theme = {
    /**
     * 默认
     */
    DEFAULT: '',
    /**
     * 绿色
     */
    SUCCESS: 'success',
    /**
     * 橙色
     */
    WARNING: 'warning',
    /**
     * 红色
     */
    DANGER: 'danger',
    /**
     * 灰色
     */
    INFO: 'info',
    /**
     * 品牌色
     */
    PRIMARY: 'primary'
  }

  /**
   * 插槽
   * @member slots
   * @property {string} [default] 默认插槽，可以定义svg
   */
  export default {
    Theme,
    name: 'MyIcon',
    /**
     * 属性参数
     * @member props
     * @property {string} [name] 图标名称，className 支持 Element 和IconFont 和 svg组件
     * @property {Boolean} [svg] 是否是svg图标
     * @property {Object} [svgProps] svg组件配置选项，属性：{viewBox, width, height, fill, class}
     * @property {Theme} [theme] 主题颜色，可选值：primary、success、warning、danger、info
     */
    props: {
      name: String,
      svg: Boolean,
      svgProps: Object,
      theme: {
        type: String,
        validator(val) {
          return !val || Object.values(Theme).includes(val)
        }
      }
    },
    computed: {
      classes() {
        return [{
          [`my-icon--${this.theme}`]: !!this.theme,
          'is-pointer': !!this.$listeners.click,
          'is-svg': this.svg
        },
          // 设置了插槽, name 参数失效
          this.$slots.default ? '' : this.name ? this.name : ''
        ]
      }
    },
    methods: {
      handleClick(e) {
        /**
         * 点击时触发
         * @event click
         *
         */
        this.$emit('click', e)
      }
    }
  }
</script>

