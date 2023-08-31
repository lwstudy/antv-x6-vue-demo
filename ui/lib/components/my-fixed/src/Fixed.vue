<template>
  <div :class="classes" :style="styles">
    <div v-if="$slots.header" ref="header" class="my-fixed__header" :style="translate">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div v-if="$slots.footer" ref="footer" class="my-fixed__footer" :style="translate">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

  /**
   * 定位布局组件，头部、底部可固定位置，不跟随滚动条移动
   * @module $ui/components/my-fixed
   */

  import {on, off} from 'element-ui/lib/utils/dom'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义主体内容
   * @property {string} header 定义头部内容
   * @property {string} footer 定义底部内容
   */

  export default {
    name: 'MyFixed',
    /**
     * 属性参数
     * @property {boolean} [fit] 适配父容器
     */
    props: {
      // 适配父容器
      fit: Boolean
    },
    data() {
      return {
        headerHeight: 'auto',
        footerHeight: 'auto',
        scrollTop: 0
      }
    },
    computed: {
      classes() {
        return {
          'my-fixed': true,
          'is-fit': this.fit
        }
      },
      styles() {
        return {
          paddingTop: this.headerHeight,
          paddingBottom: this.footerHeight
        }
      },
      translate() {
        return {
          transform: `translateY(${this.scrollTop}px)`
        }
      }
    },
    methods: {
      /**
       * 重置位置，在容器尺寸变化后位置没更新时，可调用方法刷新
       * @method resize
       */
      resize() {
        if (this.$refs.header) {
          const rect = this.$refs.header.getBoundingClientRect()
          this.headerHeight = rect.height + 'px'
        }
        if (this.$refs.footer) {
          const rect = this.$refs.footer.getBoundingClientRect()
          this.footerHeight = rect.height + 'px'
        }
        this.handleScroll({target: this.$el})
      },
      handleScroll({target}) {
        if (target) {
          this.scrollTop = target.scrollTop
        }
      }
    },
    mounted() {
      this.resize()
      on(this.$el, 'scroll', this.handleScroll)
    },
    beforeDestroy() {
      off(this.$el, 'scroll', this.handleScroll)
    }
  }
</script>
