<template>
  <Form class="my-form"
        ref="elForm"
        v-bind="$attrs"
        v-on="$listeners"
        @submit.native.prevent
        :model="currentModel">
        <!-- @keyup.native.enter="submit" -->
    <slot></slot>
    <FormItem label=" " v-if="footer" class="my-form__footer" :class="footerClass">
      <slot name="footer">
        <Button v-if="submitText"
                type="primary"
                @click="submit"
                :loading="prevent && submitting">{{(prevent && submitting) ? submittingText : submitText}}
        </Button>
        <Button v-if="resetText" :disabled="prevent && submitting" type="default" @click="reset">{{resetText}}</Button>
        <slot name="actions"></slot>
        <Button v-if="collapsible"
                :disabled="prevent && submitting"
                type="text"
                @click="toggleCollapsed"
                class="my-form__collapse">
         <span>
           {{currentCollapsed ? '展开': '收起'}}
           <i
             :class="currentCollapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
           </span>
        </Button>
      </slot>

    </FormItem>
  </Form>
</template>

<script>
  /**
   * 表单组件
   * @module $ui/components/my-form
   */
  import {Form, FormItem, Button} from 'element-ui'
  import {cloneDeep, isEqual} from '$ui/utils/util'

  // const _set = require('lodash/set')

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，放置表单项
   * @property {string} actions 追加底部操作按钮
   * @property {string} footer重新定义整个底部内容，设置后，自带的提交、重置、收起/展开功能将失效
   */
  export default {
    name: 'MyForm',
    components: {
      Form,
      FormItem,
      Button
    },
    provide() {
      return {
        myForm: this
      }
    },
    /**
     * 属性参数
     * @member props
     * @property {Object} [model] 表单初始化数据模型，需要设置表单默认值或回填表单时使用
     * @property {string} [itemWidth] 表单项的宽度，默认自适应，支持任何css宽度设置
     * @property {boolean} [footer=true] 显示底部功能，设置false，自带的提交、重置、收起/展开功能将失效
     * @property {string} [footerAlign] 底部对齐方式，可选值：'left', 'right', 'center'
     * @property {String|Boolean} [submitText=提交] 提交按钮文本，false 时不显示提交按钮
     * @property {String} [submittingText=正在提交数据...] 正在提交时按钮文本, 需要设置 prevent=true 时才有效
     * @property {Function} [onSubmit] 提交表单回调函数，必须要返回Promise
     * @property {string} [resetText] 重置按钮文本，false 时不显示
     * @property {Boolean} [resetSubmitSuccess=false] 提交数据成功后，重置表单
     * @property {Boolean} [collapsible] 支持表单项展开、收起
     * @property {boolean} [collapsed=true] 初始收起表单项目，collapsible=true是才有效
     * @property {string} [collapseEffect] 展开、收起动画效果，transition 组件的 name属性
     * @property {boolean} [resetCollapsed] 收起时重置折叠的表单项
     * @property {boolean} [footerBlock] 底部另起一行显示
     * @property {boolean} [footerExpandBlock=true] 展开后底部另起一行显示,
     * @property {boolean} [footerFloat=false] 底部浮动右边，常在做筛选条件是使用
     * @property {Function} [loader] 加载数据函数, 必须返回Promise, 注意：如定义loader，所有表单项目都会回调，函数需要自己实现处理逻辑
     * @property {Object} [dictMap] 字典数据集合, 格式：{字典类型编码：字典列表}
     * @property {boolean} [prevent=true] 防止重复提交
     */

    /**
     * 继承 el-form事件， 任一表单项被校验后触发
     * @event validate
     * @param {*} value 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）
     */

    props: {
      // 表单模型数据
      model: Object,
      // 表单项的宽度，默认自适应
      itemWidth: String,
      // 显示底部
      footer: {
        type: Boolean,
        default: true
      },
      // 底部对齐方式
      footerAlign: {
        type: String,
        validator(val) {
          return ['', 'left', 'right', 'center'].includes(val)
        }
      },
      // 提交按钮文本，false 时不显示
      submitText: {
        type: [String, Boolean],
        default: '提交'
      },
      // 正在提交时按钮文本
      submittingText: {
        type: String,
        default: '正在提交数据...'
      },
      // 提交表单时回调函数，必须要返回Promise
      onSubmit: {
        type: Function
      },
      // 重置按钮文本，false 时不显示
      resetText: {
        type: [String, Boolean],
        default: '重置'
      },
      // 提交数据成功后，重置表单
      resetSubmitSuccess: Boolean,

      // 可折叠
      collapsible: Boolean,

      // 默认收起
      collapsed: {
        type: Boolean,
        default: true
      },
      // 折叠动画效果，transition 组件的 name属性
      collapseEffect: String,

      // 收起时重置表单项
      resetCollapsed: Boolean,

      // 底部另起一行显示
      footerBlock: Boolean,

      // 展开后底部另起一行显示
      footerExpandBlock: {
        type: Boolean,
        default: true
      },
      // 底部浮动右边，常在做筛选条件是使用
      footerFloat: Boolean,
      // 加载数据函数, 必须返回Promise, 注意：如在表单定义loader，所有表单项目都会回调，函数需要自己实现处理逻辑
      loader: Function,

      // 字典数据集合
      dictMap: Object,

      // 防止重复提交
      prevent: {
        type: Boolean,
        default: true
      }
    },
    data() {
      // 子表单项实例集合
      this.items = {}
      return {
        currentModel: {},
        // 正在提交
        submitting: false,
        // 当前的折叠状态
        currentCollapsed: true
      }
    },
    computed: {
      footerClass() {
        return {
          [`is-align-${this.footerAlign}`]: !!this.footerAlign,
          'is-block': this.footerBlock || (!this.currentCollapsed && this.footerExpandBlock),
          'is-float-right': this.footerFloat
        }
      }
    },
    watch: {
      model: {
        immediate: true,
        deep: true,
        handler(val) {
          // 如果两者相等，不修改，避免死循环
          if (!isEqual(val, this.currentModel)) {
            this.currentModel = cloneDeep(val || {})
          }
        }
      },
      collapsed: {
        immediate: true,
        handler(val) {
          this.currentCollapsed = val
        }
      },
      currentModel: {
        deep: true,
        handler(val, old) {
          if (isEqual(val, old)) return
          /**
           * 表单值改变时触发
           * @event change
           * @param {Object} model 表单模型数据
           */
          this.triggerChange(val)
        }
      },
      dictMap(val) {
        if (!val) return
        Object.keys(this.items).forEach(name => {
          const vm = this.items[name]
          const {dict, loader, options} = vm
          // 如果子组件没有设置 options 和 loader, 但有设置字典名称，用表单的字典数据填充到子组件
          if (!options && !loader && dict) {
            vm.currentOptions = val[dict] || []
          }

        })
      }
    },
    methods: {
      /**
       * 提交表单
       * @method submit
       */
      submit() {
        return new Promise((resolve, reject) => { 
          this.$refs.elForm.validate((valid, object) => {
            if (valid) {
              /**
               *  表单验证通过
               *  @event validate-success
               */
              this.$emit('validate-success')
              const model = cloneDeep(this.currentModel)
              if (this.onSubmit) {
                this.submitting = true
                this.onSubmit(model, this)
                  .then(() => {
                    // 提交表单成功后，重置
                    this.resetSubmitSuccess && this.reset()
                  })
                  .finally(() => {
                    this.submitting = false
                  })
              }
              /**
               * 表单提交时触发
               * @event submit
               * @param {object} model 表单模型数据
               * @param {VueComponent} vm 表单实例
               */
              this.$emit('submit', model, this)
              resolve(model)
            } else {
              /**
               *  表单验证不通过
               *  @event validate-fail
               *  @param {object} object 未通过校验的字段
               */
              this.$emit('validate-fail', object)
              reject(object)
            } 
          })
        })
      },
      /**
       * 重置表单
       * @method reset
       */
      reset() {
        this.currentModel = cloneDeep(this.getDefaultValue())
        this.$nextTick(() => {
          this.$refs.elForm && this.$refs.elForm.clearValidate()
          /**
           * 重置表单时触发
           * @event reset
           * @param {VueComponent} vm 表单实例
           */
          this.$emit('reset', this)
        })
      },
      toggleCollapsed() {
        this.currentCollapsed = !this.currentCollapsed
        this.$emit('collapse', this.currentCollapsed, this)
      },
      addItem(vm) {
        const {name} = vm
        if (!name) return
        if (name in this.items) {
          throw new Error(`表单中的项中 name：${name} 重复，请确保在同一个表单中保持唯一`)
        }
        this.items[name] = vm
      },
      removeItem(vm) {
        if (!vm.name) return
        delete this.items[vm.name]
      },
      getDefaultValue() {
        // const values = {}
        // Object.entries(this.items).forEach(([name, item]) => {
        //   values[name] = item.getDefaultValue()
        //   // _set(values, name, item.getDefaultValue())
        // })
        // return {...values, ...(this.model || {})}
        return cloneDeep(this.model || {})
      },
      triggerChange(val) {
        clearTimeout(this.changeTimer)
        this.changeTimer = setTimeout(() => {
          /**
           * 表单值改变时触发
           * @event change
           * @param {Object} model 表单模型数据
           */
          this.$emit('change', cloneDeep(val))
        }, 100)

      },
      setFormModel(data) {
        const currentModel = cloneDeep(this.currentModel)
        const newCurrentModel = {...currentModel, ...data}
        this.currentModel = newCurrentModel
      }
    }
  }
</script>
