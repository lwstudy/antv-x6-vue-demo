<template>
  <div class="my-contextmenu"
       v-show="visible"
       :class="classes"
       :style="styles">
    <Menu v-if="visible" ref="menu" :items="data"></Menu>
  </div>
</template>

<script>
  /**
   * 右键菜单组件
   * @module $ui/components/my-contextmenu
   */
  import {on, off} from 'element-ui/lib/utils/dom'
  import Menu from './Menu'

  /**
   * 点击菜单项时触发
   * @event click
   * @param {Object} item 菜单项数据
   * @param {Object} vm 菜单项实例
   */

  export default {
    name: 'MyContextmenu',
    components: {
      Menu
    },
    provide() {
      return {
        wrapper: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [theme=light] 主题配色，可选 'light', 'dark'
     * @property {Array} [data] 菜单项数据，[{icon, label, info, disabled, divider, children}]
     * @property {string|object} [data.icon] 图标
     * @property {string} [data.label] 标题文本
     * @property {string} [data.info] 附加信息文本
     * @property {boolean} [data.disabled] 禁用
     * @property {boolean} [data.divider] 分割线
     * @property {Array} [data.children] 子菜单项
     * @property {boolean} [disabled] 禁用菜单
     * @property {number} [zIndex=1000] 显示层级
     * @property {String|HTMLElement|Function} 触发菜单容器，支持选择器和函数，默认 document.body
     * @property {boolean} [manual] 手动模式，需要自行调用show 、hide 方法
     */
    props: {
      // 主题风格
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['light', 'dark'].includes(val)
        }
      },
      // 数据 [{icon, label, info, disabled, divider, children}]
      data: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: Boolean,
      zIndex: {
        type: Number,
        default: 1000
      },
      target: {
        type: [String, HTMLElement, Function],
        default() {
          return document.body
        }
      },
      // 手动控制菜单显示
      manual: Boolean
    },
    data() {
      return {
        visible: false,
        x: 0,
        y: 0,
        rect: null
      }
    },
    computed: {
      styles() {
        return {
          left: `${this.x}px`,
          top: `${this.y}px`,
          zIndex: this.zIndex
        }
      },
      classes() {
        return {
          [`is-${this.theme}`]: !!this.theme
        }
      }
    },
    methods: {
      getTarget() {
        let el = document.body
        if (typeof this.target === 'string') {
          el = document.querySelector(this.target)
        }
        if (typeof this.target === 'function') {
          el = this.target()
        }
        return el
      },
      handleContextMenu(e) {
        if (this.disabled) return
        e.preventDefault()
        if(!this.manual) {
          this.show({x: e.pageX, y: e.pageY})
        }
        return false
      },
      getPlacement(rect, x, y) {
        const targetRect = this.triggerTarget.getBoundingClientRect()
        if (rect.height + y - Math.abs(targetRect.top) >= targetRect.height) {
          y -= rect.height
        }
        if (rect.width + x - Math.abs(targetRect.left) >= targetRect.width) {
          x -= rect.width
        }
        return {
          x, y
        }
      },
      show({x, y}) {
        this.visible = true
        this.$nextTick(() => {
          const rect = this.$refs.menu.rect
          const placement = this.getPlacement(rect, x, y)
          this.x = placement.x
          this.y = placement.y
        })
      },
      hide() {
        this.visible = false
      }
    },
    mounted() {
      this.triggerTarget = this.getTarget()
      on(this.triggerTarget, 'contextmenu', this.handleContextMenu)
      on(document.body, 'click', this.hide)
      document.body.appendChild(this.$el)

    },
    beforeDestroy() {
      off(this.triggerTarget, 'contextmenu', this.handleContextMenu)
      off(document.body, 'click', this.hide)
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      this.triggerTarget = null
    }
  }
</script>


