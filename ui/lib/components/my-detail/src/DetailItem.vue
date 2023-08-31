<template>
  <div style="display: none">
    <slot name="label"></slot>
    <slot></slot>
  </div>
</template>

<script>
  /**
   * 描述子项组件，需要与my-detail组件配合实用
   * @module $ui/components/my-detail-item
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义内容
   * @property {string} label 定义标签内容
   */
  export default {
    name: 'MyDetailItem',
    inject: ['detail'],
    /**
     * 属性参数
     * @member props
     * @property {string} [label] 内容的描述
     * @property {number} [span=1] 包含列的数量
     * @property {string} [labelAlign=left] 标签对齐方式
     * @property {string} [contentAlign=left] 内容对齐方式
     * @property {object} [labelStyle={}] label节点的样式
     * @property {object} [contentStyle={}] content节点的样式
     */
    props: {
      label: String,
      span: {
        type: Number,
        default: 1
      },
      labelAlign: {
        type: String,
        default() {
          return this.detail.labelAlign
        },
        validator(val) {
          return ['left', 'center', 'right'].includes(val)
        }
      },
      contentAlign: {
        type: String,
        default() {
          return this.detail.contentAlign
        },
        validator(val) {
          return ['left', 'center', 'right'].includes(val)
        }
      },
      labelStyle: {
        type: Object,
        default: () => { return {} }
      },
      contentStyle: {
        type: Object,
        default: () => { return {} }
      }  
    },
    data() {
      return {
        currentSpan: this.span
      }
    },
    watch: {
      span(val) {
        this.currentSpan = val
      }
    },
    created() {
      if (this.detail) {
        this.detail.items.push(this)
      }
    },
    mounted() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    updated() {
      const idx = this.detail.items.findIndex(item => item === this)
      this.detail.items.splice(idx, 1, this)
    },
    beforeDestroy() {
      const idx = this.detail.items.findIndex(item => item === this)
      this.detail.items.splice(idx, 1)
      this.$el = null
    }
  }
</script>
