<template>
   
  <el-input class="my-at-input" :size="type === 'textarea' ? 'small' : size" v-model="useless">
    <template slot="append"> 
      <el-popover
      v-bind="{...popoverProps}"
      trigger="manual" 
      v-model="listVisible"> 
        <slot name="popover"></slot>
        <div  slot="reference" class="popup-btn" :style="{'left':`${popupLeft}px`, 'top': `${popupTop}px`}"></div>
      </el-popover>

      <div ref="contentEdit" :placeholder="placeholder" :class="['content-edit', 'el-input__inner', `${type}-type`]"  :contenteditable="true" @keydown="editHandle"  :style="{
        'width': `${maxWidth}px`,
        'max-width': `${maxWidth}px`, 
        ...contentEditStyle
      }"></div>

    </template>
  </el-input>
 
</template>

<script>
 /**
   * '@'人输入框组件
   * @author huangjiping 
   * @module $ui/components/my-at-input
   */
import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'
import {cloneDeep, debounce} from '$ui/utils/util'
const TextareaLineHeight = 36
const TagClassName = 'tag-span'
const DefaultPopoverProps = {
  placement: 'right-end',
  title: '标题',
  width: 400
}
/**
   * 插槽
   * @member slots
   * @property {string} popover 弹窗显示的内容 (放置用户列表)
   */
