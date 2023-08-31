<template>
  <my-float class="my-header" :class="classes">
    <div class="my-header__content">
      <i v-if="icon" class="my-header__icon" :class="icon"></i>
      <slot name="title">{{title}}</slot>
    </div>
    <my-float-item v-if="$slots.handle" class="my-header__handle" float="right">
      <slot name="handle"></slot>
    </my-float-item>
  </my-float>
</template>

<script>

  /**
   * 标题组件
   * @module $ui/components/my-header
   */

  import {MyFloat, MyFloatItem} from '$ui'

  /**
   * 插槽
   * @member slots
   * @property {string} [title] 定义标题内容
   * @property {string} [handle] 定义操作功能区内容
   */

  export default {
    name: 'MyHeader',
    components: {
      MyFloat,
      MyFloatItem
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 标题文本
     * @property {string} [icon] 标题文本左侧的图标
     * @property {boolean} [background] 是否显示背景
     * @property {string} [size] 显示尺寸，可选值：'', 'large', 'medium', 'small'
     * @property {string} [theme=default] 风格主题，可选值：'default','border-left','border-top','border-bottom','bg-icon','bg-down','bg-right'
     */
    props: {
      // 标题文字
      title: String,

      // 文字旁边的Icon 样式名
      icon: String,

      // 是否是否显示背景
      background: Boolean,


      // 显示尺寸
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['', 'large', 'medium', 'small'].includes(val)
        }
      },

      // 风格主题
      theme: {
        type: String,
        default: 'default',
        validator(val) {
          return [
            'default',
            'border-left',
            'border-top',
            'border-bottom',
            'bg-icon',
            'bg-down',
            'bg-right'
          ].includes(val)
        }
      }
    },
    computed: {
      classes() {
        return [
          {
            [`my-header--${this.theme}`]: !!this.theme,
            'is-background': this.background,
            'my-header--border-top': this.theme === 'bg-icon',
            [`is-${this.size}`]: !!this.size
          }
        ]
      }
    }
  }
</script>

