<template>
  <my-panel class="input-area" title="选中人员" :border="false" fit shadow="never">
    <div class="input-wrapper" @click.stop="focusInput">
      <el-popover
        popper-class="picker__popper"
        placement="bottom-start"
        width="300"
        trigger="manual"
        v-model="popoverActive"
      >
        <auto-complete
          v-bind="$attrs"
          :keyword="keyword"
          @select="handleSelect"
          :person-prop-map="personPropMap"
          
        ></auto-complete>
        <my-tag-input
          style="width: 100%" 
          slot="reference"
          ref="inputTag"
          v-model="value"
          class="input-tag"
          :allow-create="false"
          icon
          @input-change="handleInputChange"
          @remove="(index) => removeItem(currentItems[index])"
          placeholder="搜索姓名......"
        ></my-tag-input>
      </el-popover>
    </div>
    <div slot="footer" v-if="submitBtn">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </my-panel>
</template>

<script>
import AutoComplete from './auto-complete'

export default {
  props: {
    submitBtn: {
      type: Boolean,
      default: true
    },
    personPropMap: Object,
    multiple: Boolean
  },
  components: {
    AutoComplete
  },
  data() {
    return {
      timer: null,
      currentItems: [],
      keyword: '',
      popoverActive: false
       
    }
  },
  computed: {
    value: {
      get() {
        return this.currentItems.map(item => item.name)
      },
      set(val) {
        // this.currentItems = this.currentItems.filter(item =>
        //   val.includes(item.name)
        // )
      }
    }
  },
  watch: {
   
  },
  methods: {
    validate(item) {
      const node = this.currentItems.find(n => n.id === item.id)
      if (node) {
        this.$message({
          type: 'warning',
          message: '不能添加相同项'
        })
      }
      return !node
    },
    focusInput() {
      this.$refs.inputTag.$refs.comp.$refs.input.focus()
    },
    handleInputChange(val) { 
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.keyword = val
        this.popoverActive = !!val
      }, 300)
    },
    handleSelect(item) {
      if (this.validate(item)) {
        if (this.multiple) {
          this.currentItems.push(item) 
        } else {
          this.currentItems = [item]
        }
        this.$refs.inputTag.$refs.comp.query = ''
      }
    }, 
    removeItem(tag) { 
      if (this.multiple) {
        this.currentItems = this.currentItems.filter(n => tag[this.personPropMap.id] !== n[this.personPropMap.id])
        this.$emit('cancelSelect', tag)
      } else {
        this.currentItems = []
      }
    },
    submit() {
      const result = JSON.parse(JSON.stringify(this.currentItems))
      this.$emit('submit', result)
    },
    cancel() {
      this.currentItems = []
      this.$emit('cancel')
    }
  },
  mounted() {},
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-tag {
  display: block;

  /deep/ {
    .el-input__inner {
      border-color: transparent;
    }
    .el-select__input {
      border-bottom: 1px solid #dcdfe6;
    }
  }
}

.input-wrapper {
  height: 100%;
}
</style>
