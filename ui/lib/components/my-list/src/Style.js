import responsive, {responsiveArray} from '$ui/utils/responsive'
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

// 分页组件默认配置
const defaultPagerProps = {
  align: 'right',
  background: true,
  layout: 'prev, pager, next'
}

export default {
  data() {
    return {
      // 显示列数
      currentColumn: 1,
      // 是否加载中
      currentLoading: false,
      // 响应式场景
      screens: {},
      
      // 头部高度
      headerHeight: 0,
      
      // 底部高度
      footerHeight: 0,
      
      // 分页高度
      pagerHeight: 0
    }
  },
  computed: {
    isFit() {
      if (this.isVirtual) {
        return true
      }
      return this.fit
    },
    // 组件样式class名称
    classes() {
      return {
        'is-fit': this.isFit,
        'is-border': this.border,
        'is-split': this.split && this.currentColumn === 1,
        'is-stripe': this.stripe,
        'is-split-columns': this.split && this.currentColumn > 1,
        'is-multiple-columns': this.currentColumn > 1,
        [`is-${this.size}`]: !!this.size
      }
    },
    // 分页配置
    pagerProps() {
      return {
        ...defaultPagerProps,
        ...this.pagination,
        pageSize: this.pageSize,
        total: this.total,
        currentPage: this.page
      }
    },
    // 分页组件样式名称
    pagerClass() {
      const {align} = this.pagerProps
      return {
        'my-list__pager': true,
        [`is-align-${align}`]: !!align
      }
    },
    // 列表项样式
    itemStyle() {
      return {
        width: `${100 / this.currentColumn}%`,
        height: this.itemHeight ? `${this.itemHeight}px` : 'auto'
      }
    },
    // 需要补充的项个数
    fixItemCount() {
      const column = this.currentColumn
      const list = this.isVirtual ? this.viewItems : this.list
      if (!this.fixColumns || list.length === 0) return 0
      const match = list.length % column
      return match > 0
        ? column - match
        : 0
    },
    wrapperStyle() {
      const height = this.headerHeight + this.footerHeight + this.pagerHeight
      return this.isFit
        ? {
          height: `calc(100% - ${height}px)`
        }
        : null
    },
    wrapperClass() {
      return {
        'is-virtual': this.isVirtual
      }
    }
  },
  watch: {
    columns: {
      immediate: true,
      handler() {
        this.setupResponsive()
        this.currentColumn = this.getResponsiveValue()
      }
    },
    screens() {
      this.currentColumn = this.getResponsiveValue()
    },
    loading: {
      immediate: true,
      handler(val) {
        this.currentLoading = val
      }
    },
    // 监听currentTotal变化更新列表高度，解决列表初始化时 fit 状态下 page高度溢出外容器 bug
    currentTotal(val) { 
      setTimeout(() => { 
        this.updateHeight()
      }, 300)
    }
  },
  methods: {
    // 开启响应式
    setupResponsive() {
      this.token && responsive.off(this.token)
      
      // 参数是对象类型，即开启响应式
      if (typeof this.columns !== 'object') return
      
      this.token = responsive.on(screens => {
        this.screens = screens
      })
    },
    // 获取当前响应式的列数
    getResponsiveValue() {
      const columns = this.columns
      const defaultValue = 1
      if (!columns) return defaultValue
      // 参数是对象类型，即开启响应式
      if (typeof columns === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i]
          if (this.screens[breakpoint]) {
            return columns[breakpoint] || defaultValue
          }
        }
      }
      
      // 数字类型
      return columns
      
    },
    // 列表样式名称
    createItemClass(index) {
      const col = this.currentColumn
      const stripeIndex = this.startIndex + index
      return {
        'is-first-column': index % col === 0,
        'is-first-row': index < col,
        'is-stripe': this.stripe && (Math.ceil((stripeIndex + 1) / col) % 2) === 0
      }
    },
    handleBack() {
      if (this.$router) {
        this.$router.back()
      }
    },
    updateHeight() {
      if (this.$refs.header) {
        this.headerHeight = this.$refs.header.getBoundingClientRect().height
      }
      if (this.$refs.footer) {
        this.footerHeight = this.$refs.footer.getBoundingClientRect().height
      }
      if (this.$refs.pager) {
        this.pagerHeight = this.$refs.pager.$el.getBoundingClientRect().height
      }
    }
  },
  mounted() {
    if (this.isFit) {
      this.updateHeight()
      addResizeListener(this.$el, this.updateHeight)
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.updateHeight)
  }
}
