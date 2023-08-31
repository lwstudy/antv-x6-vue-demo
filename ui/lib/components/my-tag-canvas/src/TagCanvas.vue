<template>
  <div :style="styles">
    <canvas :id="canvasId" :width="canvasWidth" :height="canvasHeight">
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <a @click.prevent="handleClick(item)"
             :title="item.title"
             :style="{color:item.color, ...item.style}"
             :class="item.className">
            <slot :item="item">
              <img v-if="item.image" :src="item.image" :alt="item.text">
              <span v-else>{{item.text}}</span>
            </slot>
          </a>
        </li>
      </ul>
    </canvas>
  </div>

</template>

<script>
  import TagCanvas from './tagcanvas'
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

  /**
   * 标签云组件
   * @module $ui/components/my-tag-canvas
   */


  export default {
    name: 'MyTagCanvas',
    /**
     * 属性参数
     * @member props
     * @property {Array} data 标签数据，数据项包含属性 {text, color, image, style, className, title}
     * @property {string} data.text 标签文本
     * @property {string} data.color 标签样式，需要对每一个标签定义颜色时可设置
     * @property {string} data.image 图片形式的标签
     * @property {string} [width=100%] 画布宽度
     * @property {string} [height=100%] 画布高度
     * @property {object} [options] TagCanvas 配置选项， 参考：http://www.goat1000.com/tagcanvas-options.php
     */
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      options: {
        type: Object
      }
    },
    data() {
      return {
        canvasWidth: null,
        canvasHeight: null
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.reload()
        })
      },
      options: {
        handler() {
          this.update()
        }
      }
    },
    computed: {
      canvasId() {
        return `tag-canvas-${this._uid}`
      },
      styles() {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    methods: {
      handleClick(item) {
        /**
         * 点击时触发
         * @event click
         * @param {Object} item 数据项
         */
        this.$emit('click', item)
      },
      setCanvasSize() {
        const rect = this.$el.getBoundingClientRect()
        this.canvasWidth = rect.width
        this.canvasHeight = rect.height
      },
      start() {
        TagCanvas.Start(this.canvasId, null, this.options)
      },
      pause() {
        TagCanvas.Pause(this.canvasId)
      },
      resume() {
        TagCanvas.Resume(this.canvasId)
      },
      reload() {
        TagCanvas.Reload(this.canvasId)
      },
      update() {
        TagCanvas.Update(this.canvasId)
      },
      tagToFront(options) {
        TagCanvas.TagToFront(this.canvasId, options)
      },
      rotateTag(options) {
        TagCanvas.RotateTag(this.canvasId, options)
      },
      setSpeed(speed) {
        TagCanvas.SetSpeed(this.canvasId, speed)
      }
    },
    mounted() {
      this.proxySetCanvasSize = this.setCanvasSize.bind(this)
      addResizeListener(this.$el, this.proxySetCanvasSize)
      this.setCanvasSize()
      this.start()
    },
    beforeDestroy() {
      removeResizeListener(this.$el, this.proxySetCanvasSize)
      TagCanvas.Delete(this.canvasId)
    }
  }
</script>
