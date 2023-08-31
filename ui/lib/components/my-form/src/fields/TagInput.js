/**
 * 标签输入框组件，继承Base
 * @module $ui/components/my-tag-input
 */

import TagInput from '../common/TagInput'
import Base from '../Base'

export default {
  name: 'MyTagInput',
  mixins: [Base],
  components: {
    TagInput
  },
  props: {
    value: Array,

    blurCreate: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getDefaultValue() {
      return []
    },
    handleChange(val) {
      if (val && val.length) {
        this.clearValidate()
      }
      this.$emit('change', val)
    }
  },
  computed: {
    inputSize() {
      if (this.size) return this.size
      if (this.myForm) {
        return this.myForm.$attrs.size || ''
      }
      return ''
    }
  },
  render() {
    const vnode = (
      <TagInput ref="comp"
                {...{
                  props: {
                    ...this.innerProps, 
                    size: this.inputSize, 
                    blurCreate: this.blurCreate,
                    allowCreate: this.allowCreate
                  },
                  on: {
                    ...this.$listeners,
                    change: this.handleChange
                  }
                }}
                size={this.inputSize}
                vModel={this.fieldValue}>
      </TagInput>
    )
    
    return this.renderComponent(vnode)
  },
  mounted() {
    this.extendMethods(this.$refs.comp, ['focus', 'blur'])
  }
}
