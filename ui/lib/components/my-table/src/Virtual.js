import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
import {on, off, setStyle} from 'element-ui/lib/utils/dom'

// 表格尺寸对应行的高度
const SizeHeight = {
  default: 48,
  medium: 44,
  small: 41,
  mini: 37
}

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
    rowHeight() {
      return this.itemHeight || SizeHeight[this.$attrs.size] || SizeHeight.default
    },
    startIndex() {
      return this.startRowIndex
    },
    endIndex() {
      const index = this.startIndex + this.viewRows
      return Math.min(this.list.length - 1, index)
    },
    // 可视区的数据项
    viewItems: {
      get() {
        return this.list.slice(this.startIndex, this.endIndex + 1)
      },
      set(val) {
        const list = [...this.list]
        list.splice(this.startIndex, this.endIndex + 1 - this.startIndex, ...val)
        this.list = this.freeze ? Object.freeze(list) : list
      }
    },
    // 在可视区的行数
    viewRows() {
      if (this.rowHeight > 0) {
        // 增加多一行为了过渡不出现间隙
        return Math.ceil(this.viewportHeight / this.rowHeight) + 1
      }
      return 0
    },
    // 总行数
    rows() {
      return this.list.length
    },
    // 内容总高度
    contentHeight() {
      // 由于viewRows增加多了一行，总高度需要减少一行
      return this.rows * this.rowHeight - this.rowHeight
    },
    contentStyle() {
      const offset = this.startRowIndex * this.rowHeight
      return {
        webkitTransform: `translate(0, ${offset}px)`,
        transform: `translate(0, ${offset}px)`
      }
    }
  },
  watch: {
    contentStyle(style) {
      this.$nextTick(() => this.updateTableContentStyle(style))
    },
    contentHeight() {
      this.$nextTick(this.setPlaceholder)
    }
  },
  methods: {
    updateViewport() {
      const bodyWrapper = this.$refs.elTable.$refs.bodyWrapper
      if (bodyWrapper) {
        this.viewportHeight = bodyWrapper.getBoundingClientRect().height
      }
    },
    updateTableContentStyle(style) {
      const {bodyWrapper, fixedBodyWrapper, rightFixedBodyWrapper} = this.$refs.elTable.$refs
      if (!this.tableBody && bodyWrapper) {
        this.tableBody = bodyWrapper.querySelector('.el-table__body')
      }
      if (!this.fixedTableBody && fixedBodyWrapper) {
        this.fixedTableBody = fixedBodyWrapper.querySelector('.el-table__body')
      }
      if (!this.rightFixedTableBody && rightFixedBodyWrapper) {
        this.rightFixedTableBody = rightFixedBodyWrapper.querySelector('.el-table__body')
      }
      if (this.tableBody) {
        setStyle(this.tableBody, style)
      }
      if (this.fixedTableBody) {
        setStyle(this.fixedTableBody, style)
      }
      if (this.rightFixedTableBody) {
        setStyle(this.rightFixedTableBody, style)
      }
    },
    createPlaceholder(wrapper) {
      const div = document.createElement('div')
      div.style.height = `${this.contentHeight}px`
      div.classList.add('my-table__placeholder')
      wrapper.appendChild(div)
      return div
    },
    setPlaceholder() {
      const {bodyWrapper, fixedBodyWrapper, rightFixedBodyWrapper} = this.$refs.elTable.$refs
      if (!this.bodyPlaceholder && bodyWrapper) {
        this.bodyPlaceholder = this.createPlaceholder(bodyWrapper)
      }
      if (!this.fixedPlaceholder && fixedBodyWrapper) {
        this.fixedPlaceholder = this.createPlaceholder(fixedBodyWrapper)
      }
      if (!this.rightFixedPlaceholder && rightFixedBodyWrapper) {
        this.rightFixedPlaceholder = this.createPlaceholder(rightFixedBodyWrapper)
      }
      const height = `${this.contentHeight}px`
      if (this.bodyPlaceholder) {
        setStyle(this.bodyPlaceholder, 'height', height)
      }
      if (this.fixedPlaceholder) {
        setStyle(this.fixedPlaceholder, 'height', height)
      }
      if (this.rightFixedPlaceholder) {
        setStyle(this.rightFixedPlaceholder, 'height', height)
      }

    },
    disposePlaceholder() {
      if (this.bodyPlaceholder) {
        this.bodyPlaceholder.parentNode.removeChild(this.bodyPlaceholder)
        this.bodyPlaceholder = null
      }
      if (this.fixedPlaceholder) {
        this.fixedPlaceholder.parentNode.removeChild(this.fixedPlaceholder)
        this.fixedPlaceholder = null
      }
      if (this.rightFixedPlaceholder) {
        this.rightFixedPlaceholder.parentNode.removeChild(this.rightFixedPlaceholder)
        this.rightFixedPlaceholder = null
      }
    },
    virtualLoaded(res) {
      this.list = Object.freeze(res.list || [])
    },
    handleVirtualScroll(e) {
      if (!this.isVirtual) return
      this.startOffset = e.target.scrollTop
      this.startRowIndex = Math.floor(this.startOffset / this.rowHeight)
    }
  },
  mounted() {
    if (this.isVirtual) {
      const bodyWrapper = this.$refs.elTable.$refs.bodyWrapper
      if (bodyWrapper) {
        addResizeListener(bodyWrapper, this.updateViewport)
        on(bodyWrapper, 'scroll', this.handleVirtualScroll)
      }
      this.setPlaceholder()
    }
  },
  beforeDestroy() {
    if (this.isVirtual) {
      const bodyWrapper = this.$refs.elTable.$refs.bodyWrapper
      if (bodyWrapper) {
        removeResizeListener(bodyWrapper, this.updateViewport)
        off(bodyWrapper, 'scroll', this.handleVirtualScroll)
      }
      this.disposePlaceholder()
    }
  }
}
