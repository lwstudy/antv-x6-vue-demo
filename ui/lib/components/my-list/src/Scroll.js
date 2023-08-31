export default {
  computed: {
    isNoMore() {
      return this.pageCount < this.currentPage
    },
    isScroll() {
      return this.mode === 'scroll'
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
      this.list = Object.freeze(this.list.concat(res.list || []))
      if (this.isNoMore) {
        /**
         * 滚动加载结束时触发
         * @event complete
         */
        this.$emit('complete')
      }
      ++this.currentPage
      
    }
  }
}
