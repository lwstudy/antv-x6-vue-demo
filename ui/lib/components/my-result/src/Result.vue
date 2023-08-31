<template>
  <div :class="classes">
    <div v-if="iconProps || exceptionIcon|| $slots.icon"
         :class="iconWrapperClass">
      <slot name="icon">
        <my-icon v-if="iconProps" class="my-result__icon" v-bind="iconProps"></my-icon>
        <component if="exceptionIcon" :is="exceptionIcon"></component>
      </slot>
    </div>

    <div v-if="title || $slots.title" class="my-result__title">
      <slot name="title">{{title}}</slot>
    </div>
    <div v-if="subtitle || $slots.subtitle" class="my-result__subtitle">
      <slot name="subtitle">{{subtitle}}</slot>
    </div>
    <div v-if="$slots.default" class="my-result__content">
      <slot></slot>
    </div>
    <div v-if="$slots.extra" class="my-result__extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 结果展示组件
   * @module $ui/components/my-result
   */
  import {MyIcon} from '$ui'
  import noFound from './noFound'
  import serverError from './serverError'
  import unauthorized from './unauthorized'

  export const ExceptionMap = {
    404: noFound,
    500: serverError,
    403: unauthorized
  }

  const ExceptionStatus = Object.keys(ExceptionMap);

  const defaultIcons = {
    success: 'el-icon-success',
    error: 'el-icon-error',
    warning: 'el-icon-warning',
    info: 'el-icon-info'
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义附加内容
   * @property {string} icon 定义个性化图标内容
   * @property {string} title 定义标题
   * @property {string} subtitle 定义副标题
   * @property {string} extra 定义额外内容，通常用作定义操作按钮
   */
  export default {
    name: 'MyResult',
    components: {
      MyIcon
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 标题文本，复杂内容用插槽定义
     * @property {string} [subtitle] 副标题文本，复杂内容用插槽定义
     * @property {string} [status=info] 结果的状态,决定图标和颜色, 可选值：'success', 'error', 'info', 'warning', '404', '403', '500'
     * @property {string|object} [icon] 图标名称或my-icon组件配置对象
     */
    props: {
      // title 文字
      title: {
        type: String
      },
      // subTitle 文字
      subtitle: String,
      // 结果的状态,决定图标和颜色
      status: {
        type: String,
        default: 'info',
        validator(val) {
          return ['success', 'error', 'info', 'warning', '404', '403', '500'].includes(val)
        }
      },
      // 自定义 icon
      icon: {
        type: [String, Object]
      }
    },
    computed: {
      classes() {
        return {
          'my-result': true,
          [`my-result--${this.status}`]: !!this.status
        }
      },
      iconProps() {
        if (ExceptionStatus.includes(this.status)) {
          return null
        }
        if (defaultIcons[this.status]) {
          return typeof this.icon === 'object'
            ? {...this.icon}
            : {name: this.icon || defaultIcons[this.status]}
        }
        if (this.icon) {
          return typeof this.icon === 'object'
            ? {...this.icon}
            : {name: this.icon}
        }

        return null
      },
      exceptionIcon() {
        if (ExceptionStatus.includes(this.status)) {
          return ExceptionMap[this.status]
        }
        return null
      },
      iconWrapperClass() {
        return {
          'my-result__icon-wrapper': true,
          'is-image': !!this.exceptionIcon
        }
      }
    }
  }
</script>

