<template>
  <my-layout :class="classes" :direction="direction" :west="west" :fit="fixed" :north="north">
    <template v-if="header" v-slot:north>
      <my-navbar v-bind="navbarOptions"
                 @select="handleMenuSelect"
                 :collapsed.sync="collapsed">
        <Breadcrumb v-if="breadcrumbVisible && breadcrumbList && breadcrumbList.length"
                    :class="`my-pro__breadcrumb is-${navbarOptions.theme}`"
                    :data="breadcrumbList"></Breadcrumb>
        <slot v-if="$slots.navbar" name="navbar"></slot>
        <template v-slot:actions>
          <slot name="actions"></slot>
        </template>
      </my-navbar>
    </template>

    <template v-if="sidebarOptions" v-slot:west>
      <my-sidebar v-bind="sidebarOptions"
                  v-clickoutside="handleClickOutside"
                  :menus="sidebarMenus"
                  :menuProps="menuProps"
                  @select="handleMenuSelect"
                  :collapsed.sync="collapsed">
        <slot name="sidebar"></slot>
        <template v-slot:append>
          <slot name="append"></slot>
        </template>
      </my-sidebar>
    </template>

    <Tabs v-if="tab && tabs.length"
          :data="tabs"
          :active="activeTabValue"
          @select="handleTabSelect"
          @icon-click="handleTabClick"
          @command="handleTabCommand"
          @remove="handleTabRemove"></Tabs>

    <div class="my-pro__main" :class="mainClasses">
      <slot></slot>
    </div>

  </my-layout>
</template>

