<template>
  <div class="my-crud-handlebar" :class="classes">
    <Handle v-for="(item,index) in handles"
            v-bind="getOptions(item)"
            :key="index"
            :size="realSize"
            :theme="theme"
            :row="row"
            @click="handleClick(item)"></Handle>
  </div>
</template>

<script>
  import Handle from './Handle'

  const defaultHandles = {
    edit: {
      type: 'primary',
      text: '编辑',
      icon: 'el-icon-edit'
    },
    remove: {
      type: 'warning',
      text: '删除',
      icon: 'el-icon-delete'
    },
    view: {
      type: '',
      text: '详情',
      icon: 'el-icon-document'
    }
  }


  export default {
    components: {
      Handle
    },
    props: {
      row: Object,
      accessValidator: Function,
      theme: {
        type: String,
        default: 'text'
      },
      // [{text, icon, access, type}]
      handles: {
        type: Array,
        default() {
          return []
        }
      },
      size: String
    },
    computed: {
      realSize() {
        return this.size === 'small' ? 'mini' : 'small'
      },
      classes() {
        return {
          [`is-${this.theme}`]: !!this.theme,
          [`is-${this.realSize}`]: !!this.realSize
        }
      }
    },
    methods: {
      getOptions(item) {
        if (item.edit) {
          return {
            ...defaultHandles.edit,
            ...item
          }
        }
        if (item.remove) {
          return {
            ...defaultHandles.remove,
            ...item
          }
        }
        if (item.view) {
          return {
            ...defaultHandles.view,
            ...item
          }
        }
        return item
      },
      handleClick(item) {
        this.$emit('command', item)
      }
    }
  }
</script>

