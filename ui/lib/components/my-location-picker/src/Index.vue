<template>
  <div class="my-location-picker">
    <span class="my-location-picker__trigger" @click="handleFocus">
      <slot name="trigger" :value="inputValue" :markers="markers">
            <ElInput v-bind="inputProps"></ElInput>
      </slot>
      </span>
    <MyDialog v-if="visible"
              v-bind="dialogProps"
              @close="visible=false"
              class="my-location-picker__dialog"
              @submit="handleSubmit">
      <MapContent ref="content"
                  :markers="markers"
                  :pin="pin"
                  :multiple="multiple"
                  :map="map">
        <slot :value="inputValue" :markers="markers"></slot>
      </MapContent>
    </MyDialog>
  </div>
</template>

<script>
  /**
   * 经纬度提取器组件
   * @module $ui/components/my-location-picker
   */
  import {MyDialog} from '$ui'
  import {Input} from 'element-ui'
  import MapContent from './MapContent'
  import defaultPin from '$ui/map/sources/pin/red.png'

  /**
   * 插槽
   * @member slots
   * @property {string} default 作用域插槽，定义地图覆盖物，数据：value、markers
   * @property {string} trigger 作用域插槽，定义触发区内容，默认是输入框，数据：value、markers
   */
  export default {
    name: 'MyLocationPicker',
    components: {
      MyDialog,
      MapContent,
      ElInput: Input
    },
    /**
     * 属性参数
     * @member props
     * @property {Array[]|Number[]} [value] 经纬度，multiple为true时，是一个二维数组，支持双向绑定
     * @property {Function} [format] 显示在输入框中的格式的构造函数
     * @property {Function} [valueFormat] 绑定值的格式的构造函数
     * @property {boolean} [multiple] 启用多选
     * @property {Object} [map] 地图组件MyMap配置参数
     * @property {Object} [dialog] 弹窗MyDialog配置参数
     * @property {Object} [input] 输入框ElInput配置参数
     * @property {string} [pin] 标记图片地址
     */
    props: {
      value: {
        type: Array
      },
      // 显示在输入框中的格式
      format: {
        type: Function,
        default: val => JSON.stringify(val)
      },
      // 绑定值的格式
      valueFormat: {
        type: Function,
        default: val => JSON.parse(val)
      },
      multiple: Boolean,
      map: Object,
      dialog: Object,
      // 输入框参数
      input: Object,
      pin: {
        type: String,
        default: defaultPin
      }
    },
    data() {
      return {
        visible: false,
        inputValue: '',
        markers: []
      }
    },
    computed: {
      inputProps() {
        return {
          value: this.inputValue,
          suffixIcon: 'el-icon-location-information',
          readonly: true,
          ...this.input
        }
      },
      dialogProps() {
        return {
          width: '80%',
          height: '80%',
          title: '经纬度提取器',
          target: 'body',
          modal: true,
          draggable: true,
          ...this.dialog
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val) {
            this.inputValue = this.format(val)
          } else {
            this.inputValue = ''
          }
        }
      },
      visible: {
        immediate: true,
        handler(val) {
          if (Array.isArray(this.value) && this.value.length > 0 && val) {
            const markers = !this.multiple ? [this.value] : this.value
            // 确保是一个二维数组
            this.markers = markers.slice(0)
          } else {
            this.markers = []
          }
        }
      }
    },
    methods: {
      handleFocus() {
        this.visible = true
      },
      handleSubmit() {
        const markers = this.$refs.content.currentMarkers.slice(0)
        const result = this.multiple ? markers : (markers[0] || [])
        this.inputValue = this.format(result)
        this.visible = false
        this.markers = markers
        this.$emit('input', result)
        /**
         * 输入框的值改变时触发
         * @event change
         * @param {Array} value
         */
        this.$emit('change', result)
      }
    }
  }
</script>
