<script>
  /**
   * 布局组件，围绕着主体内容4个方向排版
   * @module $ui/components/my-layout
   */
  import {Container, Header, Main, Footer, Aside} from 'element-ui'

  const Components = {
    north: Header,
    default: Main,
    south: Footer,
    east: Aside,
    west: Aside
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义主体内容
   * @property {string} north 定义主体内容上面区域
   * @property {string} south 定义主体内容下面区域
   * @property {string} west 定义主体内容左边区域
   * @property {string} east 定义主体内容右边区域
   */
  export default {
    name: 'MyLayout',
    components: {
      Container,
      Header,
      Main,
      Footer,
      Aside
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [fit] 适配父容器
     * @property {boolean} [border] 显示边框
     * @property {boolean} [split] 各区块之间显示分隔
     * @property {string} [direction] 排列方向，默认自动判断，也可以指定，可选值：'vertical', 'horizontal'
     * @property {Object} [north] 定义区块参数
     * @property {string|number} [north.height=60] 高度
     * @property {Object} [south] 定义区块参数
     * @property {string|number} [south.height=60] 高度
     * @property {Object} [west] 定义区块参数
     * @property {string|number} [west.width=300] 宽度
     * @property {Object} [east] 定义区块参数
     * @property {string|number} [east.width=300] 宽度
     */
    props: {
      // 适配父容器
      fit: Boolean,
      // 显示边框
      border: Boolean,

      // 分隔
      split: Boolean,

      // 排列方向
      direction: {
        type: String,
        validator(val) {
          return ['vertical', 'horizontal'].includes(val)
        }
      },
      // {size(width/height)}
      north: Object,
      south: Object,
      east: Object,
      west: Object
    },
    data() {
      return {}
    },
    computed: {
      classes() {
        return {
          'my-layout': true,
          'is-fit': this.fit,
          'is-border': this.border,
          'is-split': this.split,
          [`is-${this.direction}`]: !!this.direction
        }
      }
    },
    methods: {
      getDirection() {
        if (this.direction) return this.direction

        const {north, south, west, east} = this.$slots
        const isVertical = !west && !east
        const isHorizontal = !north && !south
        return (isVertical || (!isVertical && !isHorizontal)) ? 'vertical' : 'horizontal'
      },
      getRegionOptions(type) {
        return {
          ...(this[type] || {})
        }
      },
      regionRender(type) {
        if (!this.$slots[type]) return

        const options = this.getRegionOptions(type)
        const attrs = {
          north: 'height',
          south: 'height',
          west: 'width',
          east: 'width'
        }
        const defaultValues = {
          north: 60,
          south: 60,
          west: 256,
          east: 256
        }
        const name = attrs[type]
        const size = Number.parseInt(options[name] === undefined ? defaultValues[type] : options[name])

        return this.$createElement(Components[type], {
          class: [
            'my-layout__region',
            `my-layout__${type}`,
            {
              'is-split': this.split,
              'is-border': this.border
            }
          ],
          style: {
            [name]: typeof size === 'number' ? `${size}px` : size
          }
        }, (this.fit && size) ? [<div class="my-layout__fit">{this.$slots[type]}</div>] : this.$slots[type])
      }
    },
    render() {
      const {north, south, west, east} = this.$slots
      const direction = this.getDirection()

      const wrapHorizontal = () => {
        if (west || east) {
          return (
            <Container class="my-layout__wrapper" direction="horizontal">
              {
                [
                  this.regionRender('west'),
                  this.regionRender('default'),
                  this.regionRender('east')
                ]
              }
            </Container>
          )
        } else {
          return this.regionRender('default')
        }
      }

      const wrapVertical = () => {
        if (north || south) {
          return (
            <Container class="my-layout__wrapper" direction="vertical">
              {
                [
                  this.regionRender('north'),
                  this.regionRender('default'),
                  this.regionRender('south')
                ]
              }
            </Container>
          )
        } else {
          return this.regionRender('default')
        }
      }

      return (
        <Container direction={direction} class={this.classes}>

          {
            direction === 'vertical'
              ? [
                this.regionRender('north'),
                wrapHorizontal(),
                this.regionRender('south')
              ]
              : [
                this.regionRender('west'),
                wrapVertical(),
                this.regionRender('east')
              ]
          }

        </Container>
      )
    }
  }
</script>

