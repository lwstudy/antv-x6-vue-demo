<template>
  <el-popover 
    v-bind="{
      ...popPropsProxy,
      trigger: popoverType
    }" 
    v-on="{...popoverListener}"
    v-model="popVisible">
    <slot name="field" slot="reference" :selItems="selItems">
      <my-tag-input class="my-select-field" v-bind="$attrs" :allow-create="false" v-model="selItemNames" @click.native="openPicker" @remove="selRemove"></my-tag-input>
    </slot> 
    <div class="picker-warp" v-if="type==='popover' && popVisible" :style="{'height': `${popPropsProxy.height || 300}px`}">
      <slot name="picker"></slot>
    </div>
    <div style="text-align:right" v-if="popPropsProxy.footer" >
      <el-button type="primary" size="small" @click="confirmHandle">确定</el-button>
      <el-button type="warning" size="small"  @click="cancelHandle">取消</el-button>  
    </div> 
    <my-dialog  :visible.sync="dialogVisible" v-if="type==='dialog'" v-bind="{...dialogPropsProxy}" @submit="confirmHandle" @cancel="cancelHandle"  v-on="$listeners"> 
       <slot name="picker"></slot>
    </my-dialog>
  </el-popover> 
</template>
<script>
/**
 * 自定义多选框
 * 组件继承与my-tag-input 组件
 * @module $ui/components/my-select-field
 */ 
import {isEqual} from '$ui/utils/util'
const DefaultDialogProps = {
  target: 'body', 
  title: '选择', 
  width: '700px',
  height: '580px', 
  footer: true,
  modal: true
}
const DefaultPopProps = {
  placement: 'bottom-start',
  title: '选择',
  width: 480,
  height: 300,
  footer: true 
}
/**
 * 插槽
 * @member slots
 * @property {string} field 表单区域（选中内容显示）插槽
 * @property {string} picker 弹窗、popover 选择器插槽
 */
export default {
  name: 'MySelectField',
  mixins: [],
  components: {},
  /**
   * 属性参数
   * @member props
   * @property {array} [value] 实现双向绑定v-model
   * @property {string} [type] 选择器打开方式，dialog / popover, 默认popover
   * @property {object} [fieldPropsMap] 表单中显示内容的字段映射，通常自定义选中选择的数据为对象格式，需要选择对象中某个字段作为 tag-input 中的标签显示字段
   * @property {string} [fieldPropsMap.label] 确定tag-input标签的显示字段
   * @property {string} [fieldPropsMap.id] 确定选择数据的唯一标识
   * @property {object} [dialogProps] dialog弹窗的配置项（继承my-dialog的props）
   * @property {object} [popProps] popover 的配置项（继承el-popover的props）
   * @property {number} [popProps.height] popover 的特殊配置项（el-popover没有的），控制popover高度 
   * @property {boolean} [popProps.footer] popover 的特殊配置项（el-popover没有的），控制popover是否显示确认、取消按钮
   * @property {string} [size] 尺寸，可选值'medium', 'small', 'mini', ''（my-tag-input参数）
   * @property {boolean} [disabled] 禁用（my-tag-input参数）
   * @property {boolean} [readonly] 只读（my-tag-input参数）
   * @property {boolean} [collapseTags] 折叠标签（my-tag-input参数）
   * @property {string} [placeholder] 输入框占位文本（my-tag-input参数）
   * @property {boolean} [closable=true] 允许删除标签（my-tag-input参数） 
   * @property {string} [icon=el-icon-price-tag] 输入框后缀的图标样式 （my-tag-input参数）
  */
  props: {
    value: {
      type: Array,
      default: () => { return [] }
    },
    type: {
      type: String,
      default: 'popover',
      validator: function(t) {
        return ['dialog', 'popover'].includes(t)
      }
    },
    fieldPropsMap: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          id: 'id'
        }
      }
    },
    dialogProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    popProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      selItemNames: [],
      selItems: [],

      popVisible: false,
      dialogVisible: false,
      dialogPropsProxy: {
        ...DefaultDialogProps,
        ...this.dialogProps
      },
      popPropsProxy: {
        ...DefaultPopProps,
        ...this.popProps
      }
      
    }
  },
  computed: {
    popoverType() {
      return this.type === 'popover' ? this.popPropsProxy.footer ? 'manual' : 'click' : 'manual' 
    },
    popoverListener() {
      const listeners = {...this.$listeners}
      delete listeners.input
      return listeners
    }
  },
  watch: {
    value: {
      immediate: false,
      handler(val) { 
        if (!isEqual(val, this.selItems)) {
          this.selItems = [...val] 
        }
      }
    },
    selItems(val) {
      this.selItemNames = val.map((item) => {
        return item[this.fieldPropsMap.label]
      }) 
      this.$emit('change', val)
      this.$emit('input', val) 
      
    }
  },
  methods: {
    /**
     * 打开选择器
     * @method openPicker 
     */
    openPicker() { 
      
      if (this.type === 'dialog') {
        this.dialogVisible = true
      }
      if (this.popoverType === 'manual' && this.type === 'popover') {
        this.popVisible = true
      } 
      
    }, 
    /**
     * 关闭选择器
     * @method closePicker 
     */
    closePicker() {
      this.dialogVisible = false 
      // if (this.popoverType === 'manual') {
        this.popVisible = false
      // } 
    }, 
    selRemove(index, label) {
      const item = this.selItems.splice(index, 1) 
      this.$emit('on-remove', item[0], index)
    },
    /**
     * 去重函数（将一个数组添加到另一个数组里，需要将已有的数据去重）
     * @method _removeDuplicate
     * @param {array} [data] 需要排重的数据
     * @param {array} [targets] 去重数据的放置目标
     * @param {string} [key] 排重的标识字段
     */
    _removeDuplicate(data, targets, key) {
      return data.filter((item) => {
        const Key = item[key] // 唯一表示
        const targetIndex = targets.findIndex((node) => {
          return node[key] === Key
        })
        return targetIndex < 0
      })
    },
    confirmHandle() {
      /**
       * 点击确认事件
       * @event on-confirm 
       */
      this.$emit('on-confirm') 
    },
    cancelHandle() {
      /**
       * 点击取消事件
       * @event on-cancel
       */
      this.$emit('on-cancel')
      this.closePicker()
    }
  },
  created() { 
  }
}
</script>