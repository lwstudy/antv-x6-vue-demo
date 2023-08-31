<template>
  <MyForm class="my-filter"
          :class="classes"
          v-bind="formOptions"
          v-on="$listeners"
          :item-width="itemWidth">
    <slot></slot>
  </MyForm>
</template>

<script>
  /**
   * 查询表单组件, 继承MyForm
   * @module $ui/components/my-filter
   */

  import {MyForm} from '$ui'
  // import responsive, {responsiveArray} from '$ui/utils/responsive'
  import responsiveCol from '$ui/utils/responsive-col'
  // 默认参数
  const defaultValues = {
    inline: true,
    footerAlign: 'right',
    submitText: '查询',
    size: 'small',
    footerExpandBlock: false,
    footerFloat: false
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义表单项
   */
  export default {
    name: 'MyFilter',
    // 响应式列处理
    mixins: [responsiveCol], 
    components: {
      MyForm
    },
    /**
     * 属性参数，支持MyFrom全部参数，并增加以下参数
     * @member props
     * @property {boolean} [isFlex] 支持表单弹性布局，并且提交按钮固定在表单最右侧
     * @property {number|object} [columns] 一行显示几项, 可设置响应式
     * @property {boolean} [listenEl] 监听$el元素宽度实现响应布局（默认为false）
     */
    props: {
      // 表单弹性布局
      isFlex: {
        type: Boolean,
        default: true
      },
      // 一行显示几项
      columns: {
        type: [Number, Object],
        default() {
          return {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5
          }
        }
      }
    },
    data() {
      return { 
      }
    },
    computed: {
      classes() {
        return {
          [`is-${this.$attrs.size}`]: !!this.$attrs.size,
          'is-flex': this.isFlex
        }
      },
      itemWidth() {
        return `calc(${100 / this.currentColumn}% - 10px)`
      },
      formOptions() {
        return {
          ...defaultValues,
          ...this.$attrs
        }
      }
    },
    watch: { 
    },
    methods: { 
    },
    beforeDestroy() { 
    }
  }
</script>
