<template>
  <el-card class="my-login"
           v-bind="$attrs"
           :style="styles"
           :class="classes">
    <div v-if="logo" class="my-login__logo">
      <slot name="logo">
        <img :src="logo" alt="">
      </slot>
    </div>
    <div v-if="title" class="my-login__title">
      <slot name="title">{{title}}</slot>
    </div>
    <my-form class="my-login__form"
             ref="form"
             :rules="mergeRules"
             @submit="handleSubmit"
             :footer="null">
      <my-input :props="{prefixIcon:'el-icon-user'}"
                class="my-login__input"
                :disabled="loading"
                :name="keyMap.account"
                :placeholder="accountPlaceholder"></my-input>
      <my-input :props="{prefixIcon:'el-icon-lock',type:'password'}"
                class="my-login__input"
                :disabled="loading"
                :name="keyMap.password"
                :placeholder="passwordPlaceholder"></my-input>
      <div v-if="$slots.extra" class="my-login__extra">
        <slot name="extra"></slot>
      </div>
    </my-form>

    <el-row class="my-login__action" :gutter="10">
      <el-col :span="actionSpan">
        <el-button type="primary" :loading="loading" @click="submit">登录</el-button>
      </el-col>
      <el-col v-if="pki" :span="actionSpan">
        <el-button type="success" class="my-login__pki" @click="handlePki">PKI</el-button>
      </el-col>
    </el-row>
    <slot name="footer"></slot>
  </el-card>
</template>

<script>
  /**
   * 通用登录组件
   * @module $ui/components/my-login
   */
  /**
   * 插槽
   * @member slots
   * @property {string} logo 定义logo
   * @property {string} title 定义标题
   * @property {string} extra 表单额外内容
   * @property {string} footer 底部内容
   */
  export default {
    name: 'MyLogin',
    /**
     * 属性参数, 继承 el-card 全部属性参数
     * @member props
     * @property {string} [logo] logo地址
     * @property {string} [title] 标题文本
     * @property {boolean} [pki] 显示pki按钮
     * @property {boolean} [transparent] 透明背景
     * @property {string} [width=400px] 宽度
     * @property {object} [keyMap] 字段映射 {account,password}
     * @property {function} [login] 登录函数，必须要返回Promise
     * @property {boolean} [center] 居中
     * @property {string} [accountPlaceholder=登录账号]
     * @property {string} [passwordPlaceholder=登录密码]
     * @property {Object} [rules] 表单验证配置
     */
    props: {
      logo: {
        type: String,
        default() {
          return require('$ui/assets/xdh.png')
        }
      },
      title: {
        type: String,
        default: '新德汇前端基础框架'
      },
      // 开启pki功能
      pki: Boolean,
      // 显示背景色
      transparent: Boolean,

      width: {
        type: String,
        default: '400px'
      },
      keyMap: {
        type: Object,
        default() {
          return {
            account: 'account',
            password: 'password'
          }
        }
      },
      login: Function,
      // 水平 垂直居中
      center: Boolean,
      accountPlaceholder: {
        type: String,
        default: '登录账号'
      },
      passwordPlaceholder: {
        type: String,
        default: '登录密码'
      },
      rules: Object
    },
    data() {
      return {
        loading: false
      }
    },
    computed: {
      mergeRules() {
        const {account, password} = this.keyMap
        return {
          [account]: [{
            required: true,
            message: '请输入登录账号'
          }],
          [password]: [{
            required: true,
            message: '请输入登录密码'
          }],
          ...this.rules
        }
      },
      styles() {
        return {
          width: this.width
        }
      },
      classes() {
        return {
          'is-transparent': this.transparent,
          'is-center': this.center
        }
      },
      actionSpan() {
        return this.pki ? 12 : 24
      }
    },
    methods: {
      handleSubmit(model) {
        if (this.login) {
          this.loading = true
          this.login(model)
            .then(res => {
              this.$message.success('登录成功！')
              /**
               * 登录成功时触发
               * @event success
               * @param res 成功响应数据
               */
              this.$emit('success', res)
              return res
            })
            .catch(e => {
              this.$message.error(e.message || e.msg || '登录失败！')
              /**
               * 登录失败时触发
               * @event success
               * @param e 错误信息
               */
              this.$emit('error', e)
            }).finally(_ => {
            this.loading = false
          })
        }
        /**
         * 表单提交时触发
         * @event submit
         * @param model 提交数据
         */
        this.$emit('submit', model)
      },
      handlePki() {
        /**
         * 点击PKI按钮时触发
         * @event pki
         */
        this.$emit('pki')
      },
      /**
       * 提交表单
       * @method submit
       */
      submit() {
        this.$refs.form.submit()
      }
    }
  }
</script>

