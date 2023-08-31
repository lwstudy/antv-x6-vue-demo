import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

export default {
  data() {
    return {
      startRowIndex: 0,
      viewportHeight: 0,
      startOffset: 0
    }
  },
  computed: {
    isVirtual() {
      return this.mode === 'virtual'
    },
    startIndex() {
      return this.startRowIndex * this.currentColumn
    },
    endIndex() {
      const index = this.startIndex + this.viewRows * this.currentColumn
      return Math.min(this.list.length - 1, index)
    },
    // 可视区的数据项
    viewItems() {
      return this.list.slice(this.startIndex, this.endIndex + 1)
    },
    // 在可视区的行数
    viewRows() {
      if (this.itemHeight > 0) {
        // 增加多一行为了过渡不出现间隙
        return Math.ceil(this.viewportHeight / this.itemHeight) + 1
      }
      return 0
    },
    // 总行数
    rows() {
      return Math.ceil(this.list.length / this.currentColumn)
    },
    // 内容总高度
    contentHeight() {
      // 由于viewRows增加多了一行，总高度需要减少一行
      return this.rows * this.itemHeight - this.itemHeight
    },
    contentStyle() {
      const offset = this.startRowIndex * this.itemHeight
      return {
        webkitTransform: `translate3d(0, ${offset}px, 0)`,
        transform: `translate3d(0, ${offset}px, 0)`
      }
    }
  },
  methods: {
    updateViewport() {
      if (this.$refs.viewport) {
        this.viewportHeight = this.$refs.viewport.getBoundingClientRect().height
      }
    },
    virtualLoaded(res) {
      this.list = Object.freeze(res.list || [])
    },
    handleVirtualScroll(e) {
      if (!this.isVirtual || !this.itemHeight) return
      this.startOffset = e.target.scrollTop
      this.startRowIndex = Math.floor(this.startOffset / this.itemHeight)
    }
  },
  mounted() {
    if (this.isVirtual) {
      addResizeListener(this.$refs.viewport, this.updateViewport)
      if (!this.itemHeight || this.itemHeight <= 0) {
        console.warn('MyList组件在virtual模式时需要设置itemHeight属性')
      }
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.viewport, this.updateViewport)
  }
}
