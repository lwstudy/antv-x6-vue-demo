<template>
  <Card class="my-stat-card" v-bind="$attrs" :body-style="bodyStyle">
    <div class="my-stat-card__actions" :style="actionsStyle">
      <Action v-for="(action, index) in actions"
              :key="index"
              v-bind="action"
              @click.native="handleActionClick(action)">
        <slot v-if="$scopedSlots.action" name="action" v-bind="action"></slot>
      </Action>
    </div>
    <div v-if="icon" class="my-stat-card__icon" :class="[`is-${iconType}`]">
      <MyIcon v-bind="iconProps"></MyIcon>
    </div>
    <div class="my-stat-card__wrapper" :class="{'is-has-icon':!!icon}">
      <div v-if="title || $slots.title" class="my-stat-card__title">
        <slot name="title">{{title}}</slot>
      </div>
      <div class="my-stat-card__total">
        <slot name="total">{{total}}</slot>
      </div>
      <div v-if="$slots.default" class="my-stat-card__content">
        <slot></slot>
      </div>
    </div>
    <div v-if="$slots.footer" class="my-stat-card__footer">
      <slot name="footer"></slot>
    </div>
  </Card>

</template>

<script>
  /**
   * 统计卡片
   * @module $ui/components/my-stat-card
   */
  import {Card} from 'element-ui'
  import {MyIcon} from '$ui'
  import Action from './Action'

  /**
   * 插槽
   * @member slots
   * @property {string} default 定义主要内容
   * @property {string} title 定义标题
   * @property {string} action 作用域插槽，定义操作按钮，参数 action
   * @property {string} total 定义数量
   * @property {string} footer 定义底部内容
   */
  export default {
    name: 'MyStatCard',
    components: {
      Card,
      Action,
      MyIcon
    },
    /**
     * 属性参数， 继承 el-card 的全部参数，并增加以下参数
     * @member props
     * @property {string} [title] 标题文本，复杂文本可用插槽定义
     * @property {Array} [actions] 操作按钮，数据项：{icon: String|Object，tooltip: String|Object}
     * @property {string|object} [icon] 显示图标
     * @property {string} [iconType=primary] 图标风格颜色，可选'primary', 'success', 'warning', 'danger'
     * @property {string} [padding] 内边距，默认  '10px 14px 3px'
     *
     */
    props: {
      title: String,
      // [{icon, tooltip}]
      actions: Array,
      total: [Number, String],
      icon: {
        type: [String, Object]

      },
      iconType: {
        type: String,
        default: 'primary',
        validator(val) {
          return ['primary', 'success', 'warning', 'danger'].includes(val)
        }
      },
      padding: {
        type: String,
        default: '10px 14px 3px'
      }
    },
    computed: {
      iconProps() {
        return typeof this.icon === 'string'
          ? {name: this.icon}
          : this.icon
      },
      bodyStyle() {
        return {
          padding: `${this.padding}`,
          ...(this.$attrs['body-style'] || {})
        }
      },
      actionsStyle() {
        return {
          padding: `${this.padding}`
        }
      }
    },
    methods: {
      handleActionClick(action) {
        /**
         * 点击操作按钮时触发
         * @event action
         * @param {object} 按钮数据项
         */
        this.$emit('action', action)
      }
    }
  }
</script>

