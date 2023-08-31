<template>
  <transition name="my-radial-menu">
    <div v-if="visible && flashHelper"
         v-clickoutside="handleClickOutside"
         class="my-radial-menu"
         :style="styles">
      <svg class="my-radial-menu__icons">
        <symbol id="return" viewBox="0 0 489.394 489.394">
          <path
            d="M375.789,92.867H166.864l17.507-42.795c3.724-9.132,1-19.574-6.691-25.744c-7.701-6.166-18.538-6.508-26.639-0.879L9.574,121.71c-6.197,4.304-9.795,11.457-9.563,18.995c0.231,7.533,4.261,14.446,10.71,18.359l147.925,89.823c8.417,5.108,19.18,4.093,26.481-2.499c7.312-6.591,9.427-17.312,5.219-26.202l-19.443-41.132h204.886c15.119,0,27.418,12.536,27.418,27.654v149.852c0,15.118-12.299,27.19-27.418,27.19h-226.74c-20.226,0-36.623,16.396-36.623,36.622v12.942c0,20.228,16.397,36.624,36.623,36.624h226.74c62.642,0,113.604-50.732,113.604-113.379V206.709C489.395,144.062,438.431,92.867,375.789,92.867z"></path>
        </symbol>
        <symbol id="close" viewBox="0 0 41.756 41.756">
          <path
            d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"></path>
        </symbol>
      </svg>
      <svg class="my-radial-menu__menu" viewBox="-50 -50 100 100" :width="size" :height="size">
        <MenuItem v-for="item in menus"
                  v-bind="item"
                  :key="item.index"
                  :scale="scale"
                  :radius="radius"
                  :innerRadius="innerRadius"
                  @click="handleMenuClick"></MenuItem>

        <g class="my-radial-menu__center" @click="handleCenterClick">
          <circle :cx="centerCircle.cx" :cy="centerCircle.cy" :r="centerCircle.r"></circle>
          <use :x="centerCircle.cx"
               :y="centerCircle.cy"
               :width="centerCircle.size"
               :height="centerCircle.size"
               :transform="centerCircle.transform"
               fill="white"
               :xlink:href="centerCircle.icon"></use>
        </g>
      </svg>
    </div>
  </transition>
</template>

