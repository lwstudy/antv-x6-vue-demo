export default {
  methods: {
    getBadgeOptions(badge) {
      return typeof badge === 'number'
        ? {value: badge}
        : {...badge}
    },
    getIcon(icon) {
      if (!icon) return null
      const opt = typeof icon === 'string'
        ? {name: icon}
        : {...icon}
      return <MyIcon {...{props: opt}}></MyIcon>
    },
    badgeRender(badge) {
      if (!badge) return null
      const opt = this.getBadgeOptions(badge)
      return (
        <Badge {...{props: opt}}></Badge>
      )
    },
    iconRender({icon, badge}, isRoot) {
      if (!icon) return null

      if (!isRoot || !badge || !this.collapsed) return this.getIcon(icon)
      if (this.collapsed) {
        const opt = this.getBadgeOptions(badge)
        opt.isDot = true
        return (
          <Badge class="my-menu__collapsed-icon" {...{props: opt}}>{this.getIcon(icon)}</Badge>
        )
      }
      return null

    },
    titleRender(item, isRoot) {
      const {text, badge} = item
      return this.$scopedSlots.title
        ? [this.$scopedSlots.title({item})]
        : [this.iconRender(item, isRoot), <span slot="title">{text}{this.badgeRender(badge)}</span>]
    },
    itemRender(item, isRoot) {
      if (item.group) {
        return (
          <MenuItemGroup title={item.title}>
            {
              (item.children || []).map(n => {
                return this.itemRender(n, isRoot)
              })
            }
          </MenuItemGroup>
        )
      }

      if (item.children && item.children.length > 0) {
        return (
          <Submenu {...{props: this.submenuProps}} index={`submenu${item.index}`}>
            <template slot="title">
              {this.titleRender(item, isRoot)}
            </template>
            {
              (item.children || []).map(n => {
                return this.itemRender(n)
              })
            }
          </Submenu>
        )
      }
      return (
        <MenuItem key={`item${item.index}`} index={String(item.index)} disabled={item.disabled}>
          {this.titleRender(item, isRoot)}
        </MenuItem>
      )
    }
  }
}
