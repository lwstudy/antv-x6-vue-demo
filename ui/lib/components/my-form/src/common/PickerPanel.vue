<template>
  <MyLayout class="my-picker-panel"
            direction="horizontal"
            :west="{width:sidebarWidth}"
            :north="{height:headerHeight}">
    <template v-if="!!filter" v-slot:north>
      <ElInput v-model="query" size="small" placeholder="请输入筛选关键字" clearable></ElInput>
    </template>
    <template v-if="groupList" v-slot:west>
      <div class="my-picker-panel__sidebar" :style="sidebarStyle">
        <ul class="my-picker-panel__groups">
          <li v-for="(item, index) in groupList"
              @click="handleClickGroup(index)"
              :key="index"
              :class="{'is-active':activeGroupIndex===index}">
            {{item[keyMap.label]}}
            <Badge v-if="activeGroupIndex===index" :value="item.count" type="primary"></Badge>
          </li>
        </ul>
      </div>
    </template>
    <div :style="mainStyle">
      <slot>
        <MyList class="my-picker-panel__list"
                ref="list"
                :class="listClass"
                v-bind="listProps"
                mode="virtual"
                size="small"
                :data="filterData">
          <template v-slot="props">
            <span @click="handleItemClick(props.item, props.index)"
                  class="my-picker-panel__item">
              <slot name="list-item" v-bind="props" :keys="keyMap" :checked="isChecked(props.item)">
                    {{props.item[keyMap.label]}}
              </slot>

            </span>

          </template>
        </MyList>

      </slot>

    </div>
  </MyLayout>
</template>

<script>
  import {MyLayout, MyList} from '$ui'
  import {Input, Badge} from 'element-ui'
  import {isEqual} from '$ui/utils/util'

  export default {
    components: {
      MyLayout,
      ElInput: Input,
      Badge,
      MyList
    },
    props: {
      // 初始值
      value: {
        type: Array,
        default() {
          return []
        }
      },

      // 高度
      height: {
        type: Number,
        default: 300
      },
      // 分组[{label,value}]
      groups: Array,

      // 选项数据
      options: {
        type: Array,
        default() {
          return []
        }
      },
      // 字段映射
      keyMap: {
        type: Object,
        default() {
          return {
            id: 'id',
            parentId: 'parentId',
            label: 'label',
            disabled: 'disabled',
            value: 'value',
            group: 'group'
          }
        }
      },
      // 筛选函数
      filter: [Boolean, Function],

      // 侧边栏宽度
      sidebarWidth: {
        type: Number,
        default: 150
      },
      // 头部高度
      headerHeight: {
        type: Number,
        default: 55
      },
      // 列表样式名称
      listClass: String,
      // 多选
      multiple: Boolean,

      // MyList配置参数
      listProps: {
        type: Object,
        default() {
          return {
            itemHeight: 50
          }
        }
      },
      visible: Boolean
    },
    data() {
      return {
        query: '',
        activeGroupIndex: 0,
        checked: []
      }
    },
    computed: {
      mainStyle() {
        return {
          height: `${this.height}px`
        }
      },
      sidebarStyle() {
        return {
          height: `${this.height + this.headerHeight - 12}px`
        }
      },
      groupList() {
        if (this.groups) {
          const list = this.groups.map(g => {
            return {
              ...g,
              count: this.getCount(g)
            }
          })
          list.unshift({
            label: '已选',
            count: this.checkedList.length,
            checked: true
          })
          list.unshift({
            label: '全部',
            count: this.options.length,
            isAll: true
          })
          return list
        }
        return null
      },
      filterData() {
        const {group, value, label} = this.keyMap
        let options = this.options
        if (this.groupList) {
          const groupItem = this.groupList[this.activeGroupIndex]
          if (groupItem.checked) {
            options = this.checkedList
          } else if (!groupItem.isAll && !groupItem.checked) {
            options = options.filter(o => o[group] === groupItem[value])
          }

        }

        if (this.query && this.filter) {

          const filterMethod = typeof this.filter === 'function' ? this.filter : (n) => n[label].includes(this.query)
          options = options.filter(filterMethod)
        }
        return options
      },
      checkedList() {
        const {value} = this.keyMap
        return this.options.filter(o => {
          return this.checked.includes(o[value])
        })
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (!isEqual(val, this.checked)) {
            this.checked = val.slice(0)
          }
        }
      },
      checked(val) {
        this.$emit('change', val)
        this.$emit('input', val)
      },
      visible() {
        this.$nextTick(() => {
          if (this.$refs.list) {
            this.$refs.list.reset()
          }
        })
      }
    },
    methods: {
      getCount(group) {
        return this.options.filter(n => n.group === group.value).length
      },
      handleClickGroup(index) {
        this.activeGroupIndex = index
      },
      handleItemClick(item, index) {
        const {value} = this.keyMap
        if (this.multiple) {
          if (this.isChecked(item)) {
            this.checked = this.checked.filter(n => item[value] !== n)
          } else {
            this.checked.push(item[value])
          }
        } else {
          this.checked = [item[value]]
        }
        this.$emit('click-item', item, index)
      },
      isChecked(item) {
        return this.checked.includes(item[this.keyMap.value])
      }
    }
  }
</script>

