<template> 
  <div class="my-h-water-fall">
    <!-- <div class="item-warp" v-for="(item, index) in data" :key="index" :style="itemWarpStyle(item)" > 
      <div class="padding" :style="warpHeightStyle(item)"></div>
      <div class="content-warp" ref="item">
        <slot  :scope="{...item, $index: index, $all: data}"></slot>
      </div>  
    </div>  -->
    <slot :scope="{data: dataProxy}"></slot> 
  </div> 
</template>

<script>  
export default {
  components: { 
  },
  props: { 
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    itemHeight: {
      type: Number,
      default: 200
    },
    margin: {
      type: Number,
      default: 5
    }
     
  },
  data() {
    return {
      
    }
  },
  computed: {
    dataProxy() {
      return this.data.map((item, index) => {
        return {
          ...item,
          $width: item.width,
          $height: item.height,
          $index: item.index
        }
      })
    }
  },
  watch: {
    itemHeight(val) {
      // console.log()
      this.$children.forEach((comp) => {
        comp.itemHeight = val
        comp.margin = this.margin
      })
    },
    margin(val) {
      this.$children.forEach((comp) => {
        comp.itemHeight = this.itemHeight
        comp.margin = val
      })
    }
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
  }
}
</script>