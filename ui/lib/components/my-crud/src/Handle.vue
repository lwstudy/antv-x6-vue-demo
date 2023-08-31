<template>
  <el-button v-if="theme==='button'"
             :type="type"
             :icon="icon"
             :size="size"
             :disabled="disabled"
             @click="handleClick">{{text}}
  </el-button>
  <el-button v-else-if="theme==='text'"
             type="text" :icon="icon"
             :size="size"
             :disabled="disabled"
             @click="handleClick">{{text}}
  </el-button>
  <Tooltip v-else :content="text" placement="top" :disabled="disabled">
    <MyIcon v-bind="iconOptions"
            :class="{'is-disabled':disabled}"
            @click="handleClick"></MyIcon>
  </Tooltip>
</template>

<script>
  import {MyIcon} from '$ui'
  import {Tooltip} from 'element-ui'


  export default {
    components: {
      MyIcon,
      Tooltip
    },
    props: {
      row: Object,
      theme: {
        type: String,
        default: 'text',
        validator(val) {
          return ['button', 'text', 'icon'].includes(val)
        }
      },
      type: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'primary', 'warning', 'danger', 'info', 'success'].includes(val)
        }
      },
      text: String,
      icon: [String, Object],
      size: String,
      // 权限编码
      access: [String, Function]
    },
    computed: {
      disabled() {
        if (this.access) {
          if (typeof this.access === 'function') {
            return !this.access(this.row)
          } else {
            return this.$access && !this.$access.has(this.access)
          }
        }
        return false
      },
      iconOptions() {
        const opts = typeof this.icon === 'string'
          ? {
            name: this.icon
          }
          : this.icon
        return {
          ...opts,
          theme: this.type,
          disabled: this.disabled
        }
      }
    },
    methods: {
      handleClick() {
        if (this.disabled) return
        this.$emit('click')
      }
    }
  }
</script>

