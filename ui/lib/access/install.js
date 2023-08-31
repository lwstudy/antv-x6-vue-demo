export default function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // 注入 Access 实例到 $access
      if (this.$parent && this.$parent.$access) {
        this.$access = this.$parent.$access
      } else if (this.$options.access) {
        this.$access = this.$options.access
      }
    }
  })
}
