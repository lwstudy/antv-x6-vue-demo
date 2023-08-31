<template>
  <el-popover 
    v-bind="{
      ...popPropsProxy,
      trigger: type === 'popover' ? 'click' : 'manual'
    }" 
    v-model="popVisible">
    <slot name="field" slot="reference" :selItems="selItems">
      <my-tag-input class="picker-field" v-bind="$attrs" :allow-create="false" v-model="selItemNames" @click.native="openPicker" @remove="selRemove"></my-tag-input>
    </slot> 
    <div class="picker-warp" v-if="type==='popover'" :style="{'height': `${popPropsProxy.height || 400}px`}">
      <member-picker-core ref="picker" v-bind="{...$attrs, 'personPropMap': personPropMap,'submitBtn': true }"  @submit="showResult"></member-picker-core>  
    </div> 
    <my-dialog  :visible.sync="dialogVisible" v-if="type==='dialog'" v-bind="{...dialogPropsProxy}"> 
      <member-picker-core ref="picker" v-bind="{...$attrs, 'personPropMap': personPropMap, 'submitBtn': true }" @submit="showResult"></member-picker-core>
    </my-dialog>
  </el-popover> 
</template>
<style lang="scss" scoped>
/deep/ .el-form-item.picker-field{
  margin-bottom: 0;
}
</style>
<script>
import MemberPickerCore from './core'
import {isEqual} from '$ui/utils/util'
const DefaultDialogProps = {
  target: 'body', 
  title: '选择', 
  width: '700px',
  height: '580px', 
  footer: false,
  modal: true
}
const DefaultPopProps = {
  placement: 'bottom-start',
  title: '选择',
  width: 600,
  height: 400 
}
export default {
  mixins: [],
  components: {MemberPickerCore},
  /*
    //  ========== 表单弹窗参数 ================
    value: 用作v-model双向绑定
    type: 弹窗的打开方式： dialog / popover
    fieldPropsMap： 接口返回人员列表字段映射（作用于表单的显示标签中）
    dialogProps: 弹窗配置参数
    popProps: popover 配置参数

    // ========== 选择器参数 =================
    submitBtn 控制是否显示提交、取消按钮 ，默认true
    personPropMap：接口返回人员列表字段映射
    multiple: 是否多选
    showOrgList: 是否结合部门进行查询（显示右侧部门列表）
    searchPerson: 通过搜索异步查询人员函数，必传，参数keyword, 返回 输出人员列表的 Promise对象 
    loadOrg: 异步获取初始部门树的函数，必传，返回 输出组织架构树 的 Promise对象
    loadOrgChildren: 异步获取各个子部门树的函数（用于懒加载），选传，返回 输出 子级部门 的 Promise对象
    loadUser: 根据部门信息异步获取部门成员的函数，必传，返回 输出 部门成员数组 的 Promise对象,
    orgPropMap：接口返回部门数据字段映射
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
    personPropMap: {
      type: Object,
      default: () => {
        return {
          label: 'name',
          id: 'id',
          cardNo: 'cardNo'
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
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!isEqual(val, this.selItems)) {
          this.selItems = [...val]
        }
      }
    },
    selItems: {
      immediate: false,
      handler(val) {
        
        this.selItemNames = this.selItems.map((item) => {
          return item[this.personPropMap.label]
        }) 
        
        this.$emit('change', val)
        this.$emit('input', val) 
      }
    }
  },
  methods: {
    openPicker() {
      if (this.type === 'dialog') {
        this.dialogVisible = true
      } 
    }, 
    showResult(targets, dept) {  
      const uniTarget = this._removeDuplicate(targets, this.selItems, this.personPropMap.id) 
      this.selItems = this.selItems.concat(uniTarget)
      this.dialogVisible = false
      this.popVisible = false
    },
    selRemove(index, label) {
      this.selItems.splice(index, 1)
    },
    _removeDuplicate(data, targets, key) {
      return data.filter((item) => {
        const Key = item[key] // 唯一表示
        const targetIndex = targets.findIndex((node) => {
          return node[key] === Key
        })
        return targetIndex < 0
      })
    }
  },
  created() {},
  mounted() {}
}
</script>