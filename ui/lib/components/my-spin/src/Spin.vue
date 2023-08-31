<template>
  <div class="my-spin" :class="wrapperClasses">
    <div v-if="loading && isDelayOver" class="my-spin__loading" :class="spinClasses">
      <slot name="dot">
        <span class="my-spin__dot">
        <i class="my-spin__dot-item"></i>
        <i class="my-spin__dot-item"></i>
        <i class="my-spin__dot-item"></i>
        <i class="my-spin__dot-item"></i>
      </span>
      </slot>

      <div class="my-spin__text">
        <slot name="text">{{tip}}</slot>
      </div>
    </div>
    <div v-if="$slots.default" class="my-spin__container" :class="containerClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 加载中
   * @module $ui/components/my-spin
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义需要显示加载的容器
   * @property {string} dot 定义加载中的内容
   */
  export default {
    name: 'MySpin',
    /**
     * 属性参数
     * @member props
     * @property {string} [size=default]  组件大小，可选值为 small default large
     * @property {number} [delay=100] 延迟显示加载效果的时间（防止闪烁）
     * @property {string} [tip] 当作为包裹元素时，可以自定义描述文案
     * @property {boolean} [loading=false] 是否为加载中状态
     * @property {boolean} [fit=false] 充满父容器
     */
    props: {
      // 组件大小，可选值为 small default large
      size: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'large', 'small'].includes(val)
        }
      },
      // 延迟显示加载效果的时间（防止闪烁）
      delay: {
        type: Number,
        default: 100
      },
      // 当作为包裹元素时，可以自定义描述文案
      tip: String,

      // 是否为加载中状态
      loading: Boolean,
      // 充满父容器
      fit: Boolean
    },
    data() {
      this.timerId = null
      return {
        isDelayOver: false
      }
    },
    watch: {
      loading: {
        immediate: true,
        handler(val) {
          val && this.setupLoading()
        }
      }
    },
    computed: {
      spinClasses() {
        return {
          [`is-${this.size}`]: !!this.size
        }
      },
      wrapperClasses() {
        return {
          'my-spin--nested': !!this.$slots.default,
          'is-fit': this.fit
        }
      },
      containerClasses() {
        return {
          'is-blur': (this.loading && this.isDelayOver)
        }
      }
    },
    methods: {
      setupLoading() {
        clearTimeout(this.timerId)
        this.isDelayOver = false
        if (this.delay > 0) {
          this.timerId = setTimeout(() => {
            this.isDelayOver = true
          }, this.delay)
        } else {
          this.isDelayOver = true
        }
      }
    },
    beforeDestroy() {
      clearTimeout(this.timerId)
    }
  }
</script>
