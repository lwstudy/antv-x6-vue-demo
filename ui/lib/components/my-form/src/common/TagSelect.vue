<template>
  <div :class="classes">
    <template v-if="tag">
      <Tag v-if="multiple && checkAll"
           type="primary"
           :size="size"
           class="my-tag-select__tag"
           :effect="isAll ? 'dark' : 'light'"
           @click="handleCheckAll"
      >全部
      </Tag>
      <Tag v-for="(item,index) in optionsComputed"
           :key="index"
           type="primary"
           :class="{'my-tag-select__tag':true, 'is-disabled':item.disabled, 'is-checked':isChecked(item)}"
           :size="size"
           :effect="isChecked(item) ? 'dark' : 'light'"
           @click="handleChecked(item)">
        <slot :item="item" :index="index">{{item.label}}</slot>
      </Tag>
    </template>
    <template v-else>
      <span v-if="multiple && checkAll" :class="{'my-tag-select__tag':true, 'is-checked':isAll}"
            @click="handleCheckAll">全部</span>
      <span v-for="(item, index) in optionsComputed"
            :key="index"
            @click="handleChecked(item)"
            :class="{'my-tag-select__tag':true, 'is-disabled':item.disabled, 'is-checked':isChecked(item)}">
     <slot :item="item" :index="index">{{item.label}}</slot>
    </span>
    </template>
    <a v-if="collapsible" class="my-tag-select__expand" @click="toggleCollapse">
      <template v-if="currentCollapsed">
        展开 <i class="el-icon-arrow-down"></i>
      </template>
      <template v-else>
        收起 <i class="el-icon-arrow-up"></i>
      </template>
    </a>
  </div>
</template>

<script>
  /**
   * 标签选择组件
   * @module $ui/components/my-form/src/common/TagSelect
   */
  import {Tag} from 'element-ui'
  import {isEqual} from '$ui/utils/util'

  export default {
    components: {
      Tag
    },
    /**
     * 属性参数
     * @member props
     * @property {*} [value] 值，多选是数组, 支持双向绑定
     * @property {Array} [options] 选项数组 [{label, value, disabled}]
     * @property {Object} [keyMap] 选项数据项字段映射 {label, value, disabled}
     * @property {Boolean} [collapsible=false] 开启折叠
     * @property {Boolean} [collapsed=true] 初始折叠，collapsible=true有效
     * @property {Boolean} [checkAll] 开启全选，multiple=true有效
     * @property {Boolean} [multiple] 开启多选
     * @property {Boolean} [tag] 开启tag风格
     * @property {string} [size] 尺寸，可选值'medium', 'small', 'mini', ''
     * @property {boolean} [disabled] 禁用
     * @property {boolean} [readonly] 只读
     * @property {number} [min=0] 至少要选几个，与checkAll是互斥，设置改属性，不能设置checkAll
     * @property {number} [max=Infinity] 至多可选几个，与checkAll是互斥，设置改属性，不能设置checkAll
     */
    props: {
      // 值
      value: [String, Number, Array],
      // 选项
      options: {
        type: Array,
        default() {
          return []
        }
      },
      // 字段映射
      keyMap: {
        type: Object,
        default() {
          return {
            label: 'label',
            disabled: 'disabled',
            value: 'value'
          }
        }
      },
      // 开启折叠
      collapsible: {
        type: Boolean,
        default: false
      },
      // 初始折叠，collapsible=true有效
      collapsed: {
        type: Boolean,
        default: true
      },
      // 开启全选，multiple=true有效
      checkAll: Boolean,
      // 开启多选
      multiple: Boolean,

      // 开启tag风格
      tag: Boolean,

      // 尺寸
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['medium', 'small', 'mini', ''].includes(val)
        }
      },
      // 禁用
      disabled: Boolean,
      // 只读
      readonly: Boolean,
      // 最少要选几个
      min: {
        type: Number,
        default: 0
      },
      // 最多可选几个
      max: {
        type: Number,
        default: Infinity
      }
    },
    data() {
      return {
        currentCollapsed: true,
        checked: [],
        isAll: false
      }
    },
    computed: {
      optionsComputed() {
        const {value, label, disabled} = this.keyMap
        return this.options.map(opt => {
          if (typeof opt === 'object') {
            return {
              label: opt[label],
              disabled: opt[disabled],
              value: opt[value] || opt[label]
            }
          } else {
            return {
              label: opt,
              disabled: false,
              value: opt
            }
          }
        })
      },
      classes() {
        return {
          'my-tag-select': true,
          [`my-tag-select--${this.size}`]: !!this.size,
          'my-tag-select--text': !this.tag,
          'is-collapsed': this.collapsible && this.currentCollapsed,
          'is-disabled': this.disabled,
          'is-readonly': this.readonly
        }
      }
    },
    watch: {
      collapsed: {
        immediate: true,
        handler(val) {
          this.currentCollapsed = (this.collapsible && val)
        }
      },
      value: {
        immediate: true,
        handler(val, old) {
          if (isEqual(val, old)) return
          if (this.multiple) {
            this.checked = val ? [].concat(val) : []
          } else {
            this.checked = val
          }
        }
      },
      checked(val) {
        this.$emit('input', val)
        /**
         * 值改变时触发
         * @event change
         * @param {*} value
         */
        this.$emit('change', val)
        this.isAll = val.length === this.optionsComputed.filter(n => !n.disabled).length
      }
    },
    methods: {
      isChecked(item) {
        return this.multiple
          ? !!this.checked.find(v => v === item.value)
          : (this.checked === item.value)
      },
      handleChecked(item) {
        if (item.disabled || this.readonly || this.disabled) return
        if (this.multiple) {
          const length = this.checked.length
          if (this.isChecked(item)) {
            if (length > this.min) {
              this.checked = this.checked.filter(n => n !== item.value)
            }
          } else {
            if (length < this.max) {
              this.checked.push(item.value)
            }
          }
        } else {
          this.checked = item.value
        }
      },
      toggleCollapse() {
        this.currentCollapsed = !this.currentCollapsed
        /**
         * 折叠变化时触发
         * @event collapsed
         * @param {boolean} collapsed 是否折叠
         */
        this.$emit('collapsed', this.currentCollapsed)
      },
      handleCheckAll() {
        if (this.readonly || this.disabled) return
        if (this.isAll) {
          this.checked = []
        } else {
          this.checked = this.optionsComputed.filter(n => !n.disabled).map(n => n.value)
        }
      }
    }
  }
</script>

