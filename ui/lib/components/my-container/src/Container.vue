<template>
  <div class="my-container" :class="classes">
    <div class="my-container__inner" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MyContainer',
    props: {
      fit: Boolean,
      theme: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'primary', 'info', 'warning', 'danger', 'success'].includes(val)
        }
      },
      border: Boolean,
      shadow: Boolean,
      bodyStyle: Object
    },
    computed: {
      classes() {
        return {
          'is-fit': this.fit,
          'is-border': this.border,
          [`my-container--${this.theme}`]: !!this.theme,
          'is-shadow': this.shadow
        }
      }
    }

  }

</script>
