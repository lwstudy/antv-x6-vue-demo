<template>
  <BasePicker class="my-tree-select"
              :disabled="readonly || disabled"
              ref="picker"
              popper-class="my-tree-select__popover"
              ref-class="my-tree-select__ref">
    <template v-slot:reference>
      <TagInput v-if="multiple"
                :placeholder="placeholder"
                :size="size"
                :value="tags"
                :disabled="disabled"
                :readonly="readonly"
                :collapse-tags="collapseTags"
                :closable="closable"
                :allow-create="false"
                @remove="handleRemove"
                icon="el-icon-arrow-down" 
                > 
                </TagInput>
                <!-- :value="checked ? checked[keyMap.label]:''" -->
      <ElInput v-else
               :value="singleSelValShow()"
               :placeholder="placeholder"
               :size="size"
               :disabled="disabled"
               :readonly="readonly" 
               >
                <i v-show="!clearable || (!checked && clearable)" slot="suffix" class="el-input__icon el-icon-arrow-down" ></i>
                <i v-show="checked && clearable" slot="suffix" class="el-input__icon el-icon-error" style="cursor:pointer" @click.stop="clearClickHandle"></i>
               </ElInput>
    </template>

    <div class="my-tree-select__content">
      <ElInput v-if="filter"
               class="my-tree-select__filter"
               v-model="query"
               size="small"
               clearable
               placeholder="请输入筛选关键字"></ElInput>
      <Tree class="my-tree-select__tree is-line"
            ref="tree"
            v-bind="tree"
            :highlight-current="!multiple"
            :show-checkbox="multiple"
            @current-change="handleCurrentChange"
            @check-change="handleCheckChange"
            :node-key="keyMap.value"
            :filter-node-method="filterNodeMethod"
            :current-node-key="currentNodeKey"
            :default-checked-keys="defaultCheckedKeys"
            :data="optionsTree"
            :style="treeStyle">
        <template v-slot="{node, data}">
            <span :class="{'is-disabled':node[keyMap.disabled] || (onlyLeaf && !node.isLeaf)}">
              <slot :node="node"
                    :data="data">{{node[keyMap.label]}}</slot></span>
        </template>
      </Tree>
    </div>

  </BasePicker>
</template>

