<template>
  <Horizontal v-if="isHorizontal"  v-bind="$attrs" :data="data" ref="waterFall">
    <template v-slot="{scope}">
      <slot :scope="scope"></slot>  
    </template> 
  </Horizontal> 

  <Vertical v-else v-bind="$attrs" :data="data" ref="waterFall">
    <template v-slot="{scope}">
      <slot :scope="scope"></slot>  
    </template> 
  </Vertical>
</template>

<script>
/**
 * 瀑布流组件
 * @module $ui/components/my-water-fall
 */
import Vertical from './Vertical'
import Horizontal from './Horizontal'
/**
 * 插槽
 * @member slots
 */

export default {
  name: 'MyWaterFall',
  components: {
    Vertical,
    Horizontal
  },
  /**
   * 属性参数
   * @member props
   * @property {Boolean} [isHorizontal] 是否横向布局，默认true， false 为纵向布局
   * @property {Object} [columns] 纵向布局时 显示列数，支持响应式对象设置 {xxl,xl,lg,md,sm,xs}
   * @property {boolean} [listenEl] 监听$el元素宽度实现响应布局（默认为false）
   */
  props: {
    isHorizontal: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
    // itemHeight: {
    //   type: Number,
    //   default: 200
    // },
    // margin: {
    //   type: Number,
    //   default: 5
    // }
     
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    itemWarpStyle(item) {
      return {
        margin: this.margin + 'px', 
        width: item.width * this.itemHeight / item.height + 'px', 
        flexGrow: item.width / item.height
      }
    },
    warpHeightStyle(item) {
      return {paddingBottom: `${item.height / item.width * 100}%`}
    } 
     
  },
  created() {},
  mounted() {
    
  }
}
</script>