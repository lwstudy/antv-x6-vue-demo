<template>
  <MyContainer class="my-tabs" :class="classes" :fit="isFit" v-bind="$attrs">
    <Tabs v-if="tabs"
          :type="cardType"
          class="my-tabs__tabs"
          v-model="tabName"
          :tab-position="currentPosition"
          :stretch="stretch">
      <TabPane v-for="(tab, index) in tabs"
               :key="tab.name"
               :name="tab.name"
               :label="tab.label"
               lazy>
        <slot slot="label" name="label" v-bind="{tab, index}">{{tab.label}}</slot>
      </TabPane>
    </Tabs>
    <div class="my-tabs__body">
      <slot :tab="currentTab">
        <component v-if="tabComponent" :is="tabComponent" v-bind="currentTab.props" v-on="currentTab.on" :ref="currentTab.ref"></component>
      </slot>
    </div>
  </MyContainer>
</template>

<script>
  /**
   * 选项卡容器组件
   * @module $ui/components/my-tabs
   */
  import {MyContainer} from '$ui'
  import {Tabs, TabPane} from 'element-ui'
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

  /**
   * 插槽
   * @member slots
   * @property {string} label 作用域插槽，定义选项卡的头部，参数 tab：选项卡项数据，index：选项卡索引
   * @property {string} default 作用域插槽，定义选项卡内容，参数 tab：选项卡项数据
   */
  export default {
    name: 'MyTabs',
    components: {
      MyContainer,
      Tabs,
      TabPane
    },
    /**
     * 属性参数， 继承 MyContainer 的全部参数，如 fit、shadow、border
     * @member props
     * @property {array} [tabs] 选项卡数据数组, 项对象 {name,label,component, props}
     * @property {string} [tabs.name] 选项卡名称，用来标识选项卡
     * @property {string} [tabs.label] 选项卡文本，复杂内容可用插槽定义
     * @property {string|VueComponent} [tabs.component] 选项卡加载的组件，可选。定义内容插槽，该设置将会失效
     * @property {object} [tabs.props] 组件的实例化参数，对 设置 tabs.component 有效
     * @property {string} [defaultActive] 初始激活的选项卡名称
     * @property {string} [position=left] tab显示位置，可选 'left', 'right', 'top'
     * @property {boolean} [stretch] 标签的宽度是否自撑开，对 position 为 top 有效
     * @property {number} [responsiveWidth] 响应式的宽度，小于该值后变成position=top
     * @property {boolean} [fixed] 固定tabs，不随页面滚动，对 position 为 left 或 right 有效
     * @property {boolean} [card] 开启卡片模式，仅对 position 为 top 有效
     *
     */
    props: {
      // [{name, label, component, props}]
      tabs: {
        type: Array
      },
      // 绑定值，选中选项卡的 name
      defaultActive: {
        type: String
      },
      // tab 位置
      position: {
        type: String,
        default: 'left',
        validator(val) {
          return ['left', 'right', 'top'].includes(val)
        }
      },
      // 标签的宽度是否自撑开，对 position 为 top 有效
      stretch: Boolean,
      // 开启响应式
      responsiveWidth: Number,
      // 固定tabs
      fixed: Boolean,
      // 卡片模式
      card: Boolean
    },
    data() {
      return {
        tabName: null,
        currentPosition: this.position
      }
    },
    computed: {
      currentTab() {
        if (!this.tabs) return null
        return this.tabs.find(t => t.name === this.tabName)
      },
      tabComponent() {
        if (!this.currentTab) return null
        return this.currentTab.component
      },
      classes() {
        return {
          [`is-${this.currentPosition}`]: !!this.currentPosition,
          'is-fixed': this.fixed,
          'is-card': !!this.cardType
        }
      },
      isFit() {
        return (this.currentPosition === 'top' && this.fixed) || this.$attrs.fit
      },
      cardType() {
        return (this.currentPosition === 'top' && this.card) ? 'card' : null
      },
      isResponsive() {
        return this.responsiveWidth > 0 && this.currentPosition !== 'top'
      }
    },
    watch: {
      defaultActive: {
        immediate: true,
        handler(val) {
          if (!val && this.tabs && this.tabs[0]) {
            this.tabName = this.tabs[0].name
          } else {
            this.tabName = val
          }
        }
      },
      tabName(val) {
        /**
         * 选项卡切换时触发
         * @event change
         * @param {string} name 选项卡名称
         * @param {Object} tab 选项卡数据对象
         */
        this.$emit('change', val, this.currentTab)
      },
      position: {
        immediate: true,
        handler(val) {
          this.currentPosition = val
        }
      }
    },
    methods: {
      responsive() {
        const rect = this.$el.getBoundingClientRect()
        this.currentPosition = rect.width < this.responsiveWidth
          ? 'top'
          : this.position
      }
    },
    mounted() {
      this.isResponsive && addResizeListener(this.$el, this.responsive)
    },
    beforeDestroy() {
      this.isResponsive && removeResizeListener(this.$el, this.responsive)
    }
  }
</script>

