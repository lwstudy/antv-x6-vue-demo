<template>
  <Card class="my-panel" :shadow="shadow" :class="classes" :bodyStyle="cardBodyStyle">
    <template v-if="header" v-slot:header>
      <div v-if="tabs" class="my-panel__header my-panel__tabs" ref="header" :style="headerStyle">
        <Tabs v-model="currentTab">
          <TabPane v-for="tab in tabs" :key="tab.name||tab.label" v-bind="tab" lazy>
            <slot v-if="$scopedSlots.label" name="label" slot="label" v-bind="tab"></slot>
          </TabPane>
        </Tabs>
        <div v-if="$slots.handle" class="my-panel__handle">
          <slot name="handle"></slot>
        </div>
      </div>
      <div v-else class="my-panel__header" ref="header" :style="headerStyle">
        <slot name="header">
          <my-header :title="title"
                     :icon="icon"
                     :theme="titleTheme"
                     :size="size"
                     :background="titleBackground">
            <template v-slot:title>
              <slot name="title"></slot>
            </template>
            <template v-slot:handle>
              <slot name="handle"></slot>
            </template>
          </my-header>
        </slot>
      </div>
    </template>

    <div class="my-panel__body"
         :class="{'is-fit':fit}"
         :style="mergeBodyStyle">
      <slot></slot>

      <template v-for="tab in tabs">
        <slot v-if="tab.name===currentTab" :name="tab.name" v-bind="tab"></slot>
      </template>
    </div>

    <div v-if="$slots.footer"
         ref="footer"
         class="my-panel__footer"
         :class="[`is-${footerAlign}`, `is-${theme}`]"
         :style="footerStyle">
      <slot name="footer"></slot>
    </div>
    <div v-if="actions && actions.length" class="my-panel__actions">
      <Action v-for="(action,index) in actions"
              :key="index" v-bind="action"
              :style="{width:`${100/actions.length}%`}"
              @click.native="handleActionClick(action)">
        <slot v-if="$scopedSlots.action" name="action" v-bind="action"></slot>
      </Action>
    </div>

  </Card>
</template>

<script>

  /**
   * 面板容器组件
   * @module $ui/components/my-panel
   */

  import {Card, Tabs, TabPane} from 'element-ui'

  import {MyHeader} from '$ui'
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
  import {throttle} from '$ui/utils/util'
  import Action from './Action'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义容器放置的内容
   * @property {string} header 自定义头部内容，如果自定义头部，title 和 handle 插槽将失效
   * @property {string} title 定义标题内容
   * @property {string} handle 定义右上角的操作区
   * @property {string} footer 定义底部内容
   * @property {string} label 定义tab的label显示内容
   */

  export default {
    name: 'MyPanel',
    components: {
      Card,
      MyHeader,
      Tabs,
      TabPane,
      Action
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [header=true] 是否显示头部
     * @property {string} [shadow=always] 设置阴影显示时机，可选值：'always', 'hover', 'never'
     * @property {string} [title] 标题文本，如果需要设置复制的标题，可以使用title插槽
     * @property {string} [icon] 标题左侧的图标
     * @property {string} [theme] 风格设置，可选值：'', 'background', 'border-top', 'border-left', 'flag'
     * @property {string} [size] 设置尺寸，可选值：'', 'large', 'medium', 'small'
     * @property {boolean} [fit=false] 设置自适应父节点的高度
     * @property {boolean} [border=true] 设置是否显示边框
     * @property {string} [footerAlign=right] 底部对齐方式, 可选值：'left', 'center', 'right'
     * @property {Object} [bodyStyle] 主体内容设置样式
     * @property {Object} [headerStyle] 头部设置样式
     * @property {Object} [footerStyle] 底部设置样式
     * @property {Array} [tabs] 选项卡数组，数据项对象 {label, name, disabled}, 如果要定义内容插槽，必须要设置name
     * @property {String} [defaultTab] 初始显示的tab 名称
     * @property {Array} [actions] 底部操作按钮数组 ，数据项对象 {text, icon}
     */
    props: {
      // 显示头部
      header: {
        type: Boolean,
        default: true
      },
      // 设置阴影显示时机
      shadow: {
        type: String,
        default: 'always',
        validator(val) {
          return ['always', 'hover', 'never'].includes(val)
        }
      },
      // 标题文本
      title: String,
      // 标题 icon
      icon: String,

      // 主题风格
      theme: {
        type: String,
        validator() {
          return ['', 'background', 'border-top', 'border-left', 'flag']
        }
      },
      // 尺寸
      size: String,

      // 充满夫容器
      fit: Boolean,
      // body样式
      bodyStyle: Object,
      // 底部样式
      footerStyle: Object,
      // 头部样式
      headerStyle: Object,
      // 底部对齐方式
      footerAlign: {
        type: String,
        default: 'right',
        validator(val) {
          return ['left', 'center', 'right'].includes(val)
        }
      },
      // 显示边框
      border: {
        type: Boolean,
        default: true
      },
      tabs: Array,
      defaultTab: String,
      // 操作按钮
      actions: Array
    },
    data() {
      return {
        headerHeight: 0,
        footerHeight: 0,
        currentTab: this.defaultTab || (this.tabs && this.tabs[0] || {}).name
      }
    },
    computed: {
      titleBackground() {
        return this.theme === 'background'
      },
      titleTheme() {
        if (this.theme === 'flag') {
          return 'bg-down'
        }
        if (this.theme === 'border-left') {
          return 'border-left'
        }
        return null
      },
      classes() {
        return {
          [`my-panel--${this.theme}`]: !!this.theme,
          'is-fit': this.fit,
          'is-no-border': !this.border,
          [`is-${this.size}`]: !!this.size
        }
      },
      mergeBodyStyle() {
        if (!this.fit) {
          return this.bodyStyle
        }
        return {
          ...this.bodyStyle,
          height: `calc(100% - ${this.footerHeight}px)`
        }
      },
      cardBodyStyle() {
        if (!this.fit) {
          return null
        }
        return {
          height: `calc(100% - ${this.headerHeight}px)`
        }
      }
    },
    watch: {
      currentTab(val) {
        /**
         * tab切换时触发
         * @event tab-change
         * @param {string} name 选项卡名称
         */
        this.$emit('tab-change', val)
      }
    },
    methods: {
      setHeight() {
        if (this.$refs.header) {
          this.headerHeight = this.$refs.header.getBoundingClientRect().height
        } else {
          this.headerHeight = 0
        }
        if (this.$refs.footer) {
          this.footerHeight = this.$refs.footer.getBoundingClientRect().height
        } else {
          this.footerHeight = 0;
        }
      },
      bindResize() {
        if (this.$refs.header) {
          addResizeListener(this.$refs.header, this.proxyResize)
        }
        if (this.$refs.footer) {
          addResizeListener(this.$refs.footer, this.proxyResize)
        }
      },
      unbindResize() {
        if (this.$refs.header) {
          removeResizeListener(this.$refs.header, this.proxyResize)
        }
        if (this.$refs.footer) {
          removeResizeListener(this.$refs.footer, this.proxyResize)
        }
      },
      handleActionClick(action) {
        /**
         * 点击操作按钮时触发
         * @event action
         * @param {object} action 按钮对象
         */
        this.$emit('action', action)
      }
    },
    created() {
      this.proxyResize = throttle(this.setHeight, this)
    },
    updated() {
      this.$nextTick(this.proxyResize)
    },
    mounted() {
      this.bindResize()
      this.$nextTick(this.proxyResize)
    },
    beforeDestroy() {
      this.unbindResize()
    }
  }
</script>


