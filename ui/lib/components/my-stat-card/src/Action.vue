<template>
  <div class="my-stat-card-action">
    <Tooltip v-bind="tooltipProps">
      <slot>
        <MyIcon v-bind="iconProps"></MyIcon>
      </slot>
    </Tooltip>
  </div>
</template>

<script>
  import {MyIcon} from '$ui'
  import {Tooltip} from 'element-ui'

  export default {
    name: 'Action',
    components: {
      MyIcon,
      Tooltip
    },
    props: {
      icon: [String, Object],
      tooltip: [String, Object]
    },
    computed: {
      iconProps() {
        return typeof this.icon === 'string'
          ? {name: this.icon}
          : this.icon
      },
      tooltipProps() {
        if (!this.tooltip) return {disabled: true}
        return typeof this.tooltip === 'string'
          ? {
            content: this.tooltip,
            placement: 'top'
          }
          : {
            placement: 'top',
            ...this.tooltip
          }
      }
    }
  }
</script>

<style scoped>

</style>
