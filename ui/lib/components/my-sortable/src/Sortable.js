import Sortable from 'sortablejs'
import {insertAfter} from '$ui/utils/dom'

export default {
  watch: {
    sortableConfig: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  computed: {
    sortableConfig() {
      return {
        animation: 150,
        ...this.options,
        onUpdate: e => {
          this.sort(e.oldIndex, e.newIndex)
          this.options.onUpdate && this.options.onUpdate(e)
        },
        onAdd: e => {
          this.add(e.from.__data__, e.item, e.oldIndex, e.newIndex)
          this.options.onAdd && this.options.onAdd(e)
        },
        onRemove: e => {
          this.remove(e.item, e.oldIndex)
          this.options.onRemove && this.options.onRemove(e)
        }
      }
    }
  },
  methods: {
    sort(oldIndex, newIndex) {
      const oldTemp = this.list[oldIndex]
      this.list.splice(oldIndex, 1)
      this.list.splice(newIndex, 0, oldTemp)
      this.$emit('update:data', this.list.slice(0))
      /**
       * 顺序变化时触发
       */
      this.$emit('update', this.list.slice(0))
      /**
       * 数据改变时触发
       */
      this.$emit('change', this.list.slice(0))
    },
    add(fromData, element, oldIndex, newIndex) {
      const newItem = fromData[oldIndex]
      this.list.splice(newIndex, 0, newItem)
      Array.from(this.$el.children).forEach(el => {
        if (el === element) {
          this.$el.removeChild(el)
        }
      })
      this.$emit('update:data', this.list.slice(0))
      /**
       * 新增时触发
       */
      this.$emit('add', newItem, newIndex)
      /**
       * 数据改变时触发
       */
      this.$emit('change', this.list.slice(0))
    },
    remove(element, oldIndex) {
      this.list.splice(oldIndex, 1)
      
      const children = this.$el.children
      if (children.length > 0) {
        oldIndex > 0
          ? insertAfter(element, children[oldIndex - 1])
          : this.$el.insertBefore(element, children[0])
      } else {
        this.$el.appendChild(element)
      }
      this.$emit('update:data', this.list.slice(0))
      /**
       * 删除时触发
       */
      this.$emit('remove', oldIndex)
      /**
       * 数据改变时触发
       */
      this.$emit('change', this.list.slice(0))
    },
    setOptions(opts) {
      this.sortable && this.sortable.option(opts)
    },
    reset() {
      const order = this.list.map((n, index) => index.toString())
      this.sortable && this.sortable.sort(order)
      this.$el.__data__ = this.list
    },
    init() {
      this.sortable && this.sortable.destroy()
      this.sortable = new Sortable(this.$el, this.sortableConfig)
      this.$el.__data__ = this.list
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.sortable && this.sortable.destroy()
    this.$el.__data__ = null
  }
}
