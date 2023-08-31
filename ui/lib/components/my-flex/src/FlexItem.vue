<template>
  <div :class="classes" :style="styles" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div :class="innerClasses">
      <div v-if="middle"
           :class="helperClasses">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>

  </div>
</template>

<script>

  /**
   * FlexItem Flex布局子组件
   * @module $ui/components/my-flex-item
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义内容
   */
  export default {
    name: 'MyFlexItem',
    inject: {
      flex: {
        default: null
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {number} [order] 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
     * @property {number} [grow]  属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
     * @property {number} [shrink] 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
     * @property {string} [basis] 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
     * @property {string} [align=auto] 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch, 可选值：'auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'
     * @property {boolean} [center] 文本水平居中
     * @property {boolean} [middle] 内容垂直居中,
     * @property {boolean|string} [shadow] 显示阴影, 可选值：true, false, 'hover'
     */
    props: {
      // 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
      order: {
        type: Number
      },
      // 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
      // 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
      grow: Number,

      // 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
      // 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
      //
      // 负值对该属性无效。
      shrink: Number,
      // 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
      // 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
      basis: String,
      // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
      align: {
        type: String,
        default: 'auto',
        validator(val) {
          return ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'].includes(val)
        }
      },
      // 文本水平居中
      center: Boolean,
      // 内容垂直居中
      middle: Boolean,
      // 显示阴影
      shadow: {
        type: [Boolean, String],
        default: false,
        validator(val) {
          return [true, false, 'hover'].includes(val)
        }
      }
    },
    data() {
      return {
        hover: false
      }
    },
    computed: {
      classes() {
        return [
          'my-flex-item',
          `is-align-${this.align}`,
          {
            'is-shadow': this.shadow === true || (this.hover && this.shadow === 'hover')
          }
        ]
      },
      styles() {
        return {
          order: this.order,
          flexGrow: this.grow,
          flexShrink: this.shrink,
          flexBasis: this.basis,
          width: this.getWidth()
        }
      },
      helperClasses() {
        return {
          'my-flex-item__helper': true,
          'is-middle': this.middle
        }
      },
      innerClasses() {
        return {
          'my-flex-item__inner': true,
          'is-center': this.center
        }
      }
    },
    methods: {
      getWidth() {
        if (!this.flex) return
        const column = this.flex.getColumn()
        if (!column) return
        if (this.flex.direction.includes('row')) {
          return `${100 / column}%`
        }
        return null

      },
      handleMouseEnter() {
        if (this.shadow === 'hover') {
          this.hover = true
        }
      },
      handleMouseLeave() {
        this.hover = false
      }
    }
  }
</script>
