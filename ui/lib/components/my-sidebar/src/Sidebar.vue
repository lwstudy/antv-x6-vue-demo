<template>
  <div class="my-sidebar" :class="classes">
    <!-- 品牌区 -->
    <div class="my-sidebar__brand" v-if="logo || title">
      <a v-if="collapsed" :href="href">
        <slot name="brand" :title="title" :logo="logo">
          <img class="my-sidebar__logo" v-if="logo" :src="logo" :alt="title">
        </slot>
      </a>
      <a v-else :href="href">
        <slot name="brand" :title="title" :logo="logo">
          <img class="my-sidebar__logo" v-if="logo" :src="logo" :alt="title">
          <h1 class="my-sidebar__title" v-if="title">{{title}}</h1>
        </slot>
        <span v-if="version" class="my-sidebar__version">{{version}}</span>
      </a>
    </div>
    <div v-if="collapsible" @click="toggleCollapse" class="my-sidebar__trigger">
      <my-icon :name="triggerIcon" svg></my-icon>
    </div>
    <div class="my-sidebar__body" :class="bodyClasses">
      <!-- 前置扩展内容 -->
      <slot></slot>

      <!-- 菜单区 -->
      <my-menu v-bind="menuOptions" :data="menus" @select="handleSelect">
        <template v-if="$scopedSlots['menu-item']" v-slot:title="{item}">
          <slot name="menu-item" :item="item"></slot>
        </template>
      </my-menu>


      <!-- 后置扩展内容 -->
      <slot name="append"></slot>

    </div>
  </div>
</template>

<script>
  /**
   * 侧边导航
   * @module $ui/components/my-sidebar
   */

  import {MyMenu, MyIcon} from '$ui'
  import defaultLogo from '$ui/assets/logo.png'
  import '$ui/icons/indent'
  import '$ui/icons/outdent'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义附加内容
   * @property {string} brand 定义品牌区，如logo、系统名称
   * @property {string} menu-item 定义表单项，作用域插槽，定义各项目的标题 参数： item 菜单项数据对象
   * @property {string} append 定义菜单后面的额外内容
   */
  export default {
    name: 'MySidebar',
    components: {
      MyMenu,
      MyIcon
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [logo] logo图片地址
     * @property {string} [title] 标题名称，如系统名称
     * @property {string} [version] 版本号
     * @property {string} [href] 品牌区链接地址，通常设置系统首页
     * @property {boolean} [collapsible=false] 显示触发切换折叠按钮
     * @property {boolean} [collapsed=false] 折叠，collapsible 为true时有效，支持sync修饰符
     * @property {array} [menus] 菜单数据, 项字段参考 my-menu 组件
     * @property {object} [menuProps] 菜单组件实例化参数，字段参考 my-menu 组件
     * @property {string} [theme=light] 主题，可选值：'light', 'dark', 'primary', 'gradual'
     * @property {boolean} [shadow] 显示阴影
     */
    props: {
      // logo 图片
      logo: {
        type: String,
        default: defaultLogo
      },
      // 系统名称
      title: String,

      // 系统版本号
      version: String,
      // 品牌链接地址
      href: {
        type: String
      },
      // 显示折叠按钮
      collapsible: Boolean,

      // 是否折叠, 支持sync修饰符
      collapsed: Boolean,

      // 菜单数据
      menus: Array,

      // 菜单参数
      menuProps: Object,

      // 主题
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['light', 'dark', 'primary', 'gradual', 'black'].includes(val)
        }
      },
      // 显示阴影
      shadow: Boolean
    },
    computed: {
      classes() {
        return {
          [`is-${this.theme}`]: !!this.theme,
          'is-collapsed': this.collapsed,
          'is-shadow': this.shadow
        }
      },
      bodyClasses() {
        return {
          'has-brand': this.logo || this.title,
          'has-trigger': this.collapsible
        }
      },
      menuOptions() {
        return {
          ...(this.menuProps || {}),
          mode: 'vertical',
          theme: this.theme,
          collapsed: this.collapsed
        }
      },
      triggerIcon() {
        return this.collapsed
          ? 'icon-indent'
          : 'icon-outdent'
      }
    },
    methods: {
      handleSelect(item) {
        /**
         * 菜单项选中时触发
         * @event select
         * @param {Object} item 菜单项对象
         */
        this.$emit('select', item)
      },
      toggleCollapse() {
        this.$emit('update:collapsed', !this.collapsed)
      }
    }
  }
</script>

