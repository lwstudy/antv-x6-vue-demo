<script>
  /**
   *  图标工具按钮, 只能用在 my-navbar 的 actions 插槽
   *  @module $ui/components/my-navbar-IconAction
   */
  import {MyIcon} from '$ui'
  import {Tooltip, Badge} from 'element-ui'
  import dropdown from './dropdown'

  /**
   * 点击图标触发
   * @event click
   */

  /**
   * 点击下来菜单项目触发
   * @event command
   * @param {string} command 菜单项名称
   */

  export default {
    mixins: [dropdown],
    components: {
      MyIcon,
      Tooltip,
      Badge
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [icon] 图标样式名称
     * @property {boolean} [svg] 是否svg
     * @property {string|object} [tooltip] 配置tooltip, 参考 el-tooltip 组件
     * @property {number|object} [badge] 配置标记, 参考 el-badge 组件
     * @property {object} [dropdownOptions] 下拉菜单配置, 参考 el-dropdown 组件
     * @property {array} [dropdownItems] 下拉菜单数据 {text, icon, command, disabled, divided}
     */
    props: {
      // 图标样式名称
      icon: String,
      // 是否svg
      svg: Boolean,
      // 配置tooltip
      tooltip: [String, Object],
      // 配置标记
      badge: [Number, Object]
    },
    computed: {
      tooltipOptions() {
        if (!this.tooltip) return null
        return typeof this.tooltip === 'string'
          ? {
            content: this.tooltip
          }
          : {
            ...this.tooltip
          }
      },
      badgeOptions() {
        if (!this.badge) return null
        return typeof this.badge === 'number'
          ? {
            value: this.badge
          }
          : {
            ...this.badge
          }
      }
    },
    methods: {
      iconRender() {
        return (
          <my-icon class="my-navbar-icon-action__icon" name={this.icon} svg={this.svg}></my-icon>
        )
      },
      wrapTooltip(vnode) {
        if (!this.tooltip) return vnode
        return (
          <Tooltip {...{props: this.tooltipOptions}}>
            {vnode}
          </Tooltip>
        )
      },
      wrapBadge(vnode) {
        if (!this.badge) return vnode
        return (
          <Badge {...{props: this.badgeOptions}}>{vnode}</Badge>
        )
      }
    },
    render() {
      let vnode = this.iconRender()
      vnode = this.wrapBadge(vnode)
      vnode = this.wrapTooltip(vnode)
      vnode = this.wrapDropdown(vnode)
      return (
        <span class="my-navbar-icon-action" {...{on: this.$listeners}}>{vnode}</span>
      )
    }
  }
</script>
