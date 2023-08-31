<template> 
  <my-select-field 
    ref="field"
    :field-props-map="optionsPropsMap" 
    v-bind="{ 
      'field-props-map': optionsPropsMap, 
      ...fieldProps
    }" 
    v-model="selectItems"
    @on-confirm="confirmHandle"
    @open="openPickerHandle"
    @show="openPickerHandle"
    v-on="{...otherListener}"
  > 
    <template v-slot:field="{selItems}" >
      <slot name="field" :selItems="selItems"></slot>
    </template>
    <list-picker slot="picker" ref="picker" v-bind="{isShowSubmit: false, ...$attrs, optionsPropsMap: optionsPropsMap}">
      <template v-slot:filter >
        <slot name="filter"></slot>
      </template>
      <template v-slot:option="{item}">
        <slot name="option" :item="item"></slot>
      </template>

      <template v-slot:column="scope">
        <slot name="column" v-bind="scope"></slot>
      </template>
    </list-picker> 
  </my-select-field>
</template>
<script>
import ListPicker from './core'
import {isEqual} from '$ui/utils/util' 
export default {
  components: {ListPicker},
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 选项表单组件参数
    fieldProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 选项表单与选项列表的共同字段映射
    optionsPropsMap: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          id: 'id',
          value: 'id'
        }
      }
    },
    // 选择器是否记录当前选项（是否回填）
    keepPickerState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectItems: []
    }
  },
  computed: {
    // 
    otherListener() {
      const listeners = {...this.$listeners}
      delete listeners.input
      return listeners
    }
  },
  watch: {
    value: {
      immediate: false,
      handler(val) { 
        if (!isEqual(val, this.selectItems)) {
          this.selectItems = [...val] 
        }
      }
    }, 
    selectItems(val) {  
      this.$emit('change', val)
      this.$emit('input', val) 
      
    }
  },
  methods: {
    // 代理picker组件的查询点击事件
    filterSubmitHandle(model) {
      this.$refs.picker.filterSubmitHandle(model)
    }, 
    // 选择器的确认回调函数
    confirmHandle() { 
      const selects = this.$refs.picker.getSelectItems() 
      if (this.$refs.picker.isMultiSel) { // 选择器是多选
        const adds = this.$refs.field._removeDuplicate(selects, this.selectItems, this.optionsPropsMap.id)
        this.selectItems = this.selectItems.concat(adds)
      } else {
        this.selectItems = selects
      }
      this.$refs.field.closePicker()
      this.$emit('on-submit', this.selectItems)
    },
    openPicker() {
      this.$refs.field.openPicker()
    }, 
    closePicker() {
      this.$refs.field.closePicker()
    },
    // 选择器弹窗打开 
    openPickerHandle() { 
      if (this.keepPickerState) {
        this.$nextTick(() => {
          this.$refs.picker.setSelectItems(this.selectItems)
        }) 
      }
      this.$emit('on-pickerOpen')
    }
  },
  created() {
     
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
</style>