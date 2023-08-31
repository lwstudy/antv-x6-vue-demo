<template>
<div :class="`my-flip my-flip__${size}`" :style="{fontSize:fontSize}">
    <div :class="{'my-flip__set':true,'my-flip-previous':previous}">
      <div class="my-flip__top" :style="innerStyles">
        <span class="my-flip__wrap">{{oldNumber}}</span>
      </div>
      <div class="my-flip__shadow-top"></div>
      <div class="my-flip__bottom" :style="innerStyles">
        <span class="my-flip__wrap" :style="bottomWrapStyle">{{oldNumber}}</span>
      </div>
      <div class="my-flip__shadow-bottom"></div>
    </div>

    <div :class="{'my-flip__set':true,'my-flip-active':active}">
      <div class="my-flip__top" :style="innerStyles">
        <span class="my-flip__wrap">{{newNumber}}</span>
      </div>
      <div class="my-flip__shadow-top"></div>
      <div class="my-flip__bottom" :style="innerStyles">
        <span class="my-flip__wrap" :style="bottomWrapStyle">{{newNumber}}</span>
      </div>
      <div class="my-flip__shadow-bottom"></div>
    </div>
  </div>
</template>

<script>
/**
 * my-flip 数字反转
 * @module $ui/components/my-flip
 */
export default {
  name: 'MyFlip',
  /**
   * 属性参数
   * @property {String|Number} [number] 需显示的数字，只能为0-9的正整数
   * @property {String} [color] 卡片的背景色
   * @property {String} [fontSize] 卡片字体的大小
   * @property {String} [size] 卡片的宽度
   */
  props: {
    number: {
      type: [String, Number],
      required: true,
      validator: function (val) {
        return /^[0-9]$/.test(Number.parseInt(val))
      }
    },
    color: {
      type: String,
      default: '#333'
    },
    fontSize: {
      type: String
    },
    size: {
      type: String,
      validator(val) {
        return ['mini', 'small', 'medium'].includes(val)
      },
      default: 'medium'
    }
  },
  data() {
    return {
      previous: true,
      active: true,
      timer: null,
      newNumber: null,
      oldNumber: null,
      bottomWrapStyle: null
    }
  },
  computed: {
    /**
     * 改变整个数字翻页的背景颜色
     */
    innerStyles() {
      return {
        backgroundColor: this.color
      }
    }
  },
  watch: {
    number: {
      handler(newNumber, oldNumber) {
        this.previous = false
        this.active = false
        this.timer = setTimeout(() => {
          this.newNumber = newNumber
          this.oldNumber = oldNumber
          this.previous = true
          this.active = true
        }, 10)
      },
      immediate: true
    },
    size(val) {
      // 修改因改变整个数字翻页的宽高引起的下层数字的显示问题
      this.bottomWrapStyle = {
        marginTop: '-' + this.$el.clientHeight / 2 + 'px'
      }
    } 
  },
  methods: {},
  created() { 
  },
  mounted() {
    this.bottomWrapStyle = {marginTop: '-' + this.$el.clientHeight / 2 + 'px'}
  },
  beforeDestroy() {
    window.clearTimeout(this.timer)
  }
}
</script>