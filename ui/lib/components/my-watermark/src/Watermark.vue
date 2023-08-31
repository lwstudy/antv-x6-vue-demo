<template>
  <div :class="classes" :style="styles">
    <slot></slot>
    <canvas ref="canvas"
            :width="width"
            :height="height"
            style="display:none"></canvas>
    <div v-if="mask" class="my-watermark__mask" :style="maskStyle"></div>
  </div>
</template>


<script>
  /**
   * 水印组件
   * @module $ui/components/my-watermark
   */
  export default {
    name: 'MyWatermark',
    /**
     * 属性参数
     * @member props
     * @property {String|Array} text 水印文字, 多行文本可以传数组
     * @property {Number} [lineHeight=10] 行距，多行文本有效
     * @property {Number} [width=200] 画布的宽度
     * @property {Number} [height=200] 画布的高度
     * @property {String} [font] 水印文字的字体
     * @property {Number} [rotate] 文字旋转角度，默认：-20
     * @property {String} [color] 水印文字字体颜色 默认：rgba(100, 100, 100, 0.1)
     * @property {Number} [x] 文字在画布的坐标x
     * @property {Number} [y] 文字在画布的坐标y
     * @property {Boolean} [mask] mask 遮罩模式
     */
    props: {
      disabled: Boolean,
      text: {
        type: [String, Array],
        default: ''
      },
      lineHeight: {
        type: Number,
        default: 10
      },
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 300
      },
      font: {
        type: String,
        default: '20px 黑体'
      },
      rotate: {
        type: Number,
        default: -20
      },
      color: {
        type: String,
        default: 'rgba(100, 100, 100, 0.1)'
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 100
      },
      mask: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dataUrl: null
      }
    },
    computed: {
      classes() {
        return {
          'my-watermark': true,
          'is-mask': this.mask,
          'is-disabled': this.disabled
        }
      },
      styles() {
        if (!this.dataUrl || this.mask || this.disabled) return null

        return {
          backgroundImage: `url(${this.dataUrl})`
        }
      },
      maskStyle() {
        if (!this.dataUrl || !this.mask || this.disabled) return null

        return {
          backgroundImage: `url(${this.dataUrl})`
        }
      }
    },
    methods: {
      draw() {
        if (!this.text) return
        const textArray = [].concat(this.text)
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        const rotate = this.rotate * Math.PI / 180
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.rotate(rotate)
        ctx.font = this.font
        ctx.fillStyle = this.color
        const fontSize = parseInt(ctx.font) || 20
        textArray.forEach((text, index) => {
          const y = this.y + (fontSize + this.lineHeight) * index
          ctx.fillText(text, this.x, y)
        })
        this.dataUrl = ctx.canvas.toDataURL()
      },
      reset() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, this.width, this.height)
        const rotate = this.rotate * Math.PI / 180
        ctx.rotate(-rotate)
      }
    },
    watch: {
      text() {
        this.reset()
        this.draw()
      }
    },
    mounted() {
      !this.disabled && this.draw()
    }
  }
</script>


