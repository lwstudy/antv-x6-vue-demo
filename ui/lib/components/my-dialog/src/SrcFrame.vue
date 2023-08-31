<template>
  <iframe ref="frame"
          @load="handleLoad"
          class="my-dialog-frame"
          :src="src"
          frameborder="0"></iframe>
</template>

<script>
  export default {
    props: {
      src: String
    },
    methods: {
      handleLoad() {
        this.$emit('load')
      }
    }
  }
</script>

