<template>
  <div class="my-edit-tags">
    <div class="my-edit-tags__warp clearfix">
      <el-tag
        :size="size"
        v-bind="$attrs"
        :key="`${tag}_${index}`"
        v-for="(tag, index) in dynamicTags"
        :closable="!readOnly"
        :disable-transitions="true"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>

      <el-input
        :style="inputStyle"
        :class="inputClass"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini" 
        v-if="inputVisible"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input> 
      <el-tag v-else  key="edit" v-bind="$attrs" class="button-new-tag" :style="addTagStyle" :size="size"  @click="showInput" v-show="!readOnly">+ 添加</el-tag>
      
      
    </div>
  </div>
</template>

<script>
/**
 * edit-tags 批量标签编辑工具
 * @module $ui/components/my-edit-tags
 */
export default {
  name: 'MyEditTags',
  /**
   * 参数属性
   * @member props
   * @property {Boolean} [isRight = true] 输入表单在后面
   * @property {Array} [tagsList = []] 双向绑定 标签数组
   * @property {Boolean} [readOnly = false] 是否只读
   * @property {Arrays} [devides = ['，', ',', '|']] 字符串分割符号集合
   * @property {String} [inputWidth = '80px'] 输入框长度
   * @property {String} [size = ''] 整体大小（‘’，small, medium, mini）
   * @property {Function} [validate = function(keys, vm) {return Promise}] 验证输入值的函数，参数：当前编辑的并经过分割后的标签数组， 当前组件, 输出： Promise
   * @property {Function} [invalidateHandle = function(keys, vm) {return Promise}] 验证失败的回调函数,参数：当前编辑的并经过分割后的标签数组， 当前组件, 输出： Promise
   */
  props: {
    isRight: {
      type: Boolean,
      default: true
    },
    tagsList: {
      type: Array,
      default: () => { return [] }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    devides: {
      type: Array,
      default: () => { return ['，', ',', '|'] }
    },
    inputWidth: {
      type: String,
      default: '80px'
    },
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return ['', 'medium', 'small', 'mini'].indexOf(value) !== -1
      }
    },
    validate: {
      type: Function
    },
    invalidateHandle: {
      type: Function
    }
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    inputClass() {
      const className = ['input-new-tag']
      const type = this.size ? `is-${this.size}` : 'is-large'
      className.push(type)
      return className
    },
    inputStyle() {
      const margin = this.isRight ? {marginLeft: '5px'} : {marginRight: '5px'}
      return {
        width: this.inputWidth, 
        float: this.isRight ? 'none' : 'left',
        ...margin
      }
    },
    addTagStyle() {
      const margin = this.isRight ? {marginLeft: '5px', marginRight: '0px'} : {marginLeft: '0px', marginRight: '5px'}
      return {
        float: this.isRight ? 'none' : 'left',
        ...margin 
      }
    }
  },
  watch: {
    tagsList(val) {
      this.dynamicTags = this.tagsList.concat([])
    },
    dynamicTags(val) {
      this.$emit('change', val)
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$emit('on-delete', tag, this.dynamicTags)
      this.$emit('update:tagsList', this.dynamicTags)
    },

    showInput() {
      this.$emit('on-addClick')
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (!this.inputValue.trim()) {
        this.inputVisible = false;
        this.inputValue = ''
        return
      }
      const inputValue = this.inputValue;
      const inputValues = this._devideInput(inputValue)
      if (this.validate && typeof this.validate === 'function') {
        this.validate(inputValues, this).then((res) => {
          if (res.length) {

            this.dynamicTags = this.isRight ? this.dynamicTags.concat(res) : res.concat(this.dynamicTags)
            this.$emit('on-add', res, this.dynamicTags)
            this.$emit('update:tagsList', this.dynamicTags)
          }
          this.inputVisible = false;
          this.inputValue = ''
        }).catch((err) => {
          if (this.invalidateHandle && typeof this.invalidateHandle === 'function') {
            this.invalidateHandle(err, this)
          }
        })
      } else {
        if (inputValues.length) {
          this.dynamicTags = this.isRight ? this.dynamicTags.concat(inputValues) : inputValues.concat(this.dynamicTags)
          this.$emit('on-add', inputValue, this.dynamicTags)
          this.$emit('update:tagsList', this.dynamicTags)
        }
        this.inputVisible = false;
        this.inputValue = ''
      }
    },
    _devideInput(inputValue) {
      const inputValuesMap = {}
      let start = 0
      for (let index = 0; index < inputValue.length; index++) {
        if (this.devides.includes(inputValue[index])) {
          start += 1 
        } else {
          if (inputValuesMap[start]) {
            inputValuesMap[start].push(inputValue[index])
          } else {
            inputValuesMap[start] = [inputValue[index]]
          }
        }
      }
      const inputValues = Object.values(inputValuesMap).reduce((total, value) => {
        const tag = value.join('').trim()
        if (!this.dynamicTags.includes(tag)) {
          total.push(tag)
        }
        return total
      }, [])
     
      // console.log('inputValues', inputValues) 
      return inputValues
    },
    setTags(data) {
      this.dynamicTags = data
      this.$emit('update:tagsList', this.dynamicTags)
    }
  },
  created() {
    
    if (this.tagsList.length) {
      this.dynamicTags = this.tagsList.concat([])
    }
  },
  mounted() {
  }
}
</script>
