import Sortable from 'sortablejs'

const defaultSortableOptions = {
  forceFallback: true,
  animation: 150,
  ghostClass: 'my-table__ghost',
  fallbackClass: 'my-table__fallback'
}

export default {
  props: {
    // 列拖动参数
    columnSortable: {
      type: [Object, Boolean],
      default: false
    },
    // 行拖动参数
    rowSortable: {
      type: [Object, Boolean],
      default: false
    }
  },
  data() {
    this.rowSortableInstance = null
    this.columnSortableInstance = null
    this.removeColumnIndex = null
    return {
      rendered: true
    }
  },
  computed: {
    rowSortableOptions() {
      return this.rowSortable
        ? {
          ...defaultSortableOptions,
          ...this.rowSortable,
          onStart: this.onRowStart,
          onUpdate: this.onRowUpdate,
          onAdd: this.onRowAdd,
          onRemove: this.onRowRemove
        }
        : null
    },
    columnSortableOptions() {
      return this.columnSortable
        ? {
          ...defaultSortableOptions,
          ...this.columnSortable,
          filter: '.my-table__col-ignore',
          onStart: this.onColumnStart,
          onUpdate: this.onColumnUpdate,
          onAdd: this.onColumnAdd,
          onRemove: this.onColumnRemove
        }
        : null
    }
  },
  methods: {
    initSortable() {
      this.rowSortableOptions && this.initRowSortable()
      this.columnSortableOptions && this.initColumnSortable()
    },
    destroySortable() {
      this.rowSortableInstance && this.rowSortableInstance.destroy()
      this.rowSortableInstance = null
      this.columnSortableInstance && this.columnSortableInstance.destroy()
      this.columnSortableInstance = null
    },
    reRenderTable() {
      this.rendered = false
      this.destroySortable()
      this.$nextTick(() => {
        this.rendered = true
        this.$nextTick(this.initSortable)
      })
    },
    initRowSortable() {
      const tbody = this.$refs?.elTable?.$refs?.bodyWrapper?.getElementsByTagName('tbody')[0]
      if (!tbody) return
      this.rowSortableInstance = new Sortable(tbody, this.rowSortableOptions)
    },
    onRowStart(e) {
      const list = this.isVirtual ? this.viewItems : this.list
      e.item.__data__ = list[e.oldIndex]
    },
    onRowUpdate(e) {
      const list = [
        ...(this.isVirtual ? this.viewItems : this.list)
      ]
      const {newIndex, oldIndex} = e
      const oldTemp = list[oldIndex]
      list.splice(oldIndex, 1)
      list.splice(newIndex, 0, oldTemp)
      if (this.isVirtual) {
        this.viewItems = list
      } else {
        this.list = Object.freeze(list)
      }
      this.$emit('row-sort', list, e)
    },
    onRowAdd(e) {
      const item = e.item.__data__
      const list = [
        ...(this.isVirtual ? this.viewItems : this.list)
      ]
      list.splice(e.newIndex, 0, item)
      if (this.isVirtual) {
        this.viewItems = list
      } else {
        this.list = Object.freeze(list)
      }
      e.item.__data__ = null
      this.$emit('row-add', list, e)
    },
    onRowRemove(e) {
      const list = [
        ...(this.isVirtual ? this.viewItems : this.list)
      ]
      list.splice(e.oldIndex, 1)
      if (this.isVirtual) {
        this.viewItems = list
      } else {
        this.list = Object.freeze(list)
      }
      this.$emit('row-remove', list, e)
    },
    initColumnSortable() {
      const tr = this.$refs?.elTable?.$refs?.tableHeader?.$el.getElementsByTagName('tr')[0]
      if (!tr) return
      this.columnSortableInstance = new Sortable(tr, this.columnSortableOptions)
    },
    onColumnStart(e) {
      e.item.__data__ = this.displayColumns[e.oldIndex]
      this.removeColumnIndex = e.oldIndex
    },
    onColumnUpdate(e) {
      const columns = [...this.columnsProxy]
      const {newIndex, oldIndex} = e
      const oldColIndex = columns.findIndex(n => n === this.displayColumns[oldIndex])
      const newColIndex = columns.findIndex(n => n === this.displayColumns[newIndex])
      const oldTemp = columns[oldColIndex]
      columns.splice(oldColIndex, 1)
      columns.splice(newColIndex, 0, oldTemp)
      this.columnsProxy = columns
      this.$emit('column-sort', columns, e)
    },
    onColumnAdd(e) {
      const item = e.item.__data__
      const columns = [...this.columnsProxy]
      const newColIndex = columns.findIndex(n => n === this.displayColumns[e.newIndex])
      columns.splice(newColIndex, 0, item)
      this.columnsProxy = columns
      this.resetDisplayColumns()
      this.reRenderTable()
      e.item.__data__ = null
      this.$emit('column-add', columns, e)
    },
    onColumnRemove(e) {
      const columns = [...this.columnsProxy]
      const oldColIndex = columns.findIndex(n => n === this.displayColumns[this.removeColumnIndex])
      columns.splice(oldColIndex, 1)
      this.columnsProxy = columns
      this.resetDisplayColumns()
      this.reRenderTable()
      this.removeColumnIndex = null
      this.$emit('column-remove', columns, e)
    },
    headerCellClassName({row, column, rowIndex, columnIndex}) {
      const func = this.$attrs.headerCellClassName || this.$attrs['header-cell-class-name'] || ''
      const col = this.displayColumns[columnIndex]
      if (!col) return
      const filter = (col.ignore || col.fixed || col.type) ? 'my-table__col-ignore' : ''
      if (typeof func === 'function') {
        return [func({row, column, rowIndex, columnIndex}), filter].join(' ')
      } else {
        return [filter, func].join(' ')
      }
    }
  },
  mounted() {
    this.initSortable()
  },
  beforeDestroy() {
    this.destroySortable()
  }
}
