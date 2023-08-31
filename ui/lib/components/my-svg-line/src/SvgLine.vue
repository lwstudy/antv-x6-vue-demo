<template>
  <div class="my-svg-line">
    <svg :width="`${widthProxy}px`" :height="`${heightProxy}px`" 
    :viewBox="viewBox" > 
      <path :d="nodePaths" fill="transparent" :stroke="trackColor" :stroke-width="trackSize"/> 
      <circle :cx="0" :cy="0" :r="nodeSize" stroke="none" :fill="pointColor">  
        <animateMotion
            :path="nodePaths"   
                  begin="0s" :dur="`${during}s`" repeatCount="indefinite"
                  ></animateMotion>
      </circle>
    </svg>
  </div>
</template>
<script>
/**
 * SvgLine
 * @module $ui/components/my-svg-line
 */
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
// 参数（夹角）
const turnPointCalc = function (deg, w, h) {
  const calcDeg = (90 - (180 - deg)) * Math.PI / 180
  const leng = Math.tan(calcDeg) * h
  return leng
}

export default {
  name: 'MySvgLine',
  components: {},
  /**
   * @member props
   * @property {string} [type] svg线移动方向：'left-top', 'right-top', 'left-bottom', 'right-bottom'
   * @property {Number} [during] svg光板移动速度， 单位秒
   * @property {Number} [angle] svg线转角的角度，90 - 180 度
   * @property {String} [trackColor] svg线颜色 默认skyblue
   * @property {String} [pointColor] svg点颜色 默认skyblue
   * @property {String} [trackSize] svg线宽度
   * @property {String} [pointSize] svg点raidus
   */
  props: {
    type: {
      type: String,
      default: 'left-top', 
      validator(val) {
        return ['left-top', 'right-top', 'left-bottom', 'right-bottom'].includes(val)
      }
    },
    during: {
      type: Number,
      default: 3
    },
    angle: {
      type: Number,
      default: 90,
      validator(val) {
        return Math.max(90, Math.min(val, 180))
      }
    },
    trackColor: {
      type: String,
      default: 'skyblue'
    },
    pointColor: {
      type: String,
      default: 'skyblue'
    },
    trackSize: {
      type: Number,
      default: 1
    },
    nodeSize: {
      type: Number,
      default: 3,
      validator(val) {
        return Math.max(2, val)
      }
    }
  },
  data() {
    return {
      widthProxy: 100,
      heightProxy: 100
    }
  },
  computed: {
    halfNodeSize() {
      return Math.max(this.trackSize, this.nodeSize) / 2
    },
    viewBox() {
      return [0, -3, this.widthProxy - 2, this.heightProxy + 2]
    },
    nodeStart() {
      switch (this.type) {
        case 'left-top':
          return [0, 0] 
        case 'right-top':
          return [this.widthProxy, 0] 
        case 'left-bottom':
          return [0, this.heightProxy] 
        case 'right-bottom':
          return [this.widthProxy, this.heightProxy]     
        default:
          return [0, 0]
      }
    },
    linePoints() {
       
      if (this.type === 'left-top') {
        const d = turnPointCalc(this.angle, this.widthProxy, this.heightProxy)
        const turnPoint = [this.widthProxy - d, 0]
        return [[0, 0], turnPoint, [this.widthProxy, this.heightProxy]]
      } else if (this.type === 'right-top') {
        const d = turnPointCalc(this.angle, this.widthProxy, this.heightProxy)
        const turnPoint = [d, 0]
        return [[this.widthProxy, 0], turnPoint, [0, this.heightProxy]]
      } else if (this.type === 'left-bottom') {
        const d = turnPointCalc(this.angle, this.widthProxy, this.heightProxy)
        const turnPoint = [this.widthProxy - d, this.heightProxy - this.nodeSize - this.halfNodeSize]
         return [[0, this.heightProxy - this.nodeSize - this.halfNodeSize], turnPoint, [this.widthProxy, 0]]
      } else if (this.type === 'right-bottom') {
        const d = turnPointCalc(this.angle, this.widthProxy, this.heightProxy)
        const turnPoint = [d, this.heightProxy - this.nodeSize - this.halfNodeSize] 
         return [
           [this.widthProxy - this.nodeSize - this.halfNodeSize, this.heightProxy - this.nodeSize - this.halfNodeSize], 
           turnPoint, 
           [0, 0]
          ]
      } else {
         return [[0, 0], [this.widthProxy, this.heightProxy]]
      }
    },
    nodePaths() { 
      return this.linePoints.map((item, index) => {
        if (index === 0) {
          return `M${item[0]},${item[1]}`
        } else {
          return `L${item[0]},${item[1]}`
        }
      }).join(' ')
    }
  },
  methods: {
    turnPointCalc, 
    resize() {
      this.widthProxy = this.$el.offsetWidth
      this.heightProxy = this.$el.offsetHeight
    } 
  },
  mounted() {
    this.resize() 
    addResizeListener(this.$el, this.resize)
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.resize)
  }
}
</script>