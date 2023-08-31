<template>
  <div class="my-revolve">
    <canvas :width="width" :height="height" ref="canvas"></canvas>
    <el-progress v-if="!loaded"
                 class="my-revolve__progress"
                 type="circle"
                 :percentage="percentage"></el-progress>
  </div>
</template>

<script>

  /**
   * 3D旋转组件
   * @author chenhuachun
   *
   * @module $ui/components/my-revolve
   *
   */

  import {on, off} from 'element-ui/lib/utils/dom'

  export default {
    name: 'MyRevolve',
    /**
     * 属性参数
     * @member props
     * @property {String[]} [data] 动画帧图片数组
     * @property {number} [width=400] 画布宽度
     * @property {number} [height=500] 画布高度
     * @property {boolean} [auto=false] 自动转动
     * @property {number} [interval=125] 自动旋转速度，每帧的切换时间，值越小越快，
     * @property {boolean} [manual=true] 可鼠标控制转动
     * @property {number} [step=0] 自动转动几帧后停顿，0表示不停顿
     * @property {number} [wait=2000] 停顿的时间，单位ms
     *
     */
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 500
      },
      // 启动旋转
      auto: Boolean,

      // 手动鼠标控制转
      manual: {
        type: Boolean,
        default: true
      },

      // 旋转速度，值越小越快
      interval: {
        type: Number,
        default: 1000 / 8
      },
      // 转几张后等待时间
      wait: {
        type: Number,
        default: 2000
      },
      // 转几张后暂停等待, 大于0启用
      step: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        loaded: false,
        images: [],
        currentIndex: 0,
        progress: 0,
        timer: null,
        delayTimer: null,
        // 手动鼠标控制
        mouseControlX: null,
        mouseControlling: false
      }
    },
    computed: {
      percentage() {
        if (!this.data.length) return 0
        return Math.floor(this.progress * 100 / this.data.length)
      }
    },
    watch: {
      currentIndex() {
        this.draw()
      }
    },
    methods: {
      preload() {
        const total = this.data.length
        if (this.loaded) {
          /**
           * 图片预加载完成时触发
           * @event loaded
           */
          this.$emit('loaded')
          return
        }
        this.data.forEach(n => {
          const img = new Image()
          this.images.push(img)
          img.onload = () => {
            ++this.progress
            /**
             * 预加载图片进度
             * @event progress
             * @param {number} progress 已完成几张
             * @param {number} total 总数
             */
            this.$emit('progress', this.progress, total)
            if (this.progress === total) {
              this.loaded = true
              this.$emit('loaded')
            }
          }
          img.src = n
        })
      },
      draw() {
        const img = this.images[this.currentIndex]
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.drawImage(img, 0, 0, this.width, this.height);
      },
      delayStart() {
        this.delayTimer && clearTimeout(this.delayTimer)
        this.delayTimer = setTimeout(this.start, this.wait)
      },
      change() {
        if (this.mouseControlling) return
        ++this.currentIndex
        if (this.currentIndex >= this.data.length) {
          this.currentIndex = 0
        }
        /**
         * 帧切换时触发
         * @event change
         * @param {number} currentIndex 帧索引
         */
        this.$emit('change', this.currentIndex)
        if (this.step > 0 && this.currentIndex % this.step === 0) {
          this.stop()
          this.delayStart()
        }

      },
      /**
       * 开始转动
       * @method start
       */
      start() {
        this.timer = setInterval(this.change, this.interval)
        /**
         * 开始转动时触发
         * @event start
         */
        this.$emit('start')
      },
      /**
       * 停止转动
       * @method stop
       */
      stop() {
        this.delayTimer && clearTimeout(this.delayTimer)
        this.timer && clearInterval(this.timer)
        /**
         * 停止转动时触发
         * @event stop
         */
        this.$emit('stop')
      },
      /**
       * 下一帧
       * @method next
       */
      next() {
        ++this.currentIndex
        if (this.currentIndex >= this.data.length) {
          this.currentIndex = 0
        }
      },
      /**
       * 上一帧
       * @method prev
       */
      prev() {
        --this.currentIndex
        if (this.currentIndex < 0) {
          this.currentIndex = this.data.length - 1
        }
      },
      getPointOnCanvas(canvas, x, y) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: x - rect.left * (canvas.width / rect.width),
          y: y - rect.top * (canvas.height / rect.height)
        }
      },
      handleMouseDown(e) {
        const x = e.pageX;
        const y = e.pageY;
        const canvas = event.target;
        const loc = this.getPointOnCanvas(canvas, x, y);
        this.mouseControlX = loc.x
        this.mouseControlling = true
        this.stop()
      },
      handleMouseUp(e) {
        if (!this.mouseControlling) return
        this.mouseControlX = -1
        this.mouseControlling = false
        this.auto && this.start()
      },
      handleMouseMove(e) {
        if (!this.mouseControlling) return
        const x = e.pageX;
        const y = e.pageY;
        const canvas = event.target;
        const loc = this.getPointOnCanvas(canvas, x, y);
        const total = this.data.length
        const diff = 50
        let count = Math.floor(Math.abs((this.mouseControlX - loc.x) / diff));
        let frameIndex = Math.floor((this.mouseControlX - loc.x) / diff);

        while (count > 0) {
          count--
          if (frameIndex > 0) {
            frameIndex--
            this.currentIndex++
          } else if (frameIndex < 0) {
            frameIndex++
            this.currentIndex--
          } else if (frameIndex === 0) {
            break;
          }

          if (this.currentIndex >= total) {
            this.currentIndex = 0
          }
          if (this.currentIndex < 0) {
            this.currentIndex = total - 1
          }

        }

      }
    },
    mounted() {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      this.$on('loaded', () => {
        this.draw()
        this.auto && this.start()
      })
      this.preload()
      if (this.manual) {
        on(canvas, 'mousedown', this.handleMouseDown)
        on(canvas, 'mousemove', this.handleMouseMove)
        on(canvas, 'mouseup', this.handleMouseUp)
      }
    },
    beforeDestroy() {
      const canvas = this.$refs.canvas
      this.delayTimer && clearTimeout(this.delayTimer)
      this.stop()
      this.$off('loaded')
      off(canvas, 'mousedown', this.handleMouseDown)
      off(canvas, 'mousemove', this.handleMouseMove)
      off(canvas, 'mouseup', this.handleMouseUp)
    }
  }
</script>