<script>
  /**
   * 后台布局框架组件
   * @module $ui/components/my-pro
   */
  import {MyLayout, MyNavbar, MySidebar} from '$ui'
  import Breadcrumb from './Breadcrumb'
  import Tabs from './Tabs'
  import clickoutside from 'element-ui/lib/utils/clickoutside'
  import responsive from '$ui/utils/responsive'
  import defaultLogo from '$ui/assets/logo.png'

  const {IconAction, UserAction, FullScreenAction, Action} = MyNavbar

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义主体内容，通常放 router-view
   * @property {string} navbar 顶部菜单附加内容
   * @property {string} actions 顶部菜单操作区内容，如放置：IconAction, UserAction, FullScreenAction
   * @property {string} sidebar 左侧菜单前置内容
   * @property {string} append 左侧菜单后置内容
   *
   */
  export default {
    IconAction,
    UserAction,
    FullScreenAction,
    Action,
    name: 'MyPro',
    components: {
      MyLayout,
      MyNavbar,
      MySidebar,
      Breadcrumb,
      Tabs
    },
    directives: {
      clickoutside
    },
    provide() {
      return {
        myPro: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [logo] 品牌logo图片地址
     * @property {string} [title=MyWeb] 品牌名称
     * @property {string} [version] 版本号徽标
     * @property {string} [href] 点击logo调转的链接
     * @property {Array} [menus] 菜单数据数组，与MyMenu组件一致
     * @property {string} [menus.icon] 图标className
     * @property {string} [menus.text] 菜单项标题文字
     * @property {number|object} [menus.badge] 徽标配置
     * @property {string} [menus.index] 菜单项标识，可以是路由path
     * @property {string} [menus.trigger] 菜单打开页面方式，可选值：route 路由打开、href 链接打开、blank 新窗口打开链接、event 触发事件
     * @property {boolean} [menus.disabled] 禁用菜单项
     * @property {Item[]} [menus.children] 子菜单
     * @property {boolean} [menus.group] 是否分组
     * @property {string} [menus.title] 分组标题
     * @property {Object} [menuProps] 菜单组件配置，参考MyMenu
     * @property {string} [mode=sidebar] 导航模式: sidebar(侧边菜单布局)、navbar(顶部菜单布局)、both(侧边+顶部菜单布局)
     * @property {Boolean} [sidebarCollaps=false] 默认sidebar是否收起（默认为否）
     * @property {string} [sidebarTheme=light] 侧边栏主题，可选值：'light', 'dark', 'primary', 'gradual'
     * @property {string} [navbarTheme=light] 顶部导航主题，可选值：'light', 'dark', 'primary', 'gradual'
     * @property {Object} [navbarProps] MyNavbar组件附加参数，mode=both 时有效
     * @property {Boolean} [menusLevelSplit] 菜单数据第一层拆分放到navbar，与sidebar联动，mode=both 时有效
     * @property {Boolean} [navbarActive] navbar 菜单激活函数，menusLevelSplit=true时有效
     * @property {boolean} [fixed=false] 固定菜单栏（包括侧边和顶部）
     * @property {boolean} [colorWeak=false] 色弱模式
     * @property {boolean} [collapsible=true] 开启折叠切换
     * @property {boolean} [header=true] 显示头部
     * @property {boolean} [rainbow=true] 顶部导航显示海虹边框
     * @property {Object|Function} [breadcrumb] 面包屑数据按路由path的映射对象或构建函数
     * @property {string|Function} [documentTitle] 默认页面标题文本，如设置该属性，即开启按路由meta的title属性设置页面标题
     * @property {Object|Function} [tab] 默认选项卡导航，如果设置该属性，即开始按路由meta的tab属性设置导航选项卡，对象字段{label, value, icon}
     * @property {string} tab.label 选项卡标题
     * @property {string} tab.value 选项卡标识，实用路由path
     * @property {string|object} [tab.icon] 选项卡图标配置
     */
    props: {
      logo: {
        type: String,
        default: defaultLogo
      },
      title: {
        type: String,
        default: 'MyWeb'
      },
      version: {
        type: String
      },
      href: String,
      menus: {
        type: Array
      },
      menuProps: Object,
      // 导航模式: sidebar(侧边菜单布局)、navbar(顶部菜单布局)、both(侧边+顶部菜单布局)
      mode: {
        type: String,
        default: 'sidebar',
        validator(val) {
          return ['sidebar', 'navbar', 'both'].includes(val)
        }
      },
      sidebarCollaps: {
        type: Boolean,
        default: false
      },
      sidebarTheme: String,
      navbarTheme: String,
      // 顶部菜单，在 mode=both 有效
      navbarProps: Object,
      menusLevelSplit: Boolean,
      // navbar 菜单激活函数，menusLevelSplit=true时有效
      navbarActive: {
        type: Function
      },
      // 固定菜单栏（包括侧边和顶部）
      fixed: Boolean,
      // 色弱模式
      colorWeak: Boolean,
      // 开启折叠切换
      collapsible: {
        type: Boolean,
        default: true
      },
      // 显示头部
      header: {
        type: Boolean,
        default: true
      },
      // 顶部导航显示海虹边框
      rainbow: {
        type: Boolean,
        default: true
      },
      breadcrumb: [Object, Function],
      // 页面默认标题，如果设置，即开启动态页面标题功能
      documentTitle: [String, Function],
      // 初始tab，设置即开始tabs功能
      tab: [Object, Function]
    },
    data() {
      return {
        collapsed: this.sidebarCollaps,
        screen: {},
        breadcrumbList: [],
        tabs: [],
        activeTabValue: ''
      }
    },
    computed: {
      classes() {
        const screen = {}
        Object.keys(this.screen).forEach(n => {
          screen[`is-${n}`] = this.screen[n]
        })
        return {
          'my-pro': true,
          'is-color-weak': this.colorWeak,
          'is-collapsed': this.collapsed,
          [`my-pro--${this.mode}`]: true,
          'is-rainbow': this.rainbow,
          [`my-pro--${this.sidebarTheme}`]: !!this.sidebarTheme,
          'is-fixed': this.fixed,
          'is-menus-level-split': this.menusLevelSplit,
          ...screen
        }
      },
      direction() {
        return this.mode === 'sidebar' ? 'horizontal' : 'vertical'
      },
      west() {
        const {xs} = this.screen
        return {
          width: this.collapsed ? (xs ? 0 : 65) : 256
        }
      },
      north() {
        return {
          height: ((this.mode === 'both' && this.rainbow) ||
            this.mode === 'sidebar' ||
            (this.mode === 'navbar' && this.rainbow))
            ? 61
            : 60
        }
      },
      navbarOptions() {
        let opt = null
        const {xs} = this.screen
        switch (this.mode) {
          case 'sidebar':
            opt = {
              title: null,
              logo: null,
              collapsible: this.collapsible,
              theme: this.navbarTheme,
              shadow: false
            }
            break
          case 'navbar':
            opt = {
              title: xs ? null : this.title,
              logo: this.logo,
              version: xs ? null : this.version,
              href: this.href,
              collapsible: false,
              theme: this.navbarTheme,
              menus: xs ? null : this.menus,
              menuProps: this.menuProps,
              shadow: true
            }
            break
          case 'both':
            opt = {
              title: xs ? null : this.title,
              logo: this.logo,
              version: xs ? null : this.version,
              href: this.href,
              collapsible: !!xs,
              theme: this.navbarTheme,
              shadow: true,
              menus: this.getTopLevelMenus(),
              menuProps: {
                router: true,
                defaultActive: this.defaultNavbarActive()
              },
              ...(this.navbarProps || {})
            }
            break
        }
        return opt
      },
      sidebarOptions() {
        let opt = null
        // const {xs} = this.screen
        switch (this.mode) {
          case 'sidebar':
            opt = {
              title: this.title,
              logo: this.logo,
              href: this.href,
              version: this.version,
              theme: this.sidebarTheme,
              collapsible: false,
              shadow: true
            }
            break
          case 'both':
            opt = {
              title: null,
              logo: null,
              version: null,
              collapsible: this.collapsible,
              theme: this.sidebarTheme,
              shadow: false
            }
            break
        }
        return opt
      },
      breadcrumbVisible() {
        if (!this.breadcrumb) return false
        const {xs} = this.screen
        return !xs
      },
      mainClasses() {
        return {
          'is-fixed': this.fixed,
          'has-tabs': !!this.tab
        }
      },
      sidebarMenus() {
        if (!this.menus) return []
        if (this.mode === 'both' && this.menusLevelSplit) {
          const path = this.$route.path
          const item = this.menus.find(n => path.startsWith(n.index))
          return item?.children || []
        } else {
          return this.menus
        }
      }
    },
    watch: {
      collapsed(val) {
        /**
         * 折叠发送改变时触发
         * @event collapse
         * @param {boolean} collapsed 是否折叠
         */
        this.$emit('collapse', val)
      },
      $route: {
        immediate: true,
        handler() {
          const matched = this.$route.matched.slice(0).pop()
          this.$nextTick(() => {
            this.updateBreadcrumbList(matched)
            const tab = this.collectTab(this.$route.fullPath, matched)
            tab && this.addTab(tab)
          })
          this.updateDocumentTitle(matched)
        }
      },
      tab: {
        immediate: true,
        handler() {
          this.addDefaultTab()
        }
      }
    },
    methods: {
      handleMenuSelect(item) {
        /**
         * 菜单项选中时触发
         * @event select
         * @param {Object} item 菜单项对象
         */
        this.$emit('select', item)
      },
      updateScreen(screen) {
        this.screen = screen
        if (this.mode === 'sidebar') {
          if (this.screen.sm && !this.collapsed) {
            this.collapsed = true
          }
          if (this.screen.lg && this.collapsed) {
            this.collapsed = false
          }
        }

        if (this.mode === 'both') {
          if (this.screen.sm && !this.collapsed) {
            this.collapsed = true
          }
          if (this.screen.lg && this.collapsed) {
            this.collapsed = false
          }
        }


      },
      handleClickOutside() {
        if (this.mode === 'sidebar' && this.screen.xs && !this.collapsed) {
          this.collapsed = true
        }
      },
      updateBreadcrumbList(matched) {
        if (!this.breadcrumb) return
        if (!matched) {
          this.breadcrumbList = null
          return
        }
        if (typeof this.breadcrumb === 'function') {
          this.breadcrumbList = this.breadcrumb(matched)
        } else {
          this.breadcrumbList = this.breadcrumb[matched.path] || []
        }
      },
      updateDocumentTitle(matched) {
        if (!this.documentTitle) return

        document.title = typeof this.documentTitle === 'function'
          ? this.documentTitle(matched)
          : ((matched.meta || {}).title || this.documentTitle)
      },
      addDefaultTab() {
        if (!this.tab) return
        const isFunction = typeof this.tab === 'function'
        if (isFunction) {
          const tab = this.tab()
          tab && this.addTab({
            ...tab,
            closable: false
          })
        } else {
          this.addTab({
            ...this.tab,
            closable: false
          })
        }

      },
      collectTab(fullPath, matched) {
        if (!this.tab) return null
        const isFunction = typeof this.tab === 'function'
        if (isFunction) {
          const tab = this.tab(fullPath, matched)
          if (!tab) return null
          return {
            closable: true,
            ...tab
          }
        } else {
          const isDefault = fullPath === this.tab.value
          const {tab, icon} = matched.meta || {}
          if (!tab) return null
          return {
            label: tab,
            value: fullPath,
            icon: icon,
            path: matched.path,
            closable: true,
            ...(isDefault
              ? {
                ...this.tab,
                closable: false
              }
              : null)
          }
        }


      },
      /**
       * 添加选项卡
       * @method addTab
       * @param {Object} tab 选项卡配置
       * @param {string} tab.label 标题
       * @param {string} tab.value 页面访问路由path
       * @param {string|object} [tab.icon] 图标
       * @param {boolean} [tab.closable] 能否关闭
       * @param {string} [tab.path] 页面路由原始path
       */
      addTab(tab) {
        if (!tab) return
        tab.path = tab.path || tab.value
        const index = this.tabs.findIndex(n => n.value === tab.value || n.path === tab.path)
        if (index > -1) {
          this.tabs.splice(index, 1, tab)
        } else {
          this.tabs.push(tab)
        }
        this.activeTabValue = tab.value

      },
      /**
       * 更新当前选项卡配置
       * @method setTab
       * @param {object} tab 选项卡配置 {label,value,closable,path,icon}
       */
      setTab(tab) {
        this.$nextTick(() => {
          const fullPath = this.$route.fullPath
          const tabIndex = this.tabs.findIndex(t => t.value === fullPath)
          if (tabIndex > -1) {
            const newTab = {
              ...this.tabs[tabIndex],
              ...tab
            }
            this.tabs.splice(tabIndex, 1, newTab)
          }
        })
      },
      /**
       * 关闭选项卡
       * @method closeTabs
       * @param {string|Function} value 选项卡的value 或 path，也可是查找函数,return true 关闭
       */
      closeTabs(value) {
        const filter = typeof value === 'function'
          ? value
          : tab => tab.path === value || tab.value === value
        this.tabs = this.tabs.filter((tab, index) => !filter(tab, index))
      },
      handleTabSelect(tab, index) {
        if (tab.value) {
          this.$router.push(tab.value).catch(e => e)
        }
        /**
         * 选择选项卡时触发
         * @event tab-select
         * @param {object} tab 选项卡配置对象
         * @param {number} index 选项的索引
         */
        this.$emit('tab-select', tab, index)
      },
      handleTabClick(tab, index) {
        this.$emit('tab-click', tab, index)
      },
      handleTabRemove(tab, index) {
        this.tabs.splice(index, 1)
        // 删除的是选择的tab
        if (tab.value === this.activeTabValue) {
          const current = this.tabs[index] || this.tabs[this.tabs.length - 1]
          current && this.$router.push(current.value).catch(e => e)
        }
        /**
         * 关闭选项卡时触发
         * @event tab-remove
         * @param {object} tab 选项卡配置对象
         * @param {number} index 选项的索引
         */
        this.$emit('tab-remove', tab, index)
      },
      handleTabCommand(command, tab, index) {
        let removeTab
        switch (command) {
          case 'left':
            removeTab = this.tabs.splice(1, index - 1)
            this.$emit('tab-remove', removeTab, index - 1)
            break
          case 'right':
            removeTab = this.tabs.splice(index + 1, this.tabs.length)
            this.$emit('tab-remove', removeTab, this.tabs.length)
            break
          case 'other':
            if (index === 0) {
              this.tabs.splice(1)
            } else {
              this.tabs = [this.tabs[0], this.tabs[index]]
            }
            this.$emit('tab-remove-other', this.tabs)
            break
          case 'all':
            this.tabs.splice(1)
            if (this.tabs[0]) {
              this.$router.push(this.tabs[0].value).catch(e => e)
            }
            this.$emit('tab-remove-all', this.tabs)
            break
        }
      },
      getTopLevelMenus() {
        return this.menusLevelSplit
          ? this.menus.map(n => {
            const {icon, index, text} = n
            return {
              icon,
              index,
              text
            }
          })
          : null
      },
      defaultNavbarActive() {
        const paths = this.$route.path.split('/')
        if (paths.length > 2) {
          return paths.slice(0, 2).join('/')
        }
        return null
      }
    },
    created() {
      this.token = responsive.on(e => {
        this.updateScreen(e)
      })


    },
    updated() {
      this.$nextTick(() => {
        const matched = this.$route.matched.slice(0).pop()
        this.updateBreadcrumbList(matched)
      })
    },
    beforeDestroy() {
      this.token && responsive.off(this.token)
    }
  }
</script>

