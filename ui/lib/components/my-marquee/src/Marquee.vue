<template>
  <div class="my-marquee"
       :class="classes"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave">
    <div class="my-marquee__scroll" :style="scrollStyle">
      <div ref="content" class="my-marquee__content">
        <slot></slot>
      </div>
      <div class="my-marquee__copy-content" v-html="copyHtml"></div>
    </div>
  </div>
</template>

<script>
  /**
   * 无缝滚动
   * @module $ui/components/my-marquee
   */

  import {requestAnimationFrame, cancelAnimationFrame} from '$ui/utils/util'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，放置滚动内容
   */
  export default {
    name: 'MyMarquee',
    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 滚动数据，用作监听数据变更，更新html
     * @property {Boolean} [disabled] 禁用
     * @property {string} [direction=up] 滚动方向，可选'up', 'down', 'left', 'right'
     * @property {boolean} [auto=true] 自动开始
     * @property {number} [speed=1] 滚动速度，数值越大速度越快
     * @property {number} [waitTime=3000] 间隔滚动停顿等待时间
     * @property {number} [scrollLength=0] 间隔滚动，每次滚动的长度，单位px
     *
     */
    props: {
      // 滚动数据
      data: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: Boolean,
      // 滚动方向
      direction: {
        type: String,
        default: 'up',
        validator(val) {
          return ['up', 'down', 'left', 'right'].includes(val)
        }
      },
      // 自动开始
      auto: {
        type: Boolean,
        default: true
      },
      // 滚动速度，数值越大速度越快
      speed: {
        type: Number,
        default: 1
      },
      // 间隔滚动停顿等待时间
      waitTime: {
        type: Number,
        default: 3000
      },
      // 间隔滚动，每次滚动的长度，单位px
      scrollLength: Number
    },
    data() {
      this.timerId = null
      return {
        copyHtml: '',
        contentWidth: 0,
        contentHeight: 0,
        scrollPosition: 0,
        isPause: false
      }
    },
    computed: {
      isHorizontal() {
        return ['left', 'right'].includes(this.direction)
      },
      classes() {
        return {
          'my-marquee--horizontal': this.isHorizontal,
          'is-disabled': this.disabled
        }
      },
      scrollStyle() {
        return {
          transform: this.isHorizontal
            ? `translate3d(-${this.scrollPosition}px, 0, 0)`
            : `translate3d(0, -${this.scrollPosition}px, 0)`,
          width: this.isHorizontal ? `${2 * this.contentWidth}px` : '100%'
        }
      }
    },
    watch: {
      data: {
        immediate: true,
        handler() {
          this.$nextTick(this.renderCopyHtml)
        }
      },
      disabled(val) {
        this.stop()
        if (val) {
          this.copyHtml = ''
          this.scrollPosition = 0
        } else {
          this.$nextTick(this.renderCopyHtml)
          this.auto && this.start()
        }
      }
    },
    methods: {
      renderCopyHtml() {
        if (!this.$refs.content || this.disabled) return
        this.copyHtml = this.$refs.content.innerHTML
        this.updateView()
      },
      updateView() {
        if (!this.$refs.content) return
        const rect = this.$refs.content.getBoundingClientRect()
        // 内容必须要撑开高度宽度
        this.contentHeight = rect.height
        this.contentWidth = rect.width
        this.$emit('resize', rect, this)
      },
      /**
       * 开始滚动
       * @method start
       */
      start() {
        this.isPause = false
        switch (this.direction) {
          case 'up':
            this.scrollPosition = this.scrollPosition || 0
            this.scrollUp()
            break;
          case 'down':
            this.scrollPosition = this.scrollPosition || this.contentHeight
            this.scrollDown()
            break;
          case 'left':
            this.scrollPosition = this.scrollPosition || 0
            this.scrollLeft()
            break;
          case 'right':
            this.scrollPosition = this.scrollPosition || this.contentWidth
            this.scrollRight()
            break;
        }
      },
      /**
       * 停止
       * @method stop
       */
      stop() {
        this.timerId && cancelAnimationFrame(this.timerId)
        this.resumeId && clearTimeout(this.resumeId)
      },
      /**
       * 暂停
       * @method pause
       */
      pause() {
        this.isPause = true
      },
      scrollUp() {
        this.timerId = requestAnimationFrame(() => {
          if (this.isPause) return
          this.scrollPosition += this.speed
          if (this.resume()) {
            this.isPause = true
            return;
          }
          if (this.scrollPosition >= this.contentHeight) {
            this.scrollPosition = 0
          }
          this.scrollUp()
        })
      },
      scrollDown() {
        this.timerId = requestAnimationFrame(() => {
          if (this.isPause) return
          this.scrollPosition -= this.speed
          if (this.resume()) {
            this.isPause = true
            return;
          }
          if (this.scrollPosition <= 0) {
            this.scrollPosition = this.contentHeight
          }
          this.scrollDown()
        })
      },
      scrollLeft() {
        this.timerId = requestAnimationFrame(() => {
          if (this.isPause) return
          this.scrollPosition += this.speed
          if (this.resume()) {
            this.isPause = true
            return;
          }
          if (this.scrollPosition >= this.contentWidth) {
            this.scrollPosition = 0
          }
          this.scrollLeft()
        })
      },
      scrollRight() {
        this.timerId = requestAnimationFrame(() => {
          if (this.isPause) return
          this.scrollPosition -= this.speed
          if (this.resume()) {
            this.isPause = true
            return;
          }
          if (this.scrollPosition <= 0) {
            this.scrollPosition = this.contentWidth
          }
          this.scrollRight()
        })
      },
      resume() {
        const value = Math.floor(this.scrollPosition) % this.scrollLength
        const match = value === 0
        if (match) {
          this.resumeId && clearTimeout(this.resumeId)
          this.resumeId = setTimeout(this.start, this.waitTime)
        }
        return match

      },
      handleMouseEnter() {
        this.stop()
        this.isPause = true
      },
      handleMouseLeave() {
        this.start()
      }
    },
    mounted() {
      (this.auto && !this.disabled) && this.start()
    },
    beforeDestroy() {
      this.stop()
      this.copyHtml = ''
    }
  }
</script>

