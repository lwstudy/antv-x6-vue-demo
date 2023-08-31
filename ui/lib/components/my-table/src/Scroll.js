import {getScrollContainer, on, off} from 'element-ui/lib/utils/dom'
import {debounce} from '$ui/utils/util'

export default {

  computed: {
    isScroll() {
      return this.mode === 'scroll'
    },
    pageCount() {
      return Math.ceil(this.currentTotal / this.currentPageSize)
    },
    isNoMore() {
      return this.pageCount < this.currentPage
    },
    scrollDisabled() {
      // 只对 scroll 模式有效
      if (!this.isScroll) return true
      if (this.currentLoading) return true
      return this.isNoMore
    }
  },
  methods: {
    scrollLoaded(res) {
      const list = this.list.concat(res.list || [])
      this.list = this.freeze ? Object.freeze(list) : list
      if (this.isNoMore) {
        /**
         * 滚动加载结束时触发
         * @event complete
         */
        this.$emit('complete')
      }
      ++this.currentPage
    },
    getScrollContainer() {
      const bodyWrapper = this.$refs.elTable.$refs.bodyWrapper
      if (this.fit) {
        return bodyWrapper
      }
      return getScrollContainer(bodyWrapper, true)
    },
    handleScroll(e) {
      const target = e.target
      this.lastScrollTop = this.lastScrollTop || 0
      const dir = target.scrollTop - this.lastScrollTop > 0 ? 'down' : 'up'
      const scrollDistance = target.scrollHeight - target.scrollTop - target.clientHeight
      if (dir === 'down' && scrollDistance <= this.scrollDistance) {
        if (!this.scrollDisabled) {
          this.load()
        }
      }
      // 记下滚动条的位置
      this.lastScrollTop = target.scrollTop
    },
    /**
     * 设置滚动条位置
     * @method scrollTop
     * @param val
     */
    scrollTop(val) {
      const scrollContainer = this.getScrollContainer()
      scrollContainer.scrollTop = typeof val === 'undefined'
        ? (scrollContainer.scrollTop || this.lastScrollTop || 0)
        : (val || 0)
    }
  },
  mounted() {
    if (!this.isScroll) return
    this.proxyHandleScroll = debounce(this.handleScroll, this.scrollDelay, false, this)
    const scrollContainer = this.getScrollContainer()
    on(scrollContainer, 'scroll', this.proxyHandleScroll)
  },
  beforeDestroy() {
    if (!this.isScroll) return
    const scrollContainer = this.getScrollContainer()
    this.proxyHandleScroll && off(scrollContainer, 'scroll', this.proxyHandleScroll)
  }
}