<script>
  /**
   * 下拉树组件
   * @module $ui/components/my-form/src/common/TreeSelect
   */
  import {Input, Tree} from 'element-ui'
  import BasePicker from './BasePicker'
  import TagInput from './TagInput'
  import {create as createTree, treeRevert, findPath} from '$ui/utils/tree'
  import {cloneDeep, isEqual} from '$ui/utils/util'

  /**
   * 属性参数
   * @member props
   * @property {string|number|array} [value] 值，多选为数组，支持双向绑定
   * @property {array} [options] 选项数组 [{id, parentId, label, value}]
   * @property {Object} [keyMap] 字段映射 {id, parentId, label, value, disabled}
   * @property {boolean} [multiple] 开启多选
   * @property {boolean} [clearable] 是否可以删除
   * @property {string} [size] 尺寸，可选值：'medium', 'small', 'mini', ''
   * @property {boolean} [disabled]  禁用
   * @property {boolean} [readonly] 只读
   * @property {number} [minWidth=300] 弹出层的最小宽度
   * @property {number} [maxHeight] 弹出层的最大高度
   * @property {boolean|function} [filter] 筛选函数， false即不开启筛选功能
   * @property {*} [root=null] 树的根节点，parentId的值
   * @property {boolean} [collapseTags]  折叠标签，多选有效
   * @property {boolean} [closable] 允许关闭标签，多选有效
   * @property {boolean} [useOriginOpts] 是否使用原options作为参数, 默认false
   * @property {object} [tree] el-tree的其他参数
   *
   */
  export default { 
    components: {
      ElInput: Input,
      TagInput,
      Tree,
      BasePicker
    },
    props: {
      // 值
      value: [String, Number, Array],
      // 选项数据
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
            id: 'id',
            parentId: 'parentId',
            label: 'label',
            disabled: 'disabled',
            value: 'value'
          }
        }
      },
      // 开启多选
      multiple: Boolean,
      // 可以删除
      clearable: Boolean,
      placeholder: String,
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

      // 筛选函数
      filter: {
        type: [Boolean, Function],
        default: true
      },
      // 树的根节点，parentId的值
      root: {
        type: [String, Number, Boolean],
        default: null
      },
      // 是否保留根节点
      withRoot: {
        type: Boolean,
        default: false
      },
      // 折叠标签，多选有效
      collapseTags: Boolean,
      // 允许关闭标签，多选有效
      closable: {
        type: Boolean,
        default: true
      },
      // 树其他参数
      tree: {
        type: Object,
        default() {
          return {}
        }
      },
      // 弹出层的最大高度
      maxHeight: {
        type: Number,
        default: 300
      },
      onlyLeaf: {
        type: Boolean,
        default: false
      },
      // 是否使用原options作为参数
      useOriginOpts: {
        type: Boolean,
        default: false
      },
      // 是否显示选中完整路径
      showFull: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        checked: null,
        query: '',
        optionsProxy: []
      }
    },
    computed: {
      treeStyle() {
        return {
          maxHeight: `${this.maxHeight}px`
        }
      },
      optionsTree() {
        if (this.useOriginOpts) {
          return cloneDeep(this.optionsProxy)
        } else {
          const {id, parentId} = this.keyMap
          return createTree(this.optionsProxy || [], this.root, id, parentId, this.withRoot)
        }
      },
      currentNodeKey() {
        if (this.multiple) {
          return
        }
        return this.checked ? this.checked[this.keyMap.value] : undefined
      },
      defaultCheckedKeys() {
        if (!this.multiple) return
        const {value} = this.keyMap
        return this.checked ? this.checked.map(n => n[value]) : []
      },
      filterNodeMethod() {
        const {label} = this.keyMap
        return typeof this.filter === 'function'
          ? this.filter
          : (value, data) => {
            if (!value) return true;
            return data[label].indexOf(value) !== -1;
          }
      },
      tags() {
        const {label, value} = this.keyMap
        return (this.checked || []).map(n => {
          let output = ''
          if (this.showFull) {
            const path = this.getCheckedPath(n[value])
            output = path && path.length ? path.map((item) => {
              return item[label]
            }).join('/') : n[label]
          } else {
            output = n[label]
          }
         return output
        })
      }
    },
    watch: {
      options: {
        immediate: true,
        handler(val) {
          if (this.useOriginOpts) {
            setTimeout(() => {
              this.optionsProxy = val
            }, 300)
          } else {
            this.optionsProxy = val
          }
        }
      },
      optionsTree: {
        immediate: true,
        handler(val) {
          if (this.value) {
            this.resetValueByOpts(this.value)
          }
        }
      },
      value: {
        immediate: true,
        handler(val) {
          this.resetValueByOpts(val)
        }
      },
      checked(val) {
        this.$emit('change', val)
      },
      query(val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      // 将value 进行回填，需要使用到options的数据，因此如果options的数据变化，也要执行一次。
      resetValueByOpts(val) {
        const {value} = this.keyMap
        if (isEqual(val, this.checked)) return
        // 若使用原装options 需要先将原装树转化为一维数组
        const _opts = this.useOriginOpts ? treeRevert(this.optionsProxy) : this.optionsProxy 
        if (this.multiple) {
          const vals = val ? [].concat(val) : [] 
          this.checked = _opts.filter(item => {
            return vals.includes(item[value])
          })
          // 重置tree组件
          this.$refs.tree && this.$refs.tree.setCheckedNodes(this.checked)
        } else {
          this.checked = _opts.find(item => {
            return val === item[value]
          })
        } 
      },
      handleCurrentChange(item, node) {
        if (this.multiple || item.disabled || this.readonly || this.disabled) return
        if (this.onlyLeaf && !node.isLeaf) return
        setTimeout(() => {
          this.checked = item
        }, 100)
        this.$emit('input', item[this.keyMap.value])
        this.$nextTick(() => {
          this.$refs.picker.visible = false
        })
      },
      handleCheckChange() {
        // 修复由于tree checkbox 变化导致频繁触发‘change’事件 的bug
        if (!this._timer) {
          this._timer = setTimeout(() => {
            this.checked = this.$refs.tree.getCheckedNodes()
            
            const {value} = this.keyMap
            let result
            if (this.onlyLeaf) {
              result = this.checked.filter((item) => {
                return !item.children
              }).map(n => n[value])
            } else {
              result = this.checked.map(n => n[value])
            }
            
            this.$emit('input', result)
            this._timer = null
          }, 100)
        }
      },
      handleRemove(index) {
        if (this.checked) {
          this.checked.splice(index, 1)
          const {value} = this.keyMap
          const keys = this.checked.map(n => n[value])
          this.$refs.tree.setCheckedNodes(keys)
          this.$emit('input', keys)
          this.$refs.picker.visible = false
        }
      },
      clearClickHandle() {
        this.checked = null
        this.$emit('input', '')
      },
      singleSelValShow() {
        if (this.checked) {
          if (this.showFull) { 
            const path = this.getCheckedPath(this.checked[this.keyMap.value])
            const output = path && path.length ? path.map((item) => {
              return item[this.keyMap.label]
            }).join('/') : this.checked[this.keyMap.label]
            return output
          } else { 
            return this.checked[this.keyMap.label]
          }
        } else {
          return ''
        }
      },
      getCheckedPath(value) {
        const treeChildrenProp = this.tree.props && this.tree.props.children || 'children'
        const path = findPath(this.optionsTree, (item, index, data) => {
          return item[this.keyMap.value] === value
        }, treeChildrenProp)
        return path
      }
    }
  }
</script>

