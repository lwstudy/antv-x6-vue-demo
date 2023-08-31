<template>
  <div class="my-micro-app">
    <div v-if="matchApp" :id="id" class="my-micro-app__content">
      <div class="my-micro-app__loading">
        <slot name="loading">
          <my-spin loading></my-spin>
        </slot>
      </div>
    </div>
    <slot v-else name="404">
      <my-result status="404"
                 title="404"
                 subtitle="抱歉！您访问的页面不存在。">
      </my-result>
    </slot>
  </div>
</template>

<script>
  /**
   * 微应用容器
   * @module $ui/components/my-micro-app
   */

  /**
   * 插槽
   * @member slots
   * @property {string} loading 定义加载中内容
   * @property {string} [404] 定义404内容
   */

  export default {
    name: 'MyMicroApp',
    inject: {
      // 主应用根组件实例
      masterApp: {
        default: null
      }
    },
    props: {
      id: {
        type: String,
        default: 'my-micro-app'
      }
    },
    computed: {
      // 当前匹配的子应用
      matchApp() {
        return this.masterApp && this.masterApp.matchApp
      }
    }
  }
</script>

