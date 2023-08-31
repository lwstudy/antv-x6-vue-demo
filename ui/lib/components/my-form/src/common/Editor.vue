<template>
  <div class="my-editor" :id="componentId">
    <textarea ref="textarea" v-model="currentValue" style="display: none;"></textarea>
  </div>
</template>

<script>
  /**
   * 富文本编辑器
   *
   */

  import CKEditor from '@ckeditor/ckeditor5-build-classic'
  import UploadAdapter from './UploadAdapter'
  import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'

  const Toolbars = {
    simple: [
      'bold',
      'italic',
      'bulletedList',
      'numberedList'
    ],
    classic: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'imageUpload',
      'blockQuote',
      'insertTable'
    ],
    all: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
    ]
  }

  /**
   * 上传的文件转换成base64
   * @private
   * @param loader
   * @return {Promise<any>}
   */
  function fileToBase64(loader) {
    return new Promise((resolve, reject) => {
      if (!window.FileReader) {
        return reject(new Error('浏览器不支持FileReader'))
      }
      const reader = new FileReader()
      reader.onload = function (e) {
        loader.uploadTotal = e.total;
        loader.uploaded = e.loaded;
        resolve({
          default: reader.result
        })
      }
      reader.onerror = function (e) {
        reject(e)
      }
      loader.file.then(file => {
        reader.readAsDataURL(file)
      })
    })
  }


  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: [String, Array],
        default: 'classic',
        validator(val) {
          return Array.isArray(val) || ['simple', 'classic', 'all'].includes(val)
        }
      },
      // ckeditor5 配置
      config: {
        type: Object,
        default() {
          return {
            language: 'zh-cn'
          }
        }
      },
      height: {
        type: Number
      },
      // 图片上传方法，需要返回Promise
      upload: {
        type: Function
      },
      readonly: Boolean,
      disabled: Boolean
    },
    data() {
      this.ckeditor = null
      this.styleElement = null
      return {
        currentValue: this.value
      }
    },
    computed: {
      ckeditorConfig() {
        return {
          toolbar: Toolbars[this.toolbar] || this.toolbar,
          ...this.config
        }
      },
      componentId() {
        return `my-editor-${this._uid}`
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          this.currentValue = val
        }
      },
      currentValue(val) {
        this.$emit('input', val)
        /**
         * 内容变化时触发
         * @event on-change
         * @param {string} val 新内容
         */
        this.$emit('change', val)
      },
      height: {
        immediate: true,
        handler(val) {
          val && this.setStyle(val)
        }
      },
      readonly(val) {
        if (this.ckeditor) {
          this.ckeditor.isReadOnly = val
        }
      },
      disabled(val) {
        if (this.ckeditor) {
          this.ckeditor.isReadOnly = val
        }
      }
    },
    methods: {
      init() {
        CKEditor.create(this.$refs.textarea, this.ckeditorConfig)
          .then(editor => {
            this.ckeditor = editor
            this.ckeditor.isReadOnly = this.readonly || this.disabled
            this.ckeditor.plugins.get('FileRepository').createUploadAdapter = loader => {
              return new UploadAdapter(loader, this.upload || fileToBase64)
            }
            this.bindEvents(editor)
          }).catch(e => {
          console.error('init CKEditor error', e)
        })
      },
      bindEvents(editor) {
        editor.model.document.on('change:data', () => {
          this.currentValue = this.getData()
        })
        editor.editing.view.document.on('focus', evt => {
          this.$emit('focus', evt, editor)
        })

        editor.editing.view.document.on('blur', evt => {
          this.$emit('blur', evt, editor)
        })
      },
      /**
       * 获取编辑器内容
       * @function getData
       * @return {*}
       */
      getData() {
        if (this.ckeditor) {
          return this.ckeditor.getData()
        }
        return null
      },
      /**
       * 设置编辑器内容
       * @function setData
       * @param {string} val 文本
       */
      setData(val) {
        this.currentValue = val
        this.ckeditor && this.ckeditor.setData(val)
      },
      setStyle(height) {
        // 由于 ckeditor 没有参数和接口调整编辑器的高度，这里采用在页面加载css来实现设置制定高度
        if (!this.styleElement) {
          this.styleElement = document.createElement('style')
          document.getElementsByTagName('head')[0].appendChild(this.styleElement)
        }
        this.styleElement.innerText = `#${this.componentId} .ck-content {height: ${height}px; }`
      }
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      // 销毁样式元素
      if (this.styleElement) {
        this.styleElement.parentNode.removeChild(this.styleElement)
      }
      // 销毁 ckeditor
      this.ckeditor && this.ckeditor.destroy()
      this.ckeditor = null
    }
  }
</script>
