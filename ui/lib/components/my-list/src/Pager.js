export default {
  computed: {
    isPager() {
      return this.mode === 'pager'
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
      /**
       * 分页页码变化时触发
       * @event page-change
       * @param {number} page 页码
       * @param {number} pageSize 页大小
       */
      this.$emit('page-change', page, this.currentPageSize)
      this.load()
      
    },
    handlePageSizeChange(size) {
      this.currentPage = 1;
      this.currentPageSize = size
      /**
       * 页大小变化时触发
       * @event size-change
       * @param {number} pageSize 页大小
       */
      this.$emit('size-change', size)
      this.load()
    },
    pagerLoaded(res) {
      this.list = Object.freeze(res.list || [])
    }
  }
}
