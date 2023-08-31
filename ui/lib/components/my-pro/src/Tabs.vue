<template>
  <div class="my-pro-tabs">
    <Tabs type="card" :value="active" @tab-click="handleTabClick" @tab-remove="handleTabRemove">
      <TabPane v-for="(item, index) in data" :key="item.value" :name="item.value" :closable="item.closable">
        <template v-slot:label>
          <MyIcon v-if="item.icon" v-bind="getIconOptions(item.icon)" @click.stop="handleTabIconClick(item, index)"></MyIcon>
          {{item.label}}
        </template>
      </TabPane> 
    </Tabs>
    <div v-if="data && data.length" class="my-pro-tabs__action">
      <Dropdown @command="handleCommand" size="small">
        <i class="el-icon-arrow-down"></i>
        <DropdownMenu slot="dropdown">
          <DropdownItem command="left"><i class="el-icon-back"></i>关闭左侧</DropdownItem>
          <DropdownItem command="right"><i class="el-icon-right"></i>关闭右侧</DropdownItem>
          <DropdownItem command="other"><i class="el-icon-close"></i>关闭其他</DropdownItem>
          <DropdownItem command="all" divided><i class="el-icon-circle-close"></i>关闭全部</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
  </div>

</template>

<script>
  import {Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
  import {MyIcon} from '$ui'
  export default {
    components: {
      Tabs,
      TabPane,
      MyIcon,
      Dropdown,
      DropdownMenu,
      DropdownItem
    },
    props: {
      // [{label, value, icon, closable}]
      data: {
        type: Array,
        default() {
          return []
        }
      },
      active: String
    },
    methods: {
      getIconOptions(icon) {
        if (!icon) return null
        return typeof icon === 'string'
          ? {name: icon}
          : {...icon}
      },
      handleCommand(command) {
        const idx = this.data.findIndex(n => this.active === n.value)
        this.$emit('command', command, this.data[idx], idx)
      },
      handleTabClick({index}) {
        const idx = Number.parseInt(index)
        const tab = this.data[idx]
        this.$emit('select', tab, idx)
      },
      handleTabRemove(name) {
        const idx = this.data.findIndex(n => name === n.value)
        this.$emit('remove', this.data[idx], idx)
      },
      handleTabIconClick(tab, index) {
        this.$emit('icon-click', tab, index)
      }
    }
  }
</script>
