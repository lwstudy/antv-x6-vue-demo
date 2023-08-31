<template>
  <div class="my-child-app">
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>
<script>
  import Scale from '$ui/utils/scale'

  export default {
    mixins: [Scale],
    computed: {
      keepAlive() {
        const matched = this.$route.matched[0]
        if (!matched) return false
        return !!matched.meta.keepAlive
      }
    }
  }
</script>
