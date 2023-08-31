<template>
  <component :is="tag" class="my-promise" :class="classes">
    <slot v-if="$scopedSlots.combine" name="combine" v-bind="combine"></slot>
    <slot v-if="$scopedSlots.pending && !resolved && isDelayElapsed" name="pending" v-bind="data"></slot>
    <slot v-if="resolved && !error" v-bind="data"></slot>
    <slot v-if="$scopedSlots.error && error" name="error" :error="error"></slot>
  </component>
</template>

<script>
  /**
   * 异步数据组件
   * @module $ui/components/my-promise
   */

  /**
   * 作用域插槽
   * @member scopedSlots
   * @property {string} [default] 默认插槽，请求成功响应数据显示的内容，回调参数 data：resolve的数据
   * @property {string} [pending] 定义请求等待中显示内容，通常做loading效果，回调参数 data：上次resolve的数据
   * @property {string} [error] 定义请求失败后的显示内容，回调参数 error: reject数据
   * @property {string} [combine] 全部状态合并成一个插槽定义，回调参数 pending，data， error，delayOver
   */
  export default {
    name: 'MyPromise',
    /**
     * 属性参数
     * @member props
     * @property {string} [tag=span] 容器标签名
     * @property {Promise} [promise] Promise实例
     * @property {Number} [delay=200] 延时显示loading，即pending时间大于这个时间才会显示
     */
    props: {
      // 容器标签
      tag: {
        type: String,
        default: 'span'
      },
      // Promise
      promise: {
        type: [Object, Promise],
        validator(p) {
          return p && typeof p.then === 'function' && typeof p.catch === 'function'
        }
      },
      // 延时显示loading
      delay: {
        type: Number,
        default: 200
      }
    },
    data() {
      this.timerId = null
      return {
        resolved: false,
        data: null,
        error: null,
        isDelayElapsed: false
      }
    },
    computed: {
      classes() {
        return {
          'is-pending': !this.resolved,
          'is-error': !!this.error,
          'is-done': this.resolved
        }
      },
      combine() {
        return {
          pending: !this.resolved,
          data: this.data,
          error: this.error,
          delayOver: this.isDelayElapsed
        }
      }
    },
    watch: {
      promise: {
        immediate: true,
        handler(promise) {
          this.handlePromise(promise)
        }
      }
    },
    methods: {
      setupDelay() {
        if (this.delay > 0) {
          this.isDelayElapsed = false
          this.timerId && clearTimeout(this.timerId)
          this.timerId = setTimeout(() => {
            this.isDelayElapsed = true
          }, this.delay)
        } else {
          this.isDelayElapsed = true
        }
      },
      handlePromise(promise) {
        this.resolved = false;
        this.error = null
        if (!promise) {
          this.data = null
          this.isDelayElapsed = false
          this.timerId && clearTimeout(this.timerId)
          this.timerId = null
          return
        }
        this.setupDelay()
        promise.then(data => {
          // 确保是一致的，有可能在未resolved时，promise已经发生了变化
          if (this.promise === promise) {
            this.data = data
            this.resolved = true
          }
        }).catch(err => {
          if (this.promise === promise) {
            this.error = err
            this.resolved = true
          }
        })
      }
    },
    beforeDestroy() {
      this.timerId && clearTimeout(this.timerId)
    }
  }
</script>

