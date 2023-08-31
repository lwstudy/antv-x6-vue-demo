<template>
  <div class="my-resize" :class="classes" :style="styles">
    <slot></slot>
    <div v-if="helper && resizing" class="my-resize__helper" :style="helperStyle"></div>
    <my-drag v-if="!disabled && (!axis || axis==='h')"
             ref="ctrlH"
             class="my-resize__ctrl-h"
             axis="h"
             :origin="getOrigin"
             @start="handleStart"
             @drag="handleDragH"
             @stop="handleStop">

    </my-drag>
    <my-drag v-if="!disabled && (!axis || axis==='v')"
             ref="ctrlV"
             class="my-resize__ctrl-v"
             axis="v"
             :origin="getOrigin"
             @start="handleStart"
             @drag="handleDragV"
             @stop="handleStop">
    </my-drag>
    <my-drag v-if="!disabled && !axis"
             ref="ctrl"
             class="my-resize__ctrl"
             :origin="getOrigin"
             @start="handleStart"
             @drag="handleDrag"
             @stop="handleStop">
      <slot name="icon"></slot>
    </my-drag>
  </div>
</template>

<script>

  /**
   * MyResize 拖拽更新尺寸组件, 与drag同时使用时，drag要在外层
   * @module $ui/components/my-resize
   *
   */

  import {MyDrag} from '$ui'
  import {setStyle} from 'element-ui/lib/utils/dom'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义主体内容
   * @property {string} icon 定义右下角的图标
   */
  export default {
    name: 'MyResize',
    components: {
      MyDrag
    },
    /**
     * 属性参数
     * @member props
     * @property {String} [axis] 限制拖拽方向可选: v 垂直、h 水平，默认不限制
     * @property {Boolean} [disabled] 是否禁用
     * @property {Boolean} [animate] 是否要动画, 建议在helper为true时开启
     * @property {Boolean} [helper] 显示临时辅助层
     * @property {Number} [minWidth=0] 最小宽度
     * @property {Number} [minHeight=0] 最小高度
     * @property {Number} [maxWidth=Infinity] 最大宽度
     * @property {Number} [maxHeight=Infinity] 最大高度
     */
    props: {
      // 限制拖拽方向可选: v 垂直、h 水平，默认不限制
      axis: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'v', 'h'].includes(val)
        }
      },
      // 是否禁用
      disabled: Boolean,

      // 是否要动画, 建议在helper为true时开启
      animate: Boolean,

      // 显示临时辅助层
      helper: Boolean,

      minWidth: {
        type: Number,
        default: 0
      },
      minHeight: {
        type: Number,
        default: 0
      },
      maxWidth: {
        type: Number,
        default: Infinity
      },
      maxHeight: {
        type: Number,
        default: Infinity
      }
    },
    data() {
      return {
        width: null,
        height: null,
        helperWidth: null,
        helperHeight: null,
        resizing: false
      }
    },
    computed: {
      classes() {
        return {
          'is-disabled': this.disabled,
          'is-resizing': this.resizing,
          'is-animate': this.animate,
          [`is-axis-${this.axis}`]: !!this.axis,
          'is-axis-both': !this.axis
        }
      },
      helperStyle() {
        return {
          width: `${this.helperWidth}px`,
          height: `${this.helperHeight}px`
        }
      },
      styles() {
        return {
          width: this.width ? `${this.width}px` : null,
          height: this.height ? `${this.height}px` : null
        }
      }
    },
    methods: {
      getOrigin() {
        return this.$el
      },
      lockSize(w, h) {
        if (w !== null) {
          if (w < this.minWidth) {
            this.helperWidth = this.minWidth
          }
          if (w > this.maxWidth) {
            this.helperWidth = this.maxWidth
          }
        }
        if (h !== null) {
          if (h < this.minHeight) {
            this.helperHeight = this.minHeight
          }
          if (h > this.maxHeight) {
            this.helperHeight = this.maxHeight
          }
        }
        if (!this.helper) {
          this.applySize()
        }

      },
      applySize() {
        this.width = this.helperWidth
        this.height = this.helperHeight
      },
      clearCtrlStyle() {
        if (this.$refs.ctrlH) {
          setStyle(this.$refs.ctrlH.$el, 'left', '')
        }
        if (this.$refs.ctrlV) {
          setStyle(this.$refs.ctrlV.$el, 'top', '')
        }
        if (this.$refs.ctrl) {
          setStyle(this.$refs.ctrl.$el, {
            left: '',
            top: ''
          })
        }
      },
      handleStart(vm) {
        this.resizing = true
        /**
         * 开始拖拽时触发
         * @event start
         * @param {VueComponent} resize MyResize实例
         */
        this.$emit('start', this)

      },
      handleDrag(vm) {
        this.helperWidth = vm.x + 20
        this.helperHeight = vm.y + 20
        this.lockSize(this.helperWidth, this.helperHeight)
        /**
         * 正在改变尺寸时触发
         * @event resize
         * @param {VueComponent} resize MyResize实例
         */
        this.$emit('resize', this, vm)
      },
      handleDragH(vm) {
        this.helperWidth = vm.x + 10
        this.lockSize(this.helperWidth, this.helperHeight)
        this.$emit('resize', this, vm)
      },
      handleDragV(vm) {
        this.helperHeight = vm.y + 10
        this.lockSize(this.helperWidth, this.helperHeight)
        this.$emit('resize', this, vm)
      },
      handleStop(vm) {
        this.resizing = false
        this.applySize()
        this.clearCtrlStyle()
        /**
         * 停止改变尺寸时触发
         * @event stop
         * @param {VueComponent} resize MyResize实例
         */
        this.$emit('stop', this)
      }
    }
  }
</script>

