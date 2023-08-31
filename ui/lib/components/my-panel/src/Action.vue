<template>
  <div class="my-panel-action" :class="classes">
    <MyIcon v-if="icon" v-bind="iconOptions"></MyIcon>
    <slot>{{text}}</slot>
  </div>
</template>

<script>
  import {MyIcon} from '$ui'

  export default {
    components: {
      MyIcon
    },
    props: {
      icon: [String, Object],
      text: String
    },
    computed: {
      iconOptions() {
        if (!this.icon) return null
        return typeof this.icon === 'string'
          ? {name: this.icon}
          : this.icon
      },
      classes() {
        return {
          'is-only-icon': this.icon && !this.text && !this.$slots.default
        }
      }
    }
  }
</script>

