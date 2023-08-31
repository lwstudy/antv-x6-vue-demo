<template>
  <Breadcrumb v-if="data && data.length"
              class="my-breadcrumb"
              :class="classes"
              :separator="separator"
              :separator-class="separatorClass">
    <BreadcrumbItem v-for="(item, index) in data"
                    :key="`BreadcrumbItem${index}`"
                    :class="{'is-active':active===index,'is-pointer':!!$listeners.click, 'is-only-one': data.length === 1}"
                    @click.native="handleClick(item, index)"
                    :to="item.to">
      <slot>
        <my-icon v-if="item.icon" v-bind="getIconOptions(item.icon)"></my-icon>
        {{item.label}}
      </slot>

    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  /**
   * 面包屑导航
   * @module $ui/components/my-breadcrumb
   */
  import {Breadcrumb, BreadcrumbItem} from 'element-ui'
  import {MyIcon} from '$ui'

  export default {
    name: 'MyBreadcrumb',
    components: {
      Breadcrumb,
      BreadcrumbItem,
      MyIcon
    },
    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 菜单项数据 [{label,icon,to}]
     * @property {string} [data.label] 菜单项名称
     * @property {string|object} [data.icon] 菜单项图标，支持svg类型
     * @property {string} [data.to] 菜单链接路由
     * @property {string} [separator] 分隔符
     * @property {string} [theme] 风格，可选值：'flat', 'arrow'
     * @property {number} [active] 当前激活的菜单索引，支持sync修饰符
     */
    props: {
      // [{label, icon, to}]
      data: {
        type: Array
      },
      separator: String,
      separatorClass: String,
      theme: {
        type: String,
        validator(val) {
          return ['', 'flat', 'arrow'].includes(val)
        }
      },
      active: {
        type: Number
      }
    },
    computed: {
      classes() {
        return {
          [`is-${this.theme}`]: !!this.theme
        }
      }
    },
    methods: {
      getIconOptions(icon) {
        if (typeof icon === 'string') {
          return {
            name: icon
          }
        }
        return {
          ...icon
        }
      },
      handleClick(item, index) {
        /**
         * 点击菜单时触发
         * @event click
         * @param {object} item 菜单项
         * @param {number} index 菜单项索引
         */
        this.$emit('click', item, index)
        this.$emit('update:active', index)
      }
    }
  }
</script>
