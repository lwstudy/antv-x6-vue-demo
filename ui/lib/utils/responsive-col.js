//  xs: '(max-width: 575px)', 575
//  sm: '(min-width: 576px)', 576, 767
//  md: '(min-width: 768px)', 768, 991
//  lg: '(min-width: 992px)', 992, 1199
//  xl: '(min-width: 1200px)', 1200, 1599
//  xxl: '(min-width: 1600px)' 1600 
 
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import responsive, {responsiveArray} from '$ui/utils/responsive'
import {throttle} from '$ui/utils/util' 
const defaultCol = {
  xxl: 5,
  xl: 4, 
  lg: 4,
  md: 3,
  sm: 2,
  xs: 1
} // 3

const calcBreakPoint = function (width) {
  if (width <= 575) {
    return 'xs'
  } else if (width >= 576 && width <= 767) {
    return 'sm'
  } else if (width >= 768 && width <= 991) {
    return 'md'
  } else if (width >= 992 && width <= 1199) {
    return 'lg'
  } else if (width >= 1200 && width <= 1599) {
    return 'xl'
  } else if (width >= 1600) {
    return 'xxl'
  }
}
export default { 
  props: {
    listenEl: {
      type: Boolean,
      default: false
    },
    columns: {
      type: [Number, Object],
      default: () => { return {...defaultCol} },
      validator(val) {
        return typeof val === 'number' ? 24 % val === 0 : true
      }
    }
  },
  data() {
    return {
      currentColumn: defaultCol,
      screens: {},
      elDom: null
    }
  },
  watch: {
    listenEl(val) {
      if (val) {
        if (this.elDom) {
          this.setupElResponsive()
        }
      } else {
        this.setupResponsive()
      }
      this.$nextTick(() => {
        this.currentColumn = this.getResponsiveValue()
        // console.log('currentColumn', this.currentColumn)
      })
    },
    columns: {
      immediate: true,
      handler() {
        if (!this.listenEl) {
          this.setupResponsive()
        } else {
          if (this.elDom) {
            this.setupElResponsive()
          }
        }
        this.$nextTick(() => {
          this.currentColumn = this.getResponsiveValue()
          // console.log('currentColumn', this.currentColumn)
        })
      }
    },
    screens: {
      deep: true,
      handler() {
        this.currentColumn = this.getResponsiveValue()
        // console.log(this.currentColumn)
      }
    }
  }, 
  methods: {
    setupResponsive() {
      this.token && responsive.off(this.token)

      // 参数是对象类型，即开启响应式
      if (typeof this.columns !== 'object') return

      this.token = responsive.on(screens => {
        this.screens = screens
      })
    },
    setupElResponsive() {
      if (!this.listenEl) return
      const width = this.elDom.offsetWidth
      const screen = {}
      const type = calcBreakPoint(width)
      screen[type] = true
      this.screens = screen
      // console.log(this.screens, width, type)
      
    },
    // 获取当前响应式的列数
    getResponsiveValue() {
      const columns = this.columns
      const defaultValue = defaultCol
      
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
    }
  },
  mounted() {  
    this.elDom = this.$el
    this.setupElResponsive()
    this.setupElResponsiveProxy = throttle(this.setupElResponsive, 300, false, this)
    addResizeListener(this.elDom, this.setupElResponsiveProxy) 
  },
  beforeDestroy() {
    this.token && responsive.off(this.token)
    removeResizeListener(this.elDom, this.setupElResponsiveProxy)
  }
}