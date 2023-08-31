<template> 
  <el-row class="my-key-val-list" v-bind="$attrs" >
    <el-col v-for="(item, index) in showColList" :key="`${item.prop}_${index}`" :span="setSpan(item)"> 
      <template>
        <slot v-if="item.type === 'devide'" :name="item.prop">

        </slot>
        <slot v-else :name="item.prop"  v-bind="{...item, $index: index, value: data[item.prop]}">
          <my-description :border="item.border" :title="item.label" :width="item.width ? item.width : labelWidth" :align="item.align ? item.align : labelAlign">
           {{data[item.prop]}}
          </my-description>  
        </slot>
      </template> 
    </el-col> 
  </el-row>
</template>
<script>
/**
 * 键值对列表
 * @module $ui/components/my-key-val-list
 */
import responsiveCol from '$ui/utils/responsive-col'
/**
 * 插槽
 * @member slots 
 * @property {string} $prop 作用域插槽，$prop是动态值，表示字段名称或devide名称
 */ 
export default {
  name: 'MyKeyValList',
  mixins: [responsiveCol],
  components: {},
  /**
   * 属性参数
   * @member props
   * @property {Object} [data] 对象
   * @property {Array} [column] 列配置数据
   * @property {String} [column.label] 列配置：标题
   * @property {String} [column.prop] 列配置：对应key字段
   * @property {String} [column.devide] 列配置：分割区域（在当前字段后面添加一个 span=24 的分割区域，根据devide名称为slot名，若当前列没有配置‘prop’，则此数据以分割区域slot生成）
   * @property {Boolean} [column.ellipsis] 列配置：内容过长省略
   * @property {String} [column.span] 列配置：span(参考el-col), 不设置以响应式为准
   * @property {String} [column.border] 列配置：定义单个字段是否使用下划线
   * @property {number|object} [columns] 一行显示几项, 可设置响应式
   * @property {boolean} [listenEl] 监听$el元素宽度实现响应布局（默认为false）
   * @property {boolean} [border] 是否整体使用下划线
  */ 
  props: {
    column: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    labelAlign: {
      type: String,
      default: 'right'
    },
    strict: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
       
    }
  }, 
  computed: {
    showColList() {
      return this.column.reduce((total, item) => {
        if (!item.devide) {
          total.push(item)
        } else {
          if (item.prop) {
            total.push(item)
          }
          total.push({prop: item.devide, type: 'devide'})
        }
        return total
      }, [])
    }
  },
  methods: {
    setSpan(item) {
      if (!item.span) {
        if (item.type === 'devide') {
          return 24
        } else {
          return 24 / this.currentColumn
        }
      } else if (item.span > 24) {
        return 24
      } else {
        if (this.strict) {
          const colSpan = Math.round(24 / this.currentColumn)
          if (item.span % colSpan === 0) {
            return item.span
          } else {
            return 24
          }
        } else {
          return item.span
        } 
      } 
    } 
  } 
}
</script>
 