<template>
  <div id="my-master-app" class="my-master-app">
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>

<script>
  /**
   * 主应用根组件
   * @module $ui/components/my-master-app
   */
  import Scale from '$ui/utils/scale'

  export default {
    name: 'MyMasterApp',
    mixins: [Scale],
    provide() {
      return {
        // 提供给子组件调用
        masterApp: this
      }
    },
    data() {
      this.actions = null
      return {}
    },
    /**
     * 属性参数
     * @member props
     * @property {Object} [matchApp] 当前匹配的子应用
     * @property {Object} [state] 初始化全局状态
     * @property {Function} [initGlobalState] 初始化状态函数，由 qiankun 提供
     */
    props: {
      matchApp: {
        type: Object
      },
      state: {
        type: Object
      },
      initGlobalState: Function
    },
    computed: {
      /**
       * 当前路由是否缓存组件
       * @property {boolean} keepAlive
       */
      keepAlive() {
        const matched = this.$route.matched[0]
        if (!matched) return false
        return !!matched.meta.keepAlive
      }
    },
    methods: {
      /**
       * 初始化全局状态，组件实例化后自动调用，当需要重置状态可手动调用
       * @method initState
       * @param {object} state
       */
      initState(state) {
        this.offStateChange()
        if (this.initGlobalState) {
          this.actions = this.initGlobalState(state)
        }
      },
      /**
       * 更新全局状态
       * @method setState
       * @param {object} state
       */
      setState(state) {
        this.actions && this.actions.setGlobalState(state)
      },
      /**
       * 侦听状态改变事件
       * @method onStateChange
       * @param {function} callback 回调函数，参数: state,  prev
       * @param {boolean} [fireImmediately] 是否立即触发
       */
      onStateChange(callback, fireImmediately) {
        this.actions && this.actions.onGlobalStateChange(callback, fireImmediately)
      },
      /**
       * 销毁事件句柄
       * @method onStateChange
       */
      offStateChange() {
        this.actions && this.actions.offGlobalStateChange()
      }
    },
    created() {
      this.initState(this.state || {})
    },
    beforeDestroy() {
      this.offStateChange()
    }
  }
</script>

