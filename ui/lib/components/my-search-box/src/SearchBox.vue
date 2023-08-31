<template>
  <component :is="inputComponent"
             class="my-search-box"
             v-bind="inputProps"
             v-model="inputValue"
             v-on="$listeners"
             :class="classes">
    <slot v-if="$scopedSlots.default" slot-scope="scope" v-bind="scope"></slot>
    <slot name="prepend" slot="prepend"></slot>
    <ElButton slot="append"
              class="my-search-box__button"
              :icon="icon"
              @click="handleSearch">{{text}}
    </ElButton>
  </component>
</template>

<script>
  /**
   * 搜索输入框组件
   * @module $ui/components/my-search-box
   */
  import {Input, Button, Autocomplete} from 'element-ui'

  export default {
    name: 'MySearchBox',
    components: {
      ElButton: Button
    },
    /**
     * 属性参数
     * @member props
     * @property {boolean} [suggest] 启用输入建议功能，需要定义 fetchSuggestions
     * @property {Object} [props] 输入框组件的实例化参数，即 ElInput 的参数，如开启suggest，即标识 ElAutocomplete的参数
     * @property {string} [value] 输入框的值
     * @property {boolean} [round] 输入框变成圆角
     * @property {string} [icon] 搜索按钮的图标, 不支持svg图标
     * @property {string} [text] 搜索按钮的文本
     * @property {boolean} [disabled] 禁用输入框
     * @property {boolean} [readonly] 输入框只读模式
     * @property {string} [placeholder] 输入框占位文本
     * @property {string} [size] 组件尺寸，支持 'medium', 'small', 'mini', ''
     */
    props: {
      suggest: Boolean,
      props: Object,
      value: String,
      // 圆角
      round: Boolean,
      icon: {
        type: String,
        default: 'el-icon-search'
      },
      text: String,
      disabled: Boolean,
      readonly: Boolean,
      placeholder: String,
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['medium', 'small', 'mini', ''].includes(val)
        }
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.inputValue = val
        }
      }
    },
    computed: {
      inputComponent() {
        return this.suggest ? Autocomplete : Input
      },
      inputProps() {
        return {
          disabled: this.disabled,
          readonly: this.readonly,
          placeholder: this.placeholder,
          size: this.size,
          ...this.props
        }
      },
      classes() {
        return {
          'is-round': this.round,
          [`is-${this.size}`]: !!this.size
        }
      }
    },
    methods: {
      handleSearch() {
        if (this.inputProps.disabled) return
        /**
         * 点击搜索按钮时触发
         * @event search
         * @param {string} value 输入框的值
         */
        this.$emit('search', this.inputValue)
      }
    }
  }
</script>
