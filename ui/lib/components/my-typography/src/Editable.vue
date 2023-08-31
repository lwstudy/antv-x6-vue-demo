<template>
  <span class="my-typography__editor">
    <ElInput v-model="currentValue"
           ref="input"
           :rows="1"
           autosize
           type="textarea"
           @keydown.native.enter.prevent.stop="handleEnter"
           @blur="handleEnter">
    </ElInput>
    <my-icon class="my-typography__enter" name="icon-enter" svg></my-icon>
  </span>
</template>

<script>
  import {MyIcon} from '$ui'
  import {Input} from 'element-ui'
  import '$ui/icons/enter'

  export default {
    components: {
      MyIcon,
      ElInput: Input
    },
    props: {
      value: String
    },
    data() {
      return {
        currentValue: this.value || ''
      }
    },
    watch: {
      value(val) {
        this.currentValue = val || ''
      },
      currentValue(val) {
        this.$emit('change', val)
      }
    },
    methods: {
      handleEnter() {
        this.$emit('save', this.currentValue)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
</script>
