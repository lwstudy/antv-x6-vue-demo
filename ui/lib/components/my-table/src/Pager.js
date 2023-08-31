import {isEqual} from '$ui/utils/util'

const defaultPagerProps = {
  background: true,
  layout: 'total, ->, prev, pager, next'
}

export default {
  computed: {
    isPager() {
      return this.mode === 'pager'
    },
    pagerProps() {
      return {
        ...defaultPagerProps,
        ...this.pagination,
        pageSize: this.pageSize,
        total: this.total,
        currentPage: this.page
      }
    }
  },
  watch: {
    // 分页配置变化时出加载数据
    pagerProps: {
      immediate: true,
      handler(props, oldProps) {
        if (!isEqual(props, oldProps)) {
          this.currentPage = props.currentPage
          this.currentTotal = props.total
          this.currentPageSize = props.pageSize
          this.auto && this.$nextTick(this.load)
        }
      }
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
      this.list = this.freeze ? Object.freeze(res.list || []) : (res.list || [])
    }
  }
}
