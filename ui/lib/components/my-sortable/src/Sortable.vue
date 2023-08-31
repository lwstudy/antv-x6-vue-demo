<template>
  <div class="my-sortable">
    <div v-for="(item, index) in list"
         :key="index"
         :data-id="index"
         :class="itemClass"
         class="my-sortable__item">
      <slot :item="item" :index="index">{{item}}</slot>
    </div>
  </div>
</template>

<script>
  /**
   * 拖拽排序组件
   * @module $ui/components/my-sortable
   *
   * @example
   *
   *  http://www.sortablejs.com/index.html
   */
  import Sortable from './Sortable'

  /**
   * 插槽
   * @member slots
   * @property {string} default 作用域插槽，定义各项内容，参数：item 数据项， index 数据项索引
   */

  export default {
    name: 'MySortable',
    mixins: [Sortable],
    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 数据，支持 sync 修饰符
     * @property {object} [options] Sortablejs 参数选项
     * @property {string} [itemClass] 项样式
     */
    props: {
      // 数据
      data: {
        type: Array,
        default() {
          return []
        }
      },
      // 选项
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      // 项的样式
      itemClass: String
    },
    data() {
      return {
        list: this.data.slice(0)
      }
    },
    watch: {
      data: {
        immediate: true,
        handler(val) {
          this.list = val.slice(0)
        }
      },
      list() {
        this.$nextTick(this.reset)
      }
    }
  }
</script>

