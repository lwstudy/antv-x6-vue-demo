<template>
  <transition-group tag="div" :class="classes" :name="name">
    <div v-if="isInit" class="my-lazy__component" key="component">
      <slot></slot>
    </div>
    <div v-else key="skeleton" class="my-lazy__skeleton">
      <slot name="skeleton"></slot>
    </div>
  </transition-group>
</template>

<script>

  /**
   * 懒加载组件
   * @module $ui/components/my-lazy
   */

  import {requestAnimationFrame} from '$ui/utils/util'

  // 该组件依赖 IntersectionObserver API，如需在较低版本浏览器运行，需要引入 IntersectionObserver API polyfill
  // https://github.com/w3c/IntersectionObserver/tree/master/polyfill

  if (typeof window !== 'undefined' && !window.IntersectionObserver) {
    require('intersection-observer');
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 需要懒加载的内容
   * @property {string} skeleton 骨架内容
   */

  export default {
    name: 'MyLazy',
    /**
     * 属性参数
     * @member props
     * @property {string} [name=my-lazy] transition名称，用来定制动画
     * @property {boolean} [fit=false] 适配父容器
     * @property {number} [timeout]  等待时间，如果指定了时间，不论可见与否，在指定时间之后自动加载
     * @property {HTMLElement} [viewport] 组件所在的视口，如果组件是在页面容器内滚动，视口就是该容器
     * @property {number|string} [threshold=0] 预加载阈值
     * @property {string} [direction=vertical] 视口的滚动方向, vertical代表垂直方向，horizontal代表水平方向
     */
    props: {
      name: {
        type: String,
        default: 'my-lazy'
      },
      // 适配父容器
      fit: Boolean,
      // 等待时间，如果指定了时间，不论可见与否，在指定时间之后自动加载
      timeout: Number,
      // 组件所在的视口，如果组件是在页面容器内滚动，视口就是该容器
      viewport: {
        type: typeof window !== 'undefined' ? window.HTMLElement : Object,
        default() {
          return null
        }
      },
      // 预加载阈值
      threshold: {
        type: [String, Number],
        default: 0
      },
      // 视口的滚动方向, vertical代表垂直方向，horizontal代表水平方向
      direction: {
        type: String,
        default: 'vertical',
        validator(val) {
          return ['vertical', 'horizontal'].includes(val)
        }
      },
      maxWaitingTime: {
        type: Number,
        default: 100
      }
    },
    data() {
      this.timerId = null
      this.io = null
      return {
        isInit: false
      }
    },
    computed: {
      classes() {
        return {
          'my-lazy': true,
          'is-fit': this.fit
        }
      }
    },
    methods: {
      // 交叉情况变化处理函数
      intersectionHandler(entries) {
        if (
          // 正在交叉
          entries[0].isIntersecting ||
          // 交叉率大于0
          entries[0].intersectionRatio > 0
        ) {
          this.init()
          this.io.unobserve(this.$el)
        }
      },
      // 处理组件和骨架组件的切换
      init() {
        // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
        // 所以在requestAnimationFrame回调中延后执行
        this.requestAnimationFrame(() => {
          this.isInit = true
          /**
           * 开始加载懒加载模块，此时骨架组件开始消失
           * @event init
           */
          this.$emit('init')
        })
      },
      requestAnimationFrame(callback) {
        // 防止等待太久没有执行回调
        // 设置最大等待时间
        setTimeout(() => {
          if (this.isInit) return
          callback()
        }, this.maxWaitingTime)
        // 兼容不支持requestAnimationFrame 的浏览器
        return requestAnimationFrame(callback)
      }
    },
    mounted() {
      if (this.timeout) return
      // 根据滚动方向来构造视口外边距，用于提前加载
      let rootMargin
      switch (this.direction) {
        case 'vertical':
          rootMargin = `${parseInt(this.threshold)}px 0px`
          break
        case 'horizontal':
          rootMargin = `0px ${parseInt(this.threshold)}px`
          break
      }
      try {
        // 观察视口与组件容器的交叉情况
        this.io = new window.IntersectionObserver(this.intersectionHandler, {
          rootMargin,
          root: this.viewport,
          threshold: [0, Number.MIN_VALUE, 0.01]
        });
        this.io.observe(this.$el);
      } catch (e) {
        this.init()
      }

    },
    created() {
      // 如果指定timeout则无论可见与否都是在timeout之后初始化
      if (this.timeout) {
        this.timer = setTimeout(() => {
          this.init()
        }, this.timeout)
      }
    },
    beforeDestroy() {
      // 在组件销毁前取消观察
      this.io && this.io.unobserve(this.$el)
      this.timer && clearTimeout(this.timer)

    }

  }
</script>

