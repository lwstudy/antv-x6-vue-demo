import {on, off, setStyle} from 'element-ui/lib/utils/dom'
import {throttle} from '$ui/utils/util'

export default {
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    disabled: {
      type: Boolean,
      default: true
    },
    lock: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0
    }
  },
  computed: {
    baseRate() {
      return this.height ? (this.width / this.height) : 0
    },
    rate() {
      return this.clientHeight ? (this.clientWidth / this.clientHeight) : 0
    },
    zoom() {
      let zoom = 1
      // 禁用
      if (this.disabled) return zoom

      // 扁的
      if (this.rate > this.baseRate) {
        zoom = this.clientHeight / this.height
      }
      // 长的
      if (this.rate < this.baseRate) {
        zoom = this.clientWidth / this.width
      }
      return zoom
    },
    widthRate() {
      return this.clientWidth / this.width
    },
    heightRate() {
      return this.clientHeight / this.height
    },
    left() {
      return -(this.width - this.clientWidth) / 2
    },
    top() {
      return -(this.height - this.clientHeight) / 2
    }
  },
  watch: {
    clientWidth() {
      this.proxySetStyle()
    },
    clientHeight() {
      this.proxySetStyle()
    }
  },
  methods: {
    clientResize() {
      this.clientWidth = document.documentElement.clientWidth
      this.clientHeight = document.documentElement.clientHeight
    },
    setStyle() {
      if (this.lock) {
        setStyle(document.documentElement, 'zoom', this.zoom)
      } else {
        setStyle(document.documentElement,
          {
            transform: `scaleX(${this.widthRate}) scaleY(${this.heightRate})`
          })
        setStyle(document.body, {
          transform: `translate(${this.left}px, ${this.top}px)`
        })
      }
    },
    initScale() {
      if (this.disabled) return
      this.clientResize()
      on(window, 'resize', this.clientResize)
    }
  },
  created() {
    this.proxySetStyle = throttle(this.setStyle, this, true)
    this.initScale()

  },
  beforeDestroy() {
    off(window, 'resize', this.clientResize)
    setStyle(document.documentElement, 'zoom', 'initial')
  }
}
