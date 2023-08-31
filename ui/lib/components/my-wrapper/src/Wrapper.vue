<template>
  <div class="my-wrapper" :class="{'is-fit': fit,'is-split':split,'is-no-header':!header}">
    <div v-if="header" class="my-wrapper__header" :class="classes">
      <my-breadcrumb class="my-wrapper__breadcrumb"
                     v-if="breadcrumb && breadcrumb.length"
                     :data="breadcrumb"></my-breadcrumb>
      <my-float v-if="$slots.title || $slots.actions || title"
                class="my-wrapper__ft">
        <my-float-item float="left"
                       class="my-wrapper__title">
          <span v-if="back" @click="handleBack" class="my-wrapper__back"><i class="el-icon-back"></i></span>
          <slot name="title">{{title}}</slot>
        </my-float-item>
        <my-float-item float="left" class="my-wrapper__sub-title">
          <slot name="subTitle">{{subTitle}}</slot>
        </my-float-item>
        <my-float-item v-if="$slots.actions"
                       class="my-wrapper__actions"
                       float="right">
          <slot name="actions"></slot>
        </my-float-item>
      </my-float>

      <div v-if="$slots.extra || extra" class="my-wrapper__extra">
        <slot name="extra">{{extra}}</slot>
      </div>

      <div v-if="links && links.length" class="my-wrapper__links">
        <span v-for="(item, index) in links"
              :key="`link${index}`"
              class="my-wrapper__links-item"
              :class="{'is-active':item.value===activeLink}"
              @click="handleLinkClick(item)">
          <slot name="link" :link="item" :index="index">
               {{item.label}}
          </slot>
        </span>
      </div>
    </div>
    <div ref="body" class="my-wrapper__body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="my-wrapper__footer">
      <slot name="footer"></slot>
    </div>


  </div>
</template>

<script>
  /**
   * 页面容器组件
   * @module $ui/components/my-wrapper
   */
  import {MyBreadcrumb, MyFloat, MyFloatItem} from '$ui'
  import {on, off} from 'element-ui/lib/utils/dom'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，可以放置my-container
   * @property {string} title 定义标题内容
   * @property {string} subTitle 子标题内容
   * @property {string} actions 定义操作区
   * @property {string} extra 定义额外扩展内容
   * @property {string} link 作用域插槽，定义链接子项，参数：link 链接项数据，index：在links的索引
   * @property {string} footer 底部内容
   */

  export default {
    name: 'MyWrapper',
    components: {
      MyBreadcrumb,
      MyFloat,
      MyFloatItem
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 标题文本，复杂内容可用插槽定义
     * @property {string} [subTitle] 子标题文本， 复杂内容可用插槽定义
     * @property {string} [extra] 额外内容文本，复杂内容可用插槽定义
     * @property {Array} [breadcrumb] 面包屑数据配置,项包含字段：label, icon, to
     * @property {string} breadcrumb.label 文本
     * @property {string|object} [breadcrumb.icon] 图标配置
     * @property {string|object} [breadcrumb.to] 链接路由
     * @property {Array} [links] 链接按钮数据配置，项包含字段：label, value, to
     * @property {string} [links.label] 菜单文本
     * @property {string|number} [links.value] 值或标识
     * @property {string|object} [links.to] 链接路由
     * @property {string|number} [defaultActiveLink] 默认选中的链接值
     * @property {boolean} [header=true] 是否显示头部
     * @property {boolean} [split=true] 是否显示分隔
     * @property {boolean} [back=false] 显示返回按钮
     * @property {boolean} [fit=false] 是否自适应高度
     */
    props: {
      title: String,
      subTitle: String,
      extra: String,
      //  [{label, icon, to}]
      breadcrumb: Array,
      // [{label, value, to}]
      links: Array,
      defaultActiveLink: [String, Number],
      header: {
        type: Boolean,
        default: true
      },
      // 高度自适应
      fit: {
        type: Boolean,
        default: false
      },
      // 显示分隔
      split: {
        type: Boolean,
        default: true
      },
      // 返回按钮
      back: Boolean
    },
    data() {
      return {
        activeLink: this.defaultActiveLink,
        showHeaderLine: false
      }
    },
    computed: {
      classes() {
        return {
          'has-links': this.links && this.links.length > 0,
          'is-border-line': this.showHeaderLine
        }
      }
    },
    watch: {
      defaultActiveLink: {
        immediate: true,
        handler(val) {
          this.activeLink = val
        }
      }
    },
    methods: {
      handleLinkClick(item) {
        this.activeLink = item.value
        if (this.$router && item.to) {
          this.$router.push(item.to)
        }
        /**
         * 点击链接时触发
         * @event link-click
         * @param {Object} item 链接项数据对象
         */
        this.$emit('link-click', item)
      },
      handleBack() {
        if (this.$listeners.back) {
          /**
           * 点击返回按钮时触发
           * @event back
           */
          this.$emit('back')
        } else {
          this.$router && this.$router.back()
        }
      },
      handleScroll(e) {
        const scrollTop = e.target.scrollTop
        this.showHeaderLine = scrollTop > 20
      }
    },
    mounted() {
      this.$refs.body && on(this.$refs.body, 'scroll', this.handleScroll)
    },
    beforeDestroy() {
      this.$refs.body && off(this.$refs.body, 'scroll', this.handleScroll)
    }
  }
</script>

