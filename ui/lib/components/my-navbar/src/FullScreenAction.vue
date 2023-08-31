<template>
  <IconAction :icon="icon" svg :tooltip="tooltipText" @click="toggle"></IconAction>
</template>

<script>
  /**
   *  全屏工具按钮, 只能用在 my-navbar 的 actions 插槽
   *  @module $ui/components/my-navbar-FullScreenAction
   */

  import IconAction from './IconAction'
  import {fullScreen, exitFullScreen, isFullScreen} from '$ui/utils/bom'
  import '$ui/icons/fullscreen'
  import '$ui/icons/fullscreen-exit'

  export default {
    components: {
      IconAction
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [tooltip] 是否显示tooltip
     */
    props: {
      tooltip: Boolean
    },
    data() {
      return {
        isFullScreen: isFullScreen()
      }
    },
    computed: {
      icon() {
        return this.isFullScreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'
      },
      tooltipText() {
        if (!this.tooltip) return null
        return this.isFullScreen ? '退出全屏' : '全屏'
      }
    },
    methods: {
      toggle() {
        if (this.isFullScreen) {
          exitFullScreen()
          this.isFullScreen = false
        } else {
          fullScreen()
          this.isFullScreen = true
        }
        /**
         * 全屏切换时触发
         * @event change
         * @param {boolean} isFullScreen 是否全屏
         */
        this.$emit('change', this.isFullScreen)
      }
    }
  }
</script>
