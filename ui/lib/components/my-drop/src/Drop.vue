<template>
  <div class="my-drop"
       :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * MyDrop 放置组件
   * @module $ui/components/my-drop
   */
  import bus from '$ui/utils/bus'
  import {on, off} from 'element-ui/lib/utils/dom'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义内容
   */

  export default {
    name: 'MyDrop',
    /**
     * 属性参数
     * @member props
     * @property {String|Array} [accept] 可放置的拖拽实例名称，与MyDrag的group参数值对应
     * @property {Boolean} [disabled] 是否禁用
     * @property {String} [activeClass] 激活时自定义样式
     * @property {String} [enterClass] 拖拽进入时自定义样式
     * @property {Boolean} [activeHighlight] 激活时高亮
     * @property {Boolean} [enterHighlight] 进入时高亮
     * @property {Boolean} [prevent] 是否阻止放置事件传播, my-drop 允许嵌套，为true时，子组件触发drop，不会传播给父组件
     */
    props: {
      // 设置可放置的draggable分组名称，字符串或数组
      accept: [String, Array],
      // 是否禁用
      disabled: Boolean,
      // 激活时自定义样式
      activeClass: String,
      // 拖拽进入时自定义样式
      enterClass: String,
      // 激活时高亮
      activeHighlight: Boolean,
      // 进入时高亮
      enterHighlight: Boolean,
      // 是否阻止放置事件传播
      prevent: Boolean

    },
    data() {
      this.dropChildren = []
      return {
        enter: false,
        rect: null,
        dragging: null
      }
    },
    computed: {
      acceptDragArray() {
        return this.accept ? [].concat(this.accept) : []
      },
      classes() {
        return {
          'is-active': this.active,
          'is-disabled': this.disabled,
          'is-enter': this.enter,
          'my-drop--active-highlight': (this.active && this.activeHighlight),
          'my-drop--enter-highlight': (this.enter && this.enterHighlight),
          [`${this.activeClass}`]: (this.activeClass && this.active),
          [`${this.enterClass}`]: (this.enterClass && this.enter)
        }
      },
      active() {
        // 禁用，不激活
        if (this.disabled) return false
        // 无拖拽，不激活
        if (!this.dragging) return false
        const group = this.dragging.group
        // 有拖拽，拖拽没设置分组名称，并且 放置没设置接收，即激活
        if (!group && this.acceptDragArray.length === 0) return true
        // 有拖拽，放置设置的接收包含拖拽分组名称，即激活
        return this.acceptDragArray.includes(group)
      }
    },
    methods: {
      handleDragStart(vm) {
        if (this.disabled) return

        this.dragging = vm
        this.setRect()
      },
      handleDragDragging(vm) {
        // 未进入，如果拖拽元素在可放置范围内，即时进入
        if (!this.enter && this.validate(vm)) {
          this.enter = true
          /**
           * 拖拽进入放置区时触发
           * @event enter
           * @param {VueComponent} drag 拖拽实例
           * @param {VueComponent} drop 放置实例
           */
          this.$emit('enter', this.dragging, this)
        }

        // 已进入，如果拖拽元素不在可放置范围内，即离开
        if (this.enter && !this.validate(vm)) {
          this.enter = false
          /**
           * 拖拽离开放置区时触发
           * @event leave
           * @param {VueComponent} drag 拖拽实例
           * @param {VueComponent} drop 放置实例
           */
          this.$emit('leave', this.dragging, this)
        }

        // 已进入 触发 move
        if (this.dragging && this.validate(vm)) {
          /**
           * 在放置区移动时触发
           * @event over
           * @param {VueComponent} drag 拖拽实例
           * @param {VueComponent} drop 放置实例
           */
          this.$emit('over', this.dragging, this)
        }
      },
      handleDragStop(vm) {
        // 触发放置
        if (this.enter && this.dragging) {
          // 设置 my-drag 成功放置
          vm.dropped = true
          /**
           * 放置时触发
           * @event drop
           * @param {VueComponent} drag 拖拽实例
           * @param {VueComponent} drop 放置实例
           */
          this.$emit('drop', this.dragging, this)
          this.enter = false
        }
        this.dragging = null
        this.rect = null
      },
      setRect() {
        if (this.rect) return
        this.rect = this.$el.getBoundingClientRect()
      },
      /**
       * 检测拖拽元素是否在可放置范围内
       * @param x
       * @param y
       * @return {boolean}
       */
      validate({clientX, clientY}) {
        if (!this.active) return false
        if (!this.rect) return false
        const matchChild = this.dropChildren.find(item => item.enter)
        // 如果已进入子组，父组件标识离开
        if (this.prevent && matchChild) {
          return false
        } else {
          const {left, top, width, height} = this.rect
          return clientX > left && clientX < left + width && clientY > top && clientY < top + height
        }


      },
      bindEventBus() {
        bus.$on('my-drag:start', this.handleDragStart)
        bus.$on('my-drag:dragging', this.handleDragDragging)
        bus.$on('my-drag:stop', this.handleDragStop)
      },
      unbindEventBus() {
        bus.$off('my-drag:start', this.handleDragStart)
        bus.$off('my-drag:dragging', this.handleDragDragging)
        bus.$off('my-drag:stop', this.handleDragStop)
      },
      getParent() {
        let parent = this.$parent
        while (parent && parent.$options.name !== 'MyDrop') {
          parent = parent.$parent
        }
        return parent
      }
    },
    created() {
      this.parent = this.getParent()
      // 在父组件中引用自己
      if (this.parent) {
        this.parent.dropChildren.push(this)
      }
      this.bindEventBus()
    },
    mounted() {
      this.document = window.document
      on(this.document, 'mousemove', this.handleMouseMove)
    },
    beforeDestroy() {
      this.unbindEventBus()
      if (this.document) {
        off(this.document, 'mousemove', this.handleMouseMove)
        this.document = null
      }
      // 在父组件中清除自己的引用
      if (this.parent) {
        this.parent.dropChildren = this.parent.dropChildren.filter(item => item !== this)
      }

    }
  }
</script>
