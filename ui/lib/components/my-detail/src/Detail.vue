<script>
  /**
   *  描述列表组件
   *  @module $ui/components/my-detail
   */

  import Col from './Col'
  import responsive, {responsiveArray} from '$ui/utils/responsive'

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
   * @property {string} default 默认插槽，定义子项
   * @property {string} title 标题插槽，定义标题内容
   */
  export default {
    name: 'MyDetail',
    components: {
      Col
    },
    provide() {
      return {
        detail: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 标题文本，也可以用插槽定义
     * @property {number|Object} [column=3] 一行的 Items 数量, 支持响应对象，如：{xxl:4,xl:3,lg:2,md:2,sm:2,xs:1}
     * @property {string} [size] 设置列表的大小。可以设置为 middle 、small
     * @property {string} [layout=horizontal]  描述布局
     * @property {boolean} [colon] 是否显示冒号， border 为false是有效
     * @property {string} [labelAlign=left] 标签对齐方式
     * @property {string} [contentAlign=left] 内容对齐方式
     */
    props: {
      // 描述列表的标题，显示在最顶部
      title: String,
      // 是否展示边框
      border: Boolean,
      // 一行的 Items 数量
      column: {
        type: [Number, Object],
        default: 3
      },
      // 设置列表的大小。可以设置为 middle 、small
      size: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'middle', 'small'].includes(val)
        }
      },
      // 描述布局
      layout: {
        type: String,
        default: 'horizontal',
        validator(val) {
          return ['horizontal', 'vertical'].includes(val)
        }
      },
      // 配置 Item 的 colon 的默认值
      colon: {
        type: Boolean,
        default: true
      },
      labelAlign: {
        type: String,
        default: 'left',
        validator(val) {
          return ['left', 'center', 'right'].includes(val)
        }
      },
      contentAlign: {
        type: String,
        default: 'left',
        validator(val) {
          return ['left', 'center', 'right'].includes(val)
        }
      }
    },
    data() {
      return {
        items: [],
        screens: {}
      }
    },
    computed: {
      classes() {
        return ['my-detail', `is-${this.size || 'default'}`, `is-${this.layout}`, {
          'is-border': this.border
        }]
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

        return 3
      },
      generateChildrenRows(children = [], column) {
        const rows = []
        let columns = null, leftSpans = 0

        children.forEach((vm, index) => {
          if (!columns) {
            leftSpans = column;
            columns = [];
            rows.push(columns);
          }

          // Always set last span to align the end of Descriptions
          const lastItem = index === children.length - 1;
          if (lastItem) {
            vm.currentSpan = leftSpans
          }

          // Calculate left fill span
          const {currentSpan = 1} = vm;
          columns.push(vm);
          leftSpans -= currentSpan;

          if (leftSpans <= 0) {
            columns = null
          }

        })
        return rows
      },
      renderRow(children, index) {
        const cloneChildren = [], cloneContentChildren = []
        children.forEach((vm, idx) => {
          cloneChildren.push(this.renderCol(vm, 'label', idx))
          if (this.layout === 'vertical') {
            cloneContentChildren.push(this.renderCol(vm, 'content', idx));
          } else if (this.border) {
            cloneChildren.push(this.renderCol(vm, 'content', idx));
          }
        })

        if (this.layout === 'vertical') {
          return ([
            <tr class="my-detail__row" key={`label-${index}`}>
              {cloneChildren}
            </tr>,
            <tr class="my-detail__row" key={`content-${index}`}>
              {cloneContentChildren}
            </tr>
          ])
        }
        return (
          <tr class="my-detail__row" key={index}>
            {cloneChildren}
          </tr>
        )
      },
      renderCol(colItem, type, index) {
        return (
          <Col child={colItem}
               border={this.border}
               colon={this.colon}
               type={type}
               key={colItem.key || index}
               layout={this.layout}></Col>
        )
      }
    },
    render() {
      const childrenArray = this.generateChildrenRows(this.items, this.getColumn())
      const title = this.$slots.title || this.title
      const titleVNode = title ? <div class="my-detail__title">{title}</div> : null
      return (
        <div class={this.classes}>
          {titleVNode}
          <div class="my-detail__view">
            <table>
              <tbody>
              {
                childrenArray.map((child, index) => {
                  return this.renderRow(child, index)
                })
              }
              </tbody>
            </table>
          </div>
          {this.$slots.default}
        </div>
      )
    },
    mounted() {
      this.token = responsive.on(screens => {
        if (typeof this.column !== 'object') {
          return
        }
        this.screens = screens
      })
    },
    beforeDestroy() {
      responsive.off(this.token)
    }
  }
</script>
