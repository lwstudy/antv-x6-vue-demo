<template>
  <div :class="{
      'my-slide-layout': true, 
      'horizontal': type === 'horizontal', 
      'vertical': type === 'vertical'
    }"
    ref="body"
  >
    <div class="left-warp" v-if="type === 'horizontal'">
      <div class="resize-bar" 
        ref="resizeBar"
        :style="{
          'width': `${defaultLength}px`,
          'max-width': `${maxLength}px`,
          'min-Width': `${minLength}px`
        }"
        @resize="resizeHandle"
      >
      </div>
      <div class="resize-line"></div>
      <div class="resize-save" >
        <div class="content-warp" v-if="finish">
          <slot name="odd"></slot>
        </div>
      </div>                                            
    </div> 
    <div class="right-warp"   v-if="type === 'horizontal'">
      <div class="content-warp" v-if="finish">
        <slot name="even"></slot>
      </div>
    </div>

    <!-------------------- 纵向 ---------------------->

    <div class="top-warp" v-if="type === 'vertical'">
      <div class="resize-bar" style="height: 250px; max-height: 450px"
        :style="{
        'height': `${defaultLength}px`,
        'max-height': `${maxLength}px`,
        'min-height': `${minLength}px`
      }"
      ></div>
      <div class="resize-line"></div>
      <div class="resize-save"  >
        <div class="content-warp" v-if="finish">
           <slot name="odd"></slot>
        </div>
      </div>                                            
    </div> 
    <div class="bottom-warp"  v-if="type === 'vertical'">
      <div class="content-warp" v-if="finish">
         <slot name="even"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 滑动布局组件
   * @module $ui/components/my-slide-layout
   */
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
 /**
   * 插槽
   * @member slots
   * @property {string} odd 左边/上边插槽
   * @property {string} even 右边/下边插槽
  */  
export default {
  name: 'MySlideLayout',
  /**
   * 属性参数
   * @member props
   * @property {string} [type] horizontal(默认)/vertical
   * @property {number} [edageWidth] 左侧(横向)/上方(纵向) 的默认宽/高度占比（百分比，5-95） 
   * @property {array} [range] 左侧(横向)/上方(纵向) 的宽/高度占比范围（百分比，5-95）
  */ 
  props: {
    type: {
      type: String,
      default: 'horizontal',
      validator: function(p) {
        return p === 'horizontal' || p === 'vertical'
      }
    },
    edageWidth: {
      type: Number,
      default: 50,
      validator: function(p) {
        return p >= 5 && p <= 95
      }
    },
    range: {
      type: Array,
      default: () => { return [5, 95] },
      validator: function(p) {
        return p.length === 2 && p[1] > p[0] && p[1] <= 95 && p[0] >= 5
      }
    }
  },
  data() {
    return {
      defaultLength: 0,
      minLength: 0,
      maxLength: 0,
      finish: false
    }
  },
  computed: {
  },
  watch: {
    type() {
      this.setLayout()
    },
    edageWidth() {
      this.setLayout() 
    },
    range() {
      this.setLayout()
    }
  },
  methods: {
    setLayout() {
      const fullLength = this.type === 'horizontal' ? this.$refs.body.offsetWidth : this.$refs.body.offsetHeight
      const defaultPercent = this.edageWidth / 100 
      const length = Math.round(fullLength * defaultPercent)
      const maxPercent = this.range[1] / 100
      const minPercent = this.range[0] / 100
      const maxLength = Math.round(fullLength * maxPercent)
      const minLength = Math.round(fullLength * minPercent)
     
      this.defaultLength = length
      this.maxLength = maxLength
      this.minLength = minLength
      this.finish = true
      /**
       * 布局宽高定义好后触发
       * @event on-ready
       */
      this.$emit('on-ready')
    },
    resizeHandle() {
      /**
       * 布局拖动时触发
       * @event on-resize
       * @param {HtmlDom} 定义宽高变化的html节点
       */
      this.$emit('on-resize', this.$refs.resizeBar)
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.setLayout()
    }, 200)
    addResizeListener(this.$el, this.setLayout)
    addResizeListener(this.$refs.resizeBar, this.resizeHandle)
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.setLayout)
    removeResizeListener(this.$refs.resizeBar, this.resizeHandle)
  }
}
</script>