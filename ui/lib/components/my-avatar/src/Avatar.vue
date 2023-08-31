<template>
  <Tooltip v-bind="tooltipProps" :disabled="!tooltipProps">
    <span :class="classes" :style="styles" v-on="$listeners">
      <my-icon :style="iconStyle" v-if="icon" class="my-avatar__icon" v-bind="iconProps"></my-icon>
      <img v-if="src" :src="src" :alt="alt" @error="onError">
      <span v-if="$slots.default" ref="text" class="my-avatar__string" :style="transformStyle"><slot></slot></span>
    </span>
  </Tooltip>
</template>

<script>
  /**
   *  头像组件
   *  @module $ui/components/my-avatar
   */
  import {MyIcon} from '$ui'
  import {Tooltip} from 'element-ui'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义头像文字
   */
  export default {
    name: 'MyAvatar',
    components: {
      MyIcon,
      Tooltip
    },
    /**
     * 属性参数
     * @member props
     * @property {string|object} [icon] 设置头像的图标类型，或my-icon组件参数对象
     * @property {string} [shape=circle] 形状， 可选 'circle', 'square'
     * @property {string|number} [size] 设置头像的大小,可选 'large', 'small', 'default'，也可以指定像素大小
     * @property {string} [src] 图片类头像的资源地址
     * @property {string} [alt] 图像无法显示时的替代文本
     * @property {string} [theme=info] 主题颜色，可选值 'primary', 'success', 'warning', 'danger', 'info'
     */
    props: {
      // 设置头像的图标类型，参考 Icon 组件
      icon: [String, Object, Array],
      // 指定头像的形状
      shape: {
        type: String,
        default: 'circle',
        validator(val) {
          return ['circle', 'square'].includes(val)
        }
      },
      // 设置头像的大小
      size: {
        type: [String, Number],
        default: 'default',
        validator(val) {
          return ['large', 'small', 'default'].includes(val) || val > 0
        }
      },
      // 图片类头像的资源地址
      src: {
        type: [String, Array]
      },
      // 图像无法显示时的替代文本
      alt: String,
      // 颜色
      theme: {
        type: String,
        default: 'info',
        validator(val) {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      },
      // tooltip 配置
      tooltip: {
        type: [String, Object]
      }
    },
    data() {
      return {
        scale: 1
      }
    },
    computed: {
      iconProps() {
        return this.icon
          ? {
            name: typeof this.icon === 'string' ? this.icon : '',
            ...(typeof this.icon === 'object' ? this.icon : null)
          }
          : null
      },
      classes() {
        return {
          'my-avatar': true,
          'my-avatar--icon': !!this.icon,
          'my-avatar--text': !!this.$slots.default,
          'my-avatar--image': !!this.src,
          [`is-${this.size}`]: typeof this.size === 'string',
          [`is-${this.shape}`]: !!this.shape,
          'is-custom-size': typeof this.size === 'number',
          'is-pointer': !!this.$listeners.click,
          [`is-${this.theme}`]: !!this.theme
        }
      },
      styles() {
        if (typeof this.size === 'number') {
          const size = Number.parseInt(this.size)
          return {
            width: `${size}px`,
            height: `${size}px`,
            lineHeight: `${size}px`,
            fontSize: '0'
          }
        }
        return null
      },
      iconStyle() {
        if (typeof this.size === 'number') {
          const size = Number.parseInt(this.size)
          return {
            fontSize: `${size * 2 / 3}px`
          }
        }
        return null
      },
      transformStyle() {
        const transformString = `scale(${this.scale}) translateX(-50%)`;
        return {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString
        }
      },
      tooltipProps() {
        return this.tooltip
          ? {
            placement: 'top',
            content: typeof this.tooltip === 'string' ? this.tooltip : '',
            ...(typeof this.tooltip === 'object' ? this.tooltip : null)
          }
          : null
      }
    },
    methods: {
      onError(e) {
        /**
         * 图片加载错误时触发
         * @event error
         * @param {Event} e
         */
        this.$emit('error', e)
      },
      setScale() {
        if (!this.$slots.default || !this.$el || !this.$refs.text) {
          return
        }
        const textWidth = this.$refs.text.offsetWidth
        const containerWidth = this.$el.offsetWidth
        if (textWidth === 0 || containerWidth === 0 || (this.lastTextWidth === textWidth && this.lastContainerWidth === containerWidth)) {
          return
        }
        this.lastTextWidth = textWidth
        this.lastContainerWidth = containerWidth
        this.scale = containerWidth - 8 < textWidth ? (containerWidth - 8) / textWidth : 1
      }
    },
    mounted() {
      this.setScale()
    },
    updated() {
      this.setScale()
    }
  }
</script>


