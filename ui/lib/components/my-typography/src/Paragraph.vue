<template>
  <MyBase v-on="$listeners"
          v-bind="$props"
          tag="div"
          class="my-paragraph"
          :children="$slots.default">
  </MyBase>
</template>

<script>
  /**
   * 文本排版基础组件
   * @module $ui/components/my-paragraph
   */
  import Base from './Base'
  /**
   * 插槽
   * @member slots
   * @property {string} default  默认插槽，定义内容
   */

  /**
   * 复制文字时触发
   * @event copy
   * @param {Object} 事件对象
   */

  /**
   * 开始编辑时触发
   * @event editing
   */

  /**
   * 展开或收起时触发
   * @event expand
   * @param {Boolean} expanded 是否展开
   */

  /**
   * 编辑结束时触发
   * @event edited
   * @param {String} text 文本内容
   */

  /**
   * 编辑文本改变时触发
   * @event change
   * @param {String} text 文本内容
   */

  export default {
    name: 'MyParagraph',
    components: {
      MyBase: Base
    },
    /**
     * 属性参数
     * @member props
     * @property {Boolean} [copyable=false] 是否可拷贝
     * @property {String} [copyText] 复制文本内容, 默认取虚拟DOM的innerText
     * @property {Boolean} [delete=false] 添加删除线样式
     * @property {Boolean} [disabled=false] 禁用文本样式
     * @property {Boolean} [editable=false] 是否可编辑
     * @property {Boolean} [ellipsis=false] 设置自动溢出省略
     * @property {Number} [rows=1] 超出几行显示省略， ellipsis true 有效
     * @property {Boolean} [expandable=false] 显示展开按钮 ellipsis true 有效
     * @property {Boolean} [mark=false] 添加标记样式
     * @property {Boolean} [underline=false] 添加下划线样式
     * @property {Boolean} [code=false] 添加引用样式
     * @property {Boolean} [strong=false] 是否加粗
     * @property {Boolean} [pre=false] 保留格式
     * @property {String} [type] 文本类型 '', 'primary', 'secondary', 'warning', 'danger'
     */
    props: {
      ...Base.props
    }
  }
</script>

