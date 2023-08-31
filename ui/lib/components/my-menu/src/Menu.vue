<script>
  /**
   * 导航菜单
   * @module $ui/components/my-menu
   */
  import {MyIcon} from '$ui'
  import {Menu, Submenu, MenuItem, MenuItemGroup, Tooltip, Badge} from 'element-ui'
  import renderers from './renderers'
  import {isUrl} from '$ui/utils/regex'
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

  /**
   * 插槽
   * @member slots
   * @property {string} title 作用域插槽，定义各项目的标题 参数： item 菜单项数据对象
   */
  export default {
    name: 'MyMenu',
    mixins: [renderers],
    components: {
      Menu,
      Submenu,
      MenuItem,
      MenuItemGroup,
      Tooltip,
      Badge,
      MyIcon
    },
    /**
     * 属性参数
     * @member props
     * @property {Item[]} [data] 菜单项对象数组
     * @property {string} [data.icon] 图标className
     * @property {string} [data.text] 菜单项标题文字
     * @property {number|object} [data.badge] 徽标配置
     * @property {string} [data.index] 菜单项标识，可以是路由path
     * @property {string} [data.trigger] 菜单打开页面方式，可选值：route 路由打开、href 链接打开、blank 新窗口打开链接、event 触发事件
     * @property {boolean} [data.disabled] 禁用菜单项
     * @property {Item[]} [data.children] 子菜单
     * @property {boolean} [data.group] 是否分组
     * @property {string} [data.title] 分组标题
     * @property {Number} [itemWidth=150] 菜单宽度，仅在 horizontal 模式时用做检测宽度用
     * @property {string} [mode=vertical] 菜单类型，可选值：'vertical', 'horizontal'，现在支持垂直、水平两种模式
     * @property {string} [theme=light]  主题颜色, 可选值：'light', 'dark', 'primary'
     * @property {boolean} [router=false] 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
     * @property {string} [defaultActive] 当前激活菜单的 index, router为true时，默认为当前路由path
     * @property {String[]} [defaultOpeneds] 当前打开的 sub-menu 的 index 的数组
     * @property {boolean} [uniqueOpened] 是否只保持一个子菜单的展开
     * @property {boolean} [collapsed=false] 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
     * @property {string} [menuTrigger=hover] 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) 可选值，'hover', 'click'
     * @property {boolean} [collapseTransition=true] 是否开启折叠动画
     * @property {object} [submenu] 子菜单配置对象，配置信息参考 <a href="https://element.eleme.io/#/zh-CN/component/menu#submenu-attribute"> ElementUI SubMenu Attribute </a>
     */
    props: {
      // 菜单数据
      data: Array,
      // 菜单宽度，仅在 horizontal 模式时用做检测宽度用
      itemWidth: {
        type: Number,
        default: 175
      },
      mode: {
        type: String,
        default: 'vertical',
        validator(val) {
          return ['vertical', 'horizontal'].includes(val)
        }
      },
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          // gradual
          return ['light', 'dark', 'primary', 'gradual', 'black'].includes(val)
        }
      },
      router: Boolean,
      defaultActive: String,
      defaultOpeneds: Array,
      uniqueOpened: Boolean,
      collapsed: Boolean,
      menuTrigger: {
        type: String,
        default: 'hover',
        validator(val) {
          return ['hover', 'click'].includes(val)
        }
      },
      collapseTransition: {
        type: Boolean,
        default: true
      },
      submenu: {
        type: Object,
        default() {
          return {
            popperClass: 'my-menu--popup',
            popperAppendToBody: true
          }
        }
      }
    },
    data() {
      return {
        viewWidth: 0,
        active: true
      }
    },
    computed: {
      menuData() {
        const data = this.data || []
        if (this.mode === 'vertical') {
          return data
        }
        if (this.viewWidth === 0) {
          return []
        }
        const moreWidth = 80
        const diff = this.viewWidth - moreWidth
        if (diff <= 0) {
          return []
        }
        const count = Math.floor(diff / this.itemWidth)

        const showItems = data.slice(0, count)
        const otherItems = data.slice(count)
        if (otherItems.length > 0) {
          const more = {
            text: '...',
            index: 'more',
            children: otherItems
          }
          showItems.push(more)
        }
        return showItems
      },
      menuProps() {
        let defaultActive = this.defaultActive
        // 如果没有指定defaultActive，在router模式的时候，默认取当前的路由作默认激活项
        if (!defaultActive && this.router && this.$route) {
          defaultActive = this.$route.path
        }
        return {
          mode: this.mode,
          defaultActive: defaultActive,
          defaultOpeneds: this.defaultOpeneds,
          uniqueOpened: this.uniqueOpened,
          collapse: this.mode === 'vertical' && this.collapsed,
          menuTrigger: this.menuTrigger,
          collapseTransition: this.collapseTransition
        }
      },
      submenuProps() {
        return {
          ...this.submenu,
          popperClass: [this.submenu.popperClass, `is-${this.theme}`].join(' ')
        }
      },
      classes() {
        return {
          'my-menu': true,
          [`is-${this.theme}`]: !!this.theme
        }
      }
    },
    watch: {
      mode() {
        // el-menu 的模式动态切换有bug，无法更新正常DOM，这里hack，为了重新实例化el-menu
        this.active = false
        this.$nextTick(() => {
          this.active = true
        })
      }
    },
    methods: {
      findNode(index) {
        const findItem = function (nodes = [], index) {
          for (let i = 0, len = nodes.length; i < len; i++) {
            const node = nodes[i]
            if (node.index === index) {
              return node
            }
            if (node.children) {
              const result = findItem(node.children, index)
              if (result) {
                return result
              }
            }
          }
        }
        return findItem(this.menuData, index)
      },
      handleSelect(index) {
        const item = this.findNode(index)
        if (!item) return

        if (isUrl(item.index)) {
          if (typeof window === 'undefined') return
          if (item.trigger === 'blank') {
            window.open(item.index)
          } else {
            window.location.href = item.index
          }
          return
        }

        if (item.trigger) {
          switch (item.trigger) {
            case 'route':
              this.$router.push(item.index).catch(e => e)
              break
            case 'href':
              if (typeof window === 'undefined') return
              window.location.href = item.index
              break
            case 'blank':
              if (typeof window === 'undefined') return
              window.open(item.index)
              break
          }
        } else if (this.router && this.$router) {
          this.$router.push(item.index).catch(e => e)
        }

        /**
         * 菜单项选中时触发
         * @event select
         * @param {Object} item 菜单项对象
         */
        this.$emit('select', item)

      },
      handleResize() {
        this.viewWidth = this.$el.getBoundingClientRect().width
      }
    },
    render() {
      return (
        <div class="my-menu__wrapper">
          {
            this.active
              ? (
                <Menu {...{props: this.menuProps}} class={this.classes} onSelect={this.handleSelect}>
                  {
                    this.menuData.map(item => this.itemRender(item, true))
                  }
                </Menu>
              )
              : null
          }
        </div>
      )

    },
    mounted() {
      this.handleResize()
      addResizeListener(this.$el, this.handleResize)
    },
    beforeDestroy() {
      removeResizeListener(this.$el, this.handleResize)
    }
  }
</script>

