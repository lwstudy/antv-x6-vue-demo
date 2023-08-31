import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

export default {
  props: {
    // 弹出层的最小宽度
    minWidth: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      visible: false,
      popoverWidth: this.minWidth
    }
  },
  methods: {
    updatePopoverWidth() {
      if (this.$refs.reference) {
        const width = this.$refs.reference.getBoundingClientRect().width
        this.popoverWidth = Math.max(width, this.minWidth)
      } else {
        this.popoverWidth = this.minWidth
      }
      if (this.$refs.popover) {
        this.$refs.popover.updatePopper()
      }
    },
    handleShow() {
      this.$emit('show')
    },
    handleHide() {
      this.$emit('hide')
    }
  },
  mounted() {
    this.updatePopoverWidth()
    addResizeListener(this.$refs.reference, this.updatePopoverWidth)
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.reference, this.updatePopoverWidth)
  }
}
