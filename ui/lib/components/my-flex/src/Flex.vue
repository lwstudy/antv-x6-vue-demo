<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * Flex布局
   * @module $ui/components/my-flex
   */
  import {isFlexSupported} from '$ui/utils/styleChecker'
  import responsive, {responsiveArray} from '$ui/utils/responsive'

  // 响应式默认配置
  const defaultColumnMap = {
    xxl: 3,
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 2
  };

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义子组件
   */
  export default {
    name: 'MyFlex',
    provide() {
      return {
        flex: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [inline] 是否内行元素
     * @property {string} [direction=row] 主轴的方向（即项目的排列方向）， 可选值：'row', 'row-reverse', 'column', 'column-reverse'
     * @property {string} [wrap=nowrap] 一条轴线排不下，如何换行, 可选值：'nowrap', 'wrap', 'wrap-reverse'
     * @property {string} [justify=flex-start] 项目在主轴上的对齐方式, 可选值：'flex-start', 'flex-end', 'center', 'space-between', 'space-around'
     * @property {string} [alignItems=stretch] 项目在交叉轴上如何对齐, 可选值：'flex-start', 'flex-end', 'center', 'baseline', 'stretch'
     * @property {string} [alignContent=stretch] 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用, 可选值：'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'
     * @property {boolean} [border] 显示边框
     * @property {boolean} [fit] 适配父容器
     * @property {number|object} [column] 适配列数,支持响应配置{xxl,xl,lg,md,sm,xs}， direction为 row 或 row-reverse 时有效.
     */
    props: {
      // 是否内行元素
      inline: Boolean,
      // flex-direction属性决定主轴的方向（即项目的排列方向）
      direction: {
        type: String,
        default: 'row',
        validator(val) {
          // row（默认值）：主轴为水平方向，起点在左端。
          // row-reverse：主轴为水平方向，起点在右端。
          // column：主轴为垂直方向，起点在上沿。
          // column-reverse：主轴为垂直方向，起点在下沿。
          return ['row', 'row-reverse', 'column', 'column-reverse'].includes(val)
        }
      },
      // 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
      wrap: {
        type: String,
        default: 'nowrap',
        validator(val) {
          // nowrap（默认）：不换行。
          // wrap：换行，第一行在上方。
          // wrap-reverse：换行，第一行在下方。
          return ['nowrap', 'wrap', 'wrap-reverse'].includes(val)
        }
      },
      // 属性定义了项目在主轴上的对齐方式。
      justify: {
        type: String,
        default: 'flex-start',
        validator(val) {
          // flex-start（默认值）：左对齐
          // flex-end：右对齐
          // center： 居中
          // space-between：两端对齐，项目之间的间隔都相等。
          // space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
          return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(val)
        }
      },
      // 属性定义项目在交叉轴上如何对齐。
      alignItems: {
        type: String,
        default: 'stretch',
        validator(val) {
          // flex-start：交叉轴的起点对齐。
          // flex-end：交叉轴的终点对齐。
          // center：交叉轴的中点对齐。
          // baseline: 项目的第一行文字的基线对齐。
          // stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
          return ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].includes(val)
        }
      },
      // 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
      alignContent: {
        type: String,
        default: 'stretch',
        validator(val) {
          // flex-start：与交叉轴的起点对齐。
          // flex-end：与交叉轴的终点对齐。
          // center：与交叉轴的中点对齐。
          // space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
          // space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
          // stretch（默认值）：轴线占满整个交叉轴。
          return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'].includes(val)
        }
      },
      // 显示边框
      border: {
        type: Boolean
      },
      // 适配父容器
      fit: Boolean,
      // 适配列数,支持响应配置， direction为 row 或 row-reverse 时有效
      column: [Number, Object]
    },
    data() {
      return {
        screens: {}
      }
    },
    computed: {
      classes() {
        return [
          'my-flex',
          `is-direction-${this.direction}`,
          `is-wrap-${this.wrap}`,
          `is-justify-${this.justify}`,
          `is-align-items-${this.alignItems}`,
          `is-align-content-${this.alignContent}`,
          {
            'is-inline': this.inline,
            'is-border': this.border,
            'is-fit': this.fit
          }
        ]
      }
    },
    methods: {
      getColumn() {
        if (typeof this.column === 'object') {
          for (let i = 0; i < responsiveArray.length; i++) {
            const breakpoint = responsiveArray[i]
            if (this.screens[breakpoint]) {
              return this.column[breakpoint] || defaultColumnMap[breakpoint]
            }
          }
        }
        if (typeof this.column === 'number') {
          return this.column
        }

        return null
      }
    },
    mounted() {
      this.token = responsive.on(screens => {
        if (typeof this.column !== 'object') {
          return
        }
        this.screens = screens
      })
    },
    created() {
      if (!isFlexSupported) {
        console.warn('浏览器不支持Flex布局')
      }
    },
    beforeDestroy() {
      responsive.off(this.token)
    }
  }
</script>

