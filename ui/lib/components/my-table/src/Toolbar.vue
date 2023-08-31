<template>
  <div class="my-table-toolbar" :class="classes">
    <div class="my-table-toolbar__title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="my-table-toolbar__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      size: String
    },
    computed: {
      classes() {
        return {
          [`my-table-toolbar--${this.size}`]: !!this.size
        }
      }
    }
  }
</script>

