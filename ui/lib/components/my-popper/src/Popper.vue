<template>
  <el-popover
    ref="popper"
    popper-class="my-theme-popup"
    :placement="placement"
    width="auto" 
    @show="showHandle" 
    v-on="$listeners"
    v-bind="$attrs"
    >
    <div class="my-theme-popup__body" :style="this.popperBodyStyle">
      <my-svg-line 
      class="svg-line" 
      :style="{'position': 'absolute', ...svgStyle}" 
      ref="svg"
      v-bind="{
        type: svgDirection,
        ...svgProps
      }"
      ></my-svg-line>
      <template >
        <slot> 
        </slot>
      </template>
    </div>
    <template v-slot:reference>
      <slot name="reference">
      <!-- <el-button slot="reference">click 激活</el-button> -->
      </slot>
    </template>
  </el-popover>
</template>
<script>
/**
 * Popper
 * @module $ui/components/my-popper
 */
import {MySvgLine} from '$ui'
/**
 * 插槽
 * @member slots
 * @property {string} default 默认插槽
 * @property {string} reference 同el-popper 的 reference插槽
 */ 
export default {
  name: 'MyPopper',
  components: {
    MySvgLine
  },
  /**
   * @member props
   * @property {string} [type] my-popper的弹出方向：'left-top', 'right-top', 'left-bottom', 'right-bottom'
   * @property {Number} [svgWidth] svg折线区域的宽度
   * @property {Number} [svgHeight] svg折线区域的高度
   * @property {String} [trackColor] svg线颜色 默认skyblue
   * @property {String} [pointColor] svg点颜色 默认skyblue
   * @property {String} [svgProps] svg线的其他属性，见my-svg-line
   */
  props: {
    placement: {
      type: String,
      default: 'left-start', 
      validator(val) {
        return ['left-start', 'left-end', 'right-start', 'right-end'].includes(val)
      } 
    },
    svgWidth: {
      type: Number,
      default: 70
    },
    svgHeight: {
       type: Number,
      default: 20
    },
    svgProps: {
      type: Object,
      default: () => {
        return {
          angle: 145,
          during: 2
        }
      }
    }
  },
  data() {
    return {
      popperDom: null,
      arrowDom: null,
      realPlacement: this.placement,
      arrowTop: 0
    }
  },
  computed: {
    svgDirection() {
      if (this.realPlacement === 'left-start') { // popper在左
        if (this.arrowTop < 40) { // 箭头在上
          return 'right-top'
        } else {
          return 'right-bottom'
        }
      } else if (this.realPlacement === 'right-start') {
        if (this.arrowTop < 40) { // 箭头在上
          return 'left-top'
        } else {
          return 'left-bottom'
        }
      } else {
        return 'left-top'
      }
    },
    popperBodyStyle() {
      let paddingLeft = 0
      let paddingRight = 0
      let paddingTop = 0
      let paddingBottom = 0
      if(this.svgDirection === 'right-top') {
        paddingLeft = 0
        paddingRight = this.svgWidth
        paddingTop = this.svgHeight
        paddingBottom = 0
      } else if(this.svgDirection === 'left-top') {
        paddingLeft = this.svgWidth
        paddingRight = 0
        paddingTop = this.svgHeight
        paddingBottom = 0
      } else if(this.svgDirection === 'right-bottom') {
        paddingLeft = 0
        paddingRight = this.svgWidth
        paddingTop = 0
        paddingBottom = this.svgHeight
      } else {
        paddingLeft = this.svgWidth
        paddingRight = 0
        paddingTop = 0
        paddingBottom = this.svgHeight
      }
      return {
        'padding-left': paddingLeft + 'px',
        'padding-right': paddingRight + 'px',
        'padding-top': paddingTop + 'px',
        'padding-bottom': paddingBottom + 'px'
      }
    },
     
    svgStyle() {
      // const w = typeof this.lineWidth === 'number' ? `${this.lineWidth}px` : this.lineWidth
      // const h = typeof this.lineHeight === 'number' ? `${this.lineHeight}px` : this.lineHeight 
      const style = {
        width: this.svgWidth + 'px',
        height: this.svgHeight + 'px'
      }
      if(this.svgDirection === 'right-top') {
        style.right = '0'
        style.top = '0'
      } else if(this.svgDirection === 'left-top') {
        style.left = '0'
        style.top = '0' 
      } else if(this.svgDirection === 'right-bottom') {
        style.right = '0'
        style.bottom = '0' 
      } else {
        style.left = '0'
        style.bottom = '0' 
      }
      return style
    }
  },
  methods: {
    // getSvgSize() { 
    //   const svgDom = this.$refs.svg.$el 
    //   console.log(svgDom, svgDom.offsetWidth)
    //   this.svgWidth = svgDom.offsetWidth - 5 // parseInt(svgDom.getAttribute('width')) - 5
    //   this.svgHeight = svgDom.offsetHeight - 3 // parseInt(svgDom.getAttribute('height')) - 3 
       
    // },
    showHandle() {

      if (!this.popperDom) {
        this.popperDom = this.$refs.popper.$refs.popper
        this.arrowDom = this.popperDom.getElementsByClassName('popper__arrow')[0]
      }
      // console.log(this.popperDom, this.arrowDom)
      this.arrowTop = parseInt(this.arrowDom.style.top)
      this.realPlacement = this.popperDom.getAttribute('x-placement') 
      
      // this.getSvgSize()
    } 
  },
  created() {
  },
  mounted() {
    
  }
}
</script>
<style lang="scss">
// .el-popover.el-popper.my-theme-popup{
//   background: transparent !important;
//   box-shadow: none !important;
//   border: 0px solid !important;
//   padding: 0 !important;
//   min-width: 0;
//   margin: 0 !important;

//   .popper__arrow{
//     display: none;
//   }
//   &__body{
//     position: relative;
//   }
// }
</style>