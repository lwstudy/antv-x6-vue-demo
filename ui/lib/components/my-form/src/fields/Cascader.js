/**
 * 级联组件，继承Base
 * @module $ui/components/my-cascader
 */

import {Cascader} from 'element-ui'
import Base from '../Base'
import {create as createTree} from '$ui/utils/tree'

/**
 * 插槽
 * @member slots
 * @property {string} default 作用域插槽， 自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据
 */

export default {
  name: 'MyCascader',
  mixins: [Base],
  components: {
    Cascader
  },
  /**
   * 扩展参数
   * @member props
   * @property {*} [root] 数据项根节点的值
   * @property {boolean} [useOriginOpts] 是否使用原options作为参数, 默认false
   */
  props: {
    value: [Array, String, Number],
    // 树的根节点，parentId的值
    root: {
      type: [String, Number, Boolean],
      default: null
    },
    useOriginOpts: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentOptionsProxy: [] // currentOption 数据的代理，用于性能优化
    }
  },
  watch: {
    currentOptions: {
      immediate: true,
      handler(val) {
        // 如果使用 “正常树形数据” 则异步将数据赋值给代理变量，用于提高性能。
        if (this.useOriginOpts) {
          setTimeout(() => {
            this.currentOptionsProxy = val
          }, 300)
        } else {
          this.currentOptionsProxy = val
        }
      }
      
    }
  },
  methods: {
    getDefaultValue() {
      return []
    }
  },
  computed: {
    optionsTree() {
      if (this.useOriginOpts) {
        return this.currentOptionsProxy
      } else {
        const {id, parentId} = this.keyMap
        return createTree(this.currentOptionsProxy || [], this.root, id, parentId)
      }
    }
  },
  render() {
    const scopedSlots = this.$scopedSlots.default
      ? {
        default: (props) => {
          return this.$scopedSlots.default(props)
        }
        
      }
      : null;
    
    const vnode = (
      <Cascader ref="comp"
                class="my-cascader"
                {
                  ...{
                    props: this.innerProps,
                    on: {
                      ...this.$listeners
                    },
                    // attrs: this.innerProps,
                    scopedSlots: scopedSlots
                  }
                }
                options={this.optionsTree}
                vModel={this.fieldValue}>
        {this.createSlots(['empty'])}
      </Cascader>
    )
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['getCheckedNodes'])
  }
  
}