<script>
  /**
   * 圆形菜单组件
   * @module $ui/components/my-radial-menu
   */
  import MenuItem from './MenuItem'
  import {resolveLoopIndex, numberToString, setClassAndWaitForTransition} from './utils'
  import clickoutside from 'element-ui/lib/utils/clickoutside'

  export default {
    name: 'MyRadialMenu',
    components: {
      MenuItem
    },
    directives: {
      clickoutside
    },
    provide() {
      return {
        radialMenu: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {number} [200] 菜单尺寸，直径
     * @property {Array} [items] 菜单数据项 [{id, label, icon, children}]
     * @property {boolean} [closeOnClick=true] 点击菜单后关闭
     * @property {boolean} [closeOnClickOutside=true] 点击菜单外部关闭
     * @property {number} [miniSectors=6] 最小菜单项数量
     * @property {string} [defaultSelected] 默认选中的菜单项id
     * @property {boolean} [resetOnClose=true] 关闭菜单后重置为初始状态
     * @property {number[]} [position] 菜单显示的坐标，圆心是参照点
     * @property {boolean} [visible=true] 显示菜单，支持 sync 修饰符
     * @property {number} [zIndex=1] 显示层级
     * @property {boolean} [appendToBody] 渲染 html 到 body
     */
    props: {
      size: {
        type: Number,
        default: 200
      },
      items: {
        type: Array,
        default() {
          return []
        }
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      closeOnClickOutside: {
        type: Boolean,
        default: true
      },
      miniSectors: {
        type: Number,
        default: 6
      },
      defaultSelected: {
        type: [String, Number]
      },
      resetOnClose: {
        type: Boolean,
        default: true
      },
      position: {
        type: Array
      },
      visible: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: Number,
        default: 1
      },
      appendToBody: {
        type: Boolean
      }
    },
    data() {
      const radius = 50
      return {
        radius,
        innerRadius: radius * 0.3,
        sectorSpace: radius * 0.06,
        levelItems: [],
        parentMenus: [],
        nested: false,
        selected: null,
        flashHelper: true
      }
    },
    watch: {
      defaultSelected: {
        immediate: true,
        handler(val) {
          this.selected = this.defaultSelected
        }
      },
      items: {
        immediate: true,
        handler(val) {
          this.levelItems = val || []
        }
      },
      visible(val) {
        if (val) {
          /**
           * 显示时触发
           * @event open
           */
          this.$emit('open')
        } else {
          /**
           * 关闭时触发
           * @event close
           */
          this.$emit('close')
          if (this.resetOnClose) {
            this.reset()
          }
        }
      }
    },
    computed: {
      styles() {
        const radius = this.size / 2
        const [x, y] = this.position || [radius, radius]
        return {
          width: `${this.size}px`,
          height: `${this.size}px`,
          left: `${x - radius}px`,
          top: `${y - radius}px`,
          zIndex: this.zIndex
        }
      },
      sectorCount() {
        return Math.max(this.levelItems.length, this.miniSectors)
      },
      scale() {
        const totalSpace = this.sectorSpace * this.sectorCount;
        const circleLength = Math.PI * 2 * this.radius;
        const radiusDelta = this.radius - (circleLength - totalSpace) / (Math.PI * 2);
        return (this.radius - radiusDelta) / this.radius;
      },
      indexOffset() {
        const length = this.levelItems.length
        if (length < this.sectorCount) {
          switch (length) {
            case 1:
              return -2;
            case 2:
              return -2;
            case 3:
              return -2;
            default:
              return -1;
          }
        } else {
          return -1;
        }
      },
      menus() {
        const angleStep = 360 / this.sectorCount
        const angleShift = angleStep / 2 + 270
        const length = this.levelItems.length
        const items = []
        for (let i = 0; i < this.sectorCount; i++) {
          const startAngle = angleShift + angleStep * i;
          const endAngle = angleShift + angleStep * (i + 1);
          const index = resolveLoopIndex(this.sectorCount - i + this.indexOffset, this.sectorCount);
          const item = (index >= 0 && index < length) ? this.levelItems[index] : null
          items.push({
            startAngle,
            endAngle,
            selected: (item && item.id === this.selected),
            index,
            item
          })
        }
        return items
      },
      centerCircle() {
        const size = 8
        return {
          cx: numberToString(0),
          cy: numberToString(0),
          r: this.innerRadius - this.sectorSpace / 3,
          size: 8,
          icon: this.nested ? '#return' : '#close',
          transform: `translate(-${numberToString(size / 2)},-${numberToString(size / 2)})`
        }
      }
    },
    methods: {
      handleCenterClick() {
        if (this.parentMenus.length > 0) {
          this.flashHelper = false
          this.$nextTick(() => {
            this.levelItems = this.parentMenus.pop()
            this.nested = this.parentMenus.length > 0
            this.flashHelper = true
          })
          this.outerEffect()
        } else {
          this.$emit('update:visible', false)
        }
      },
      outerEffect() {
        this.clean()
        this.cloneEl = this.$el.cloneNode(true)
        this.$el.parentNode.appendChild(this.cloneEl)
        this.timerId = setTimeout(() => {
          setClassAndWaitForTransition(this.cloneEl, 'my-radial-menu-outer').then(this.clean)
        }, 20)
      },
      handleMenuClick(item) {
        if (item.children) {
          this.flashHelper = false
          this.$nextTick(() => {
            this.parentMenus.push(this.levelItems.slice(0))
            this.levelItems = item.children
            this.nested = true
            this.flashHelper = true
          })
          this.outerEffect()
        } else {
          this.selected = item.id
          this.closeOnClick && this.$emit('update:visible', false)
          /**
           * 点击菜单时触发
           * @event click
           * @param {object} item 菜单项对象
           */
          this.$emit('click', item)
        }
      },
      handleClickOutside() {
        this.closeOnClickOutside && this.$emit('update:visible', false)
      },
      reset() {
        this.nested = false
        this.selected = this.defaultSelected
        this.levelItems = this.items
        this.parentMenus = []
      },
      clean() {
        this.timerId && clearTimeout(this.timerId)
        if (this.cloneEl) {
          this.cloneEl.parentNode.removeChild(this.cloneEl)
        }
        this.timerId = null
        this.cloneEl = null
      }
    },
    mounted() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    },
    beforeDestroy() {
      this.clean()
    }
  }
</script>
