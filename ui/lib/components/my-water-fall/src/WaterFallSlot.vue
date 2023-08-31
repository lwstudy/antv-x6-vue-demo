<template> 
   
  <div v-if="isHorizontal" class="item-warp" :style="hItemWarpStyle" > 
    <div class="padding" :style="hWarpHeightStyle"></div>
    <div class="content-warp">
      <!-- <slot  :scope="{...item, $index: index, $all: data}"></slot> -->
      <slot></slot>
    </div>  
  </div> 

  <div v-else class="item-warp" :style="vItemWarpStyle" >
    <div class="content-warp" >
      <!-- <slot :scope="{...item, $index: index, $all: dataList}"></slot>  -->
      <slot></slot>
    </div>
  </div>  
    
</template>

<script> 
export default {
  name: 'MyWaterFallSlot',
  components: { 
  },
  props: { 
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    left: {
      type: Number
    },
    top: {
      type: Number
    }
    
     
  },
  data() {
    return {
      isHorizontal: this.$parent.$parent.isHorizontal,
      itemHeight: this.$parent.itemHeight,
      margin: this.$parent.margin
    }
  },
  computed: {
    hItemWarpStyle() {
      return {
        margin: this.margin + 'px', 
        width: this.width * this.itemHeight / this.height + 'px', 
        flexGrow: this.width / this.height
      }
    },
    hWarpHeightStyle() {
      return {paddingBottom: `${this.height / this.width * 100}%`}
    },
    vItemWarpStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        left: this.left + 'px',
        top: this.top + 'px'
      }  
    }
    
  },
  methods: {
    
  }
}
</script>