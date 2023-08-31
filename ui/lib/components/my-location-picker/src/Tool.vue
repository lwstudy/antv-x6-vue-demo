<template>
  <MyMapPlacement
    class="my-location-picker__tool"
    :class="classes"
    placement="right-top">
    <Tooltip content="标记地点" placement="top">
      <img :src="pin" alt="">
    </Tooltip>
  </MyMapPlacement>
</template>

<script>
  import {MyMapPlacement} from '$ui/map'
  import {Tooltip} from 'element-ui'

  export default {
    components: {
      MyMapPlacement,
      Tooltip
    },
    props: {
      pin: {
        type: String
      },
      active: Boolean
    },
    computed: {
      classes() {
        return {
          'is-active': this.active
        }
      }
    }
  }
</script>
