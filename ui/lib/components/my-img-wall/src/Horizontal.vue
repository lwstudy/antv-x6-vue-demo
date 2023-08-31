<template>
<div class="my-h-water-fall"> 
  <div class="item-warp" v-for="(item, index) in imgData" :key="index" :style="itemWarpStyle(item)" > 
    <div class="padding" :style="warpHeightStyle(item)"></div>
    <div class="img-warp">
      <slot name="image" :scope="{item}">
        <img :src="item._img.src" alt="">
      </slot>
    </div> 
    <slot name="content" :scope="{item}"></slot> 
  </div> 
</div>
</template>
<script>
export default {
  mixins: [],
  components: {},
  props: {
    imgHeight: {
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
      imgData: []
    }
  },
  watch: {
    // imgData(value) {
    //   console.log(value)
    // }
  },
  computed: {
  },
  methods: {
    itemWarpStyle(item) {
      return {
        margin: this.margin + 'px', 
        width: item._img.width * this.imgHeight / item._img.height + 'px', 
        flexGrow: item._img.width / item._img.height
      }
    },
    warpHeightStyle(item) {
      return {paddingBottom: `${item._img.height / item._img.width * 100}%`}
    },
    addImgData(arr) {
      this.imgData = this.imgData.concat(arr)  
    }
  },
  created() {},
  mounted() {}
}
</script>