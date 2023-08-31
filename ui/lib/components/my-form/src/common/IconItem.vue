<template>
  <div class="my-picker-panel-icon-item" :class="{'is-checked':checked}">
    <MyIcon :name="name" :svg="svg"></MyIcon>
    <div class="icon-item__text">{{name}}</div>
  </div>
</template>

<script>
  import {MyIcon} from '$ui'

  export default {
    components: {
      MyIcon
    },
    props: {
      name: String,
      svg: Boolean,
      checked: Boolean
    }
  }
</script>
