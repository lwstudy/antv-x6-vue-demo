<template>
<div class="my-v-water-fall" :style="{'height': maxHeight + 'px'}">
  <!-- 占位用div -->
  <div class="col-warp" 
      :style="{'margin-left': margin + 'px', 'margin-right': margin + 'px'}" 
      ref="colWarp" 
      v-for="i in currentColumn" :key="`col_${i}`">
  </div>
  <!-- 
    <div class="item-warp" v-for="(item, index) in dataList" :key="index"
    :style="setItemWarpStyle(item)"
  >
    <div class="content-warp" >
      <slot :scope="{...item, $index: index, $all: dataList}"></slot> 
    </div>
  </div>  
  -->
  <slot :scope="{data: data}"></slot>
</div>
</template>

<script> 
import {debounce} from '$ui/utils/util'
import responsiveCol from '$ui/utils/responsive-col'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  mixins: [responsiveCol],
  components: {},
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    margin: {
      type: Number,
      default: 5
    } 
  },
  data() {
    return {
      // currentColumn: 3,
      screens: {},
      colArr: [],
      dataList: []
    }
  },
  computed: {
    maxHeight() {
      if (!this.colArr.length) {
        return 0
      } else {
        const targetIndex = this._findMaxHeight(this.colArr)
        return this.colArr[targetIndex].height
      }
    }
  },
  watch: {
    currentColumn: {
      immediate: true,
      handler(val) {
        
        setTimeout(() => {
          this.setItemsPos()
        }, 400)
      }
    },
    
    data() {
      this.$nextTick(() => {
        this.setItemsPos()
      })
    },
    margin() {
      this.$nextTick(() => {
        this.setItemsPos()
      })
    } 
  },

  methods: { 
    getColData() {
      this.colArr = this.$refs.colWarp.map((dom) => {
        return {
          width: dom.offsetWidth,
          height: 0,
          left: dom.offsetLeft
        }
      })
    },

    sortItems() {
      this.dataList = this.data.map((item, index) => {
        const targetIndex = this._findMinHeight(this.colArr)
        // console.log(targetIndex)
        const newTop = this.colArr[targetIndex].height
        const newWidth = this.colArr[targetIndex].width
        const newHeight = newWidth * item.height / item.width
        item.$width = newWidth
        item.$height = newHeight
        item.$top = newTop
        item.$left = this.colArr[targetIndex].left

        item.$index = index

        this.colArr[targetIndex].height += (newHeight + this.margin * 2)

        return item
      })
    },
    setItemWarpStyle(item) {
      return {
        width: item.$width + 'px',
        height: item.$height + 'px',
        left: item.$left + 'px',
        top: item.$top + 'px'
      }
    },  
    setItemsPos() {
      this.getColData()
      this.sortItems()
    },
    setItemsPosForEl() {
      if (!this.listenEl) return
      this.setItemsPos()
    },
      
    _findMinHeight(cols) {
      let minH = cols[0].height
      let minIndex = 0
      cols.forEach((col, index) => {
        if (col.height < minH) {
          minH = col.height
          minIndex = index
        }
      })
      return minIndex
    },
    _findMaxHeight(cols) {
      let maxH = cols[0].height
      let maxIndex = 0
      cols.forEach((col, index) => {
        if (col.height >= maxH) {
          maxH = col.height
          maxIndex = index
        }
      })
      return maxIndex
    }
  },
  created() { 
    // console.log('currentCol', this.currentColumn) 
  },
  mounted() {  
    this.setItemPosProxy = debounce(this.setItemsPos, 300) 
    window.addEventListener('resize', this.setItemPosProxy)

    this.setItemPosForElProxy = debounce(this.setItemsPosForEl, 300) 
    addResizeListener(this.elDom, this.setItemPosForElProxy)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setItemPosProxy) 
    removeResizeListener(this.elDom, this.setItemPosForElProxy)
  }
}
</script>