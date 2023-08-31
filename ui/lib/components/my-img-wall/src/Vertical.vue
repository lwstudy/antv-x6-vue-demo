<template>
<div class="my-v-water-fall">
  <my-card-list ref="cardList" :data="colArr" :columns="columns" > 
    <div slot-scope="{item}" :id="item.index" class="col-warp"  ref="warp">
      <div class="img-warp" :style="{'margin-bottom': margin + 'px'}" v-for="(data, num) in item.imgs" :key="`img_warp_${num}`">
        <slot  name="image" :scope="data">
          <img :src="data._img.src" alt=""> 
        </slot>
        <slot name="content" :scope="data">
          
        </slot> 
      </div> 
    </div>
  </my-card-list>
</div>
</template>

<script>

import {debounce} from '$ui/utils/util'

export default {
  mixins: [],
  components: {},
  props: {
    margin: {
      type: Number,
      default: 5
    },
    columns: {
      type: Object,
      default: () => {
        return {
          xxl: 8,
          xl: 6,
          lg: 4,
          md: 3,
          sm: 3,
          xs: 2
        }
      }
    }
  },
  data() {
    return {
      colArr: [], 
      imgData: [],
      warpWidth: 0
    }
  },
  computed: {
  },
   
  methods: {
    calcCol() {
      const oldLength = this.colArr.length 
      const colNum = this.$refs.cardList.getResponsiveValue()  
      const arr = Array.from({length: colNum}).map((v, k) => { return {index: k, imgs: [], height: 0} })
     
      if (oldLength === arr.length) {
        return
      }
      this.colArr = arr
      this.$nextTick(() => {
        this.imgData.length && this.sortImgs(this.imgData)
      })
    },
    sortImgs(imgArr) {
      const colDom = this.$refs.cardList.$children[0].$children[0].$el
      this.warpWidth = colDom.offsetWidth 
      imgArr.forEach((item) => {
        const minIndex = this._findMinHeight(this.colArr)

        this.colArr[minIndex].imgs.push(item)
        this.colArr[minIndex].height = this.colArr[minIndex].height + (item._img.height * this.warpWidth / item._img.width) + this.margin
      })
    },
    addImgData(imgArr) {
      this.imgData = this.imgData.concat(imgArr) 
      this.sortImgs(imgArr)
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
    }
  },
  created() {},
  mounted() { 
    this.calcCol()
    this.calcColProxy = debounce(this.calcCol, 400)
    window.addEventListener('resize', this.calcColProxy)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcColProxy)
  }
}
</script>