export default {
  name: 'MyAtInput',
  mixins: [],
  components: {},
  /**
   * 属性参数
   * @member props
   * @property {string} [value] v-model绑定的值
   * @property {string} [tagClassName] '@标签'的类名， 默认'tag-span'
   * @property {object} [popoverProps] popover的参数， 同el-popover
   * @property {string} [type] 表单类型，input(默认) / textarea
   * @property {number} [rows] 行数，在type为textarea时有效
   * @property {string} [size] medium, small, mini
   * @property {string} [placeholder] placeholder
   */
  props: {
    value: {
      type: String,
      default: ''
    },
    tagClassName: {
      type: String,
      default: TagClassName
    },
    popoverProps: {
      type: Object,
      default: () => {
        return DefaultPopoverProps
      }
    },
    type: {
      type: String,
      default: 'input',
      validator: function(v) {
        return ['textarea', 'input'].includes(v)
      }
    },
    rows: {
      type: Number,
      default: 4
    },
    size: {
      type: String,
      default: 'medium',
      validator: function(v) {
        return ['medium', 'small', 'mini'].includes(v)
      }
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      maxWidth: 280,
      useless: '',
      listVisible: false,
      lastSelection: {
        range: '',
        offset: '',
        selection: '',
        lastOffset: ''
      },
      popupLeft: 0,
      popupTop: 0,
      maxEditHeight: TextareaLineHeight,

      tagData: {},

      editContent: '',
      currentTagStr: '',
      contentChangeTimer: null
    }
  },
  computed: {
    contentEditStyle() {
      if (this.type === 'textarea') {
        return {height: `${TextareaLineHeight * this.rows}px`} 
      } else {
        return {}
      }
    }
  },
  watch: {
    editContent(val) {
      this.$emit('input', val)
      this.$nextTick(() => {
        this.defineLeaveData(val)
        /**
         * 输入框内容改变事件
         * @event on-popToggle
         * @param {string} 输入框内容
         * @param {string} 输入框内容(纯文本)
         * @param {object} 绑定的数据
         */
        this.$emit('change', val, this.$refs.contentEdit.innerText, this.tagData)
      })
    },
    listVisible(val) {
      /**
       * 弹框切换时事件
       * @event on-popToggle
       * @param {boolean} 真为打开假为关闭
       */
      this.$emit('on-popToggle', val)
      
    },
    currentTagStr(val) {
      /**
       * 标签内容改变事件
       * @event on-tagEdit
       * @param {string} ‘@’后面的编辑内容
       */
      this.$emit('on-tagEdit', val)
    }
  },
  methods: {
    editHandle(ev) {
      const selection = window.getSelection() 
      this.lastSelection.range = selection.getRangeAt(0)
      this.lastSelection.selection = selection
      this.lastSelection.lastOffset = selection.focusOffset 
      // 监听 键入‘@’时 的动作
      if (ev.code === 'Digit2' && ev.shiftKey) {  
        this.lastSelection.offset = selection.focusOffset
        setTimeout(() => {
          this._atKeyHandle()
        }, 200) 
      } 
      // 监听 回退删除 的动作
      if(ev.code === 'Backspace') { 
        this._backSpaceHandle()
      } 

      if(ev.code === 'Enter') { 
        this.listVisible = false
      } 
      
      // ------------------------
      if (this.contentChangeTimer) {
        clearTimeout(this.contentChangeTimer)
      }
      this.contentChangeTimer = setTimeout(() => {
        this.editContent = this.$refs.contentEdit.innerHTML 
      }, 200)
      // ------------------------
      if (this.listVisible) {
        const reg = /\s/g
        setTimeout(() => {
          const selection = window.getSelection()
          const atArr = this.lastSelection.range.endContainer.textContent.split('@')
          this.currentTagStr = atArr[atArr.length - 1] 
         
          if (reg.test(selection.focusNode.nodeValue[selection.focusOffset - 1])) {
            this.$nextTick(() => {
              this.currentTagStr = ''
              this.listVisible = false
            })
          } 
        }, 50)
      }
       
    },
    // '@' 字符键入时响应函数
    _atKeyHandle() { 
      const currentTextNode = this.lastSelection.selection.baseNode 
      const range = document.createRange()
      range.setStart(currentTextNode, 0)
      range.setEnd(currentTextNode, this.lastSelection.lastOffset)
      const ranngePosData = range.getBoundingClientRect()
      
      const width = ranngePosData.x + ranngePosData.width
      const top = ranngePosData.y
      this.popupLeft = width + 40
      this.popupTop = top
      this.listVisible = true
    },
    // 回退删除按键响应函数
    _backSpaceHandle() {
      const range = this.lastSelection.range 
      // 删除到'@'前一个字符时，弹框出现 
      if (range.endContainer.textContent[range.endContainer.textContent.length - 2] === '@') {
        this.listVisible = true
      }
      // 删除到'@'字符时，弹框关闭
      if (range.endContainer.textContent[range.endContainer.textContent.length - 1] === '@') {
        this.listVisible = false
      }

      let removeNode = null
      if (range.startOffset <= 1 && range.startContainer.parentElement.className !== this.tagClassName) {
        removeNode = range.startContainer.previousElementSibling
      }
    

      if (range.startContainer.parentElement.className === this.tagClassName) {
        removeNode = range.startContainer.parentElement
      }

      
      if (removeNode && removeNode.className === this.tagClassName) { 
        this.$refs.contentEdit.removeChild(removeNode)

        this.$emit('on-tagDelete', this.tagData[removeNode.id])
        delete this.tagData[removeNode.id] 
      }
    }, 
    
    _setMaxWidth() {
      this.maxWidth = this.$el.offsetWidth
    },
    /**
     * 插入标签调用函数
     * @method tagInsert
     * @params {object} data
     * @params {string} data.name '@标签'的展示名称(必填)
     * @params {object} data.data '@标签'绑定的数据(必填)
     * @params {string} data.id '@标签'的id，非必填，不填则随机生成id
     * @params {string} data.color '@标签'的字体颜色，非必填，不填则为蓝色
     */
    tagInsert(data) {
      if (data) { 
        const range = this.lastSelection.range 
        const textNode = range.startContainer
         
        range.setStart(textNode, this.lastSelection.offset)
        range.setEnd(textNode, this.lastSelection.offset + 1 + this.currentTagStr.length || 1)
        range.deleteContents() 

        const tagSpan = document.createElement('span')
        const spaceSpan = document.createElement('span')

        // 设置标签
        tagSpan.className = this.tagClassName
        tagSpan.style.color = data.color || '#409EFF'
        tagSpan.innerHTML = '@' + data.name
        spaceSpan.innerHTML = '&nbsp;'
        
        // 绑定数据
        const tagId = data.id ? data.id : `tag_${new Date().getTime()}`
        tagSpan.id = tagId
        this.tagData[tagId] = data.data

        const fragment = document.createDocumentFragment()

        let node = ''
        let lastNode = ''
        fragment.appendChild(tagSpan)
        while((node = spaceSpan.firstChild)) {
          lastNode = fragment.appendChild(node)
        }
        if (this.lastSelection.range && this.lastSelection.selection) { 
          this.lastSelection.range.insertNode(fragment)
          this.lastSelection.selection.extend(lastNode, 1)
          this.lastSelection.selection.collapseToEnd()
        } 
        this.editContent = this.$refs.contentEdit.innerHTML
        this.listVisible = false 
        this.currentTagStr = '' 
      } else {
        this.$message.danger('未设置绑定数据')
        this.listVisible = false
      } 
    },
    /**
     * 获取数据
     * @method getData
     * @return {object} total
     * @return {string} total.html 输入框内html
     * @return {string} total.text 输入框内纯文本
     * @return {string} total.data 绑定数据
     */
    getData() {
      return {
        html: this.$refs.contentEdit.innerHTML,
        text: this.$refs.contentEdit.innerText,
        data: this.tagData
      }
    },
    /**
     * 设置绑定数据
     * @method setData
     * @return {object} data 设置数据格式为 {[id]: {name: '', data: {...}}, ...}
     */
    setData(data) {
      this.tagData = cloneDeep(data)
    },
    /**
     * 手动设置弹窗开关
     * @method togglePopover
     * @params {boolean} flag popover开关参数
     */
    togglePopover(flag) {
      this.listVisible = flag
    },

    defineLeaveData(content) {
      for (const key in this.tagData) {
        if (content.indexOf(key) < 0) {
          delete this.tagData[key]
        }
      }
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this._setMaxWidth()
      this.maxEditHeight = this.$refs.contentEdit.offsetHeight
      this.$refs.contentEdit.innerHTML = this.value
      
      this._setMaxWidthProxy = debounce(this._setMaxWidth, 500)
      addResizeListener(this.$el, this._setMaxWidthProxy)
    }, 300)
    
  },
  beforeDestroy() {
    this._setMaxWidthProxy && removeResizeListener(this.$el, this._setMaxWidthProxy) 
  }
}
</script>