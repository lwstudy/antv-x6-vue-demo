<template>
  <div class="my-tag-input" :class="classes" @click="focus">
    <div class="el-select__tags" ref="tags">
      <span v-if="collapseTags && tags.length">
        <Tag type="info"
             :size="tagSize"
             :closable="closableTag"
             disable-transitions
             @close="removeTag(0)">{{tags[0]}}</Tag>
         <Tag
           v-if="tags.length>1"
           :closable="false"
           type="info"
           :size="tagSize"
           disable-transitions>
          <span class="el-select__tags-text">+ {{tags.length-1}}</span>
        </Tag>
      </span>
      <span v-if="!collapseTags">
        <Tag v-for="(item, index) in tags"
             :key="index"
             type="info"
             :size="tagSize"
             :closable="closableTag"
             disable-transitions
             @close="removeTag(index)">{{item}}
        </Tag>
      </span>
      <input 
             ref="input"
             type="text"
             :disabled="disabled"
             :readonly="readonly"
             v-model.trim="query"
             class="el-select__input"
             @keyup.enter.prevent.stop="select"
             @blur="blur"
             :style="inputStyle"/>
    </div>  
    <ElInput ref="reference"
             :size="size"
             :suffix-icon="icon"
             :disabled="disabled"
             :readonly="readonly"
             :placeholder="showPlaceholder"
             @focus="focus"
             @blur="blur" 
            >
    </ElInput>

    <Select v-if="false"></Select>
  </div>
</template>

<script>
  /**
   * 标签输入框组件
   * @module $ui/components/my-form/src/common/TagInput
   */
  import {Select, Tag, Input} from 'element-ui'
  import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
  import {isEqual} from '$ui/utils/util'

  export default {
    components: {
      Select,
      Tag,
      ElInput: Input
    },
    /**
     * 属性参数
     * @member props
     * @property {array} [value] 初始值，支持双向绑定
     * @property {string} [size] 尺寸，可选值'medium', 'small', 'mini', ''
     * @property {boolean} [disabled] 禁用
     * @property {boolean} [readonly] 只读
     * @property {boolean} [collapseTags] 折叠标签
     * @property {string} [placeholder] 输入框占位文本
     * @property {boolean} [closable=true] 允许删除标签
     * @property {boolean} [allowCreate=true] 允许创建标签
     * @property {string} [icon=el-icon-price-tag] 输入框后缀的图标样式 
     * @property {boolean} [blurCreate = true] 允许通过blur方式插入
     *
     */
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['medium', 'small', 'mini', ''].includes(val)
        }
      },
      disabled: Boolean,
      readonly: Boolean,
      collapseTags: Boolean,
      placeholder: String,
      closable: {
        type: Boolean,
        default: true
      },
      blurCreate: {
        type: Boolean,
        default: true
      },
      // 允许新增
      allowCreate: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: 'el-icon-price-tag'
      } 
    },
    data() {
      return {
        initialInputHeight: 0,
        inputLength: 100,
        inputWidth: 0,
        tags: [],
        query: ''
      }
    },
    computed: {
      classes() {
        return {
          'el-select': true,
          [`el-select--${this.size}`]: !!this.size
        }
      },
      tagSize() {
        return ['small', 'mini'].includes(this.size) ? 'mini' : 'small';
      },
      inputStyle() {
        return {
          flexGrow: 1,
          width: `${this.inputLength / (this.inputWidth - 32)}%`,
          maxWidth: `${this.inputWidth - 42}px`,
          minWidth: '50px'
        }
      },
      showPlaceholder() {
        return (this.tags.length > 0 || this.query) ? '' : this.placeholder
      },
      closableTag() {
        return this.closable && !this.disabled && !this.readonly
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (!isEqual(val, this.tags)) {
            this.tags = [...val]
          }
        }
      },
      query(val) {
        /**
         * 输入框文字改变时触发
         * @event input-change
         * @param {string} val 输入框文本
         */
        this.$emit('input-change', val)
      },
      tags(val) {
        /**
         * 输入框标签改变时触发
         * @event change
         * @param {Array} [tags] 标签
         */
        this.$emit('change', val)
        this.$emit('input', val)
      }
    },
    methods: {
      setInitialInputHeight() {
        const sizeMap = {
          medium: 36,
          small: 32,
          mini: 28
        }
        this.initialInputHeight = sizeMap[this.size] || 40;
      },
      handleResize() {
        this.resetInputWidth();
        this.resetInputHeight();
      },
      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },
      resetInputHeight() {
        if (this.collapseTags) return
        this.$nextTick(() => {
          if (!this.$refs.reference) return
          const inputChildNodes = this.$refs.reference.$el.childNodes;
          const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
          const tags = this.$refs.tags;
          const sizeInMap = this.initialInputHeight || 40;
          input.style.height = this.tags.length === 0
            ? sizeInMap + 'px'
            : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
        })

      },
      focus() {
        this.$refs.input && this.$refs.input.focus()
        this.$emit('focus')
      },
      blur() {
        this.$refs.input && this.$refs.input.blur()
        if (this.blurCreate) {
          this.select()
        }
        this.$emit('blur')
      },
      removeTag(index) {
        if (index > -1) {
          const tag = this.tags[index]
          this.tags.splice(index, 1)
          this.query = ''
          /**
           * 删除标签时触发
           * @event remove
           * @param {Number} index 标签所在索引
           * @param {*} tag 标签
           */
          this.$emit('remove', index, tag)
        }
      },
      select() {
        if (!this.allowCreate) return
        if (!this.query) return
        this.tags.push(this.query)
        /**
         * 新增标签时触发
         * @event add
         * @param {string} [tag] 标签
         */
        this.$emit('add', this.query)
        this.query = ''
      }
    },
    mounted() {
      addResizeListener(this.$refs.tags, this.handleResize)
      this.setInitialInputHeight()
    },
    beforeDestroy() {
      removeResizeListener(this.$refs.tags, this.handleResize)
    }
  }
</script>
