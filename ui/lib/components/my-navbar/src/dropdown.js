import {Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
export default {
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem
  },
  props: {
    // 下拉菜单配置
    dropdownOptions: Object,
    // 下拉菜单数据 {text, icon, command, disabled, divided}
    dropdownItems: Array
  },
  methods: {
    renderDropdownItems() {
      if (!this.dropdownItems) return null
      return (
        <DropdownMenu slot="dropdown">
          {
            this.dropdownItems.map(item => {
              item.command = item.command || item.text
              return (<DropdownItem {...{props: item}}>{item.text}</DropdownItem>)
            })
          }
        </DropdownMenu>
      )
    },
    wrapDropdown(vnode) {
      if (!this.dropdownItems) return vnode
      return (
        <Dropdown {...{props: this.dropdownOptions}} onCommand={this.handleCommand}>
          {
            [
              vnode,
              this.renderDropdownItems()
            ]
          }
        </Dropdown>
      )
    },
    handleCommand(command) {
      this.$emit('command', command)
    }
  }
}
