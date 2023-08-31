<template>
  <MyLayout class="my-crud" :north="{height:'auto'}" split :fit="fit">
    <template v-if="$slots.filter" v-slot:north>
      <MyContainer class="my-crud__filter">
        <MyFilter v-bind="filter"
                  :model="currentQuery"
                  @submit="handleFilterSubmit"
                  @reset="handleFilterReset">
          <slot name="filter"></slot>
        </MyFilter>
      </MyContainer>
    </template>

    <MyContainer :fit="fit">
      <MyTable ref="table"
               v-bind="tableProps"
               :columns="columns"
               :toolbar="!!(title||$slots.title||$slots.actions)"
               :fit="fit"
               :loader="loader"
               :title="title"
               header-background>
        <slot name="title" slot="title">{{title}}</slot>
        <slot name="toolbar" slot="actions"></slot>
        <template v-slot:_handle="{row, column, $index}">
          <Handlebar :handles="column.handles"
                     :theme="column.theme"
                     :size="tableProps.size"
                     :row="row"
                     @command="handleCommand($event, row, $index)"></Handlebar>
        </template>
        <template v-slot:[`_handle.header`]="scope">
          <slot name="handle-header" v-bind="scope">{{scope.column.label}}</slot>
        </template>

        <template v-for="col in propsSlots" v-slot:[col.prop]="scope">
          <slot :name="col.prop" v-bind="scope"></slot>
        </template>

      </MyTable>
    </MyContainer>
    <!-- 详情 -->
    <MyDialog v-if="currentRow && viewDialog!==null"
              v-bind="viewDialogProps"
              :visible.sync="viewVisible"
              target="body"
              :footer="null">
      <slot name="detail" :row="currentRow" :loading="loading">
        <Detail :data="currentRow" :loading="loading"></Detail>
      </slot>
    </MyDialog>

    <!-- 新增、编辑表单 -->
    <MyDialog class="my-crud-form-dialog"
              v-if="formDialog!==null"
              v-bind="formDialogProps"
              :visible.sync="formDialogVisible"
              :footer="null"
              target="body"
              :title="isEdit ? '编辑': '新增'">
      <MyForm v-bind="formProps" :model="currentRow" :on-submit="handleFormSubmit">
        <slot name="form" :row="currentRow" :loading="loading"></slot>
      </MyForm>
    </MyDialog>


  </MyLayout>
</template>

<script>
  /**
   *  增删查改 组件
   *  @module $ui/components/my-crud
   */

  import {MyLayout, MyContainer, MyFilter, MyTable, MyDialog, MyForm} from '$ui'
  import Handlebar from './Handlebar'
  import Detail from './Detail'

  // 分页组件默认参数
  const defaultPagination = {
    background: true,
    layout: 'total,sizes, ->, prev, pager, next',
    pageSizes: [10, 20, 50, 100]
  }

  // 详情弹窗默认参数
  const defaultViewDialog = {
    width: '80%',
    draggable: true,
    title: '详情',
    modal: true
  }

  // 新增、修改弹窗默认参数
  const defaultFormDialog = {
    width: '80%',
    draggable: true,
    modal: true
  }

  // 表单组件默认参数
  const defaultForm = {
    footerAlign: 'right'
  }

  /**
   * 插槽
   * @member slots
   * @property {string} filter 定义筛选条件，定义表单项
   * @property {string} title 定义表格标题区域内容
   * @property {string} toolbar 定义工具区内容
   * @property {string} handle-header 作用域插槽，定义操作列的列头，参数：column 列配置参数
   * @property {string} detail 作用域插槽，定义详情显示内容，参数：row 行数据对象，loading 加载中
   * @property {string} form 作用域插槽，定义新增、编辑表单项，参数：row 行数据（新增为null），loading 加载中
   *
   */
  export default {
    name: 'MyCrud',
    components: {
      MyLayout,
      MyContainer,
      MyFilter,
      MyTable,
      Handlebar,
      MyDialog,
      MyForm,
      Detail
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 标题，也可以用插槽定义
     * @property {boolean} [fit] 适配父容器
     * @property {Object} [filter] 筛选组件 MyFilter 配置参数
     * @property {Object} [query] 初始查询参数对象
     * @property {Object} [tableOptions] 表格组件 MyTable 配置参数
     * @property {Array} [columns] 列配置数组，字段支持el-table-column组件参数
     * @property {Function|Object} [adapter] 数据请求适配方法 函数必须返回对象 {fetch, add, update, remove, get, batch}
     * @property {Object} [viewDialog] 详情对话框配置参数， 设置null，表示自定义显示详情，不采用自带dialog
     * @property {Object} [formDialog] 新增、编辑弹窗配置参数，设置null 表示自定义，需要自己实现
     * @property {Object} [formOptions]  新增、编辑表单配置
     *
     */
    props: {
      title: String,
      fit: Boolean,
      // MyFilter配置参数
      filter: Object,

      // 初始查询参数对象
      query: Object,

      // 表格配置参数
      tableOptions: Object,

      // 表格列配置，
      // 扩增了 handle类型的列，
      // 配置参数 {type:'handle',label,theme:'button|text|icon', handles:[{view,edit,remove,text,icon,type,access}]}
      columns: Array,

      // 数据请求适配方法
      adapter: {
        type: [Function, Object],
        required: true,
        default() {
          return {
            fetch: null,
            add: null,
            update: null,
            remove: null,
            get: null,
            batch: null
          }
        }
      },

      // 详情对话框配置参数， 设置null，表示自定义显示详情，不采用自带dialog
      viewDialog: {
        type: Object
      },
      // 新增、编辑弹窗配置
      formDialog: {
        type: Object
      },
      // 新增、编辑表单配置
      formOptions: {
        type: Object
      }
    },
    data() {
      this.dataAdapter = null
      return {
        currentQuery: this.query,
        loading: false,
        currentRow: null,
        isEdit: false,
        viewVisible: false,
        formDialogVisible: false
      }
    },
    computed: {
      tableProps() {
        return {
          pagination: defaultPagination,
          ...this.tableOptions
        }
      },
      viewDialogProps() {
        return {
          ...defaultViewDialog,
          ...this.viewDialog
        }
      },
      formDialogProps() {
        return {
          ...defaultFormDialog,
          ...this.formDialog
        }
      },
      formProps() {
        return {
          ...defaultForm,
          ...this.formOptions
        }
      },
      propsSlots() {
        return (this.columns || []).filter(col => (!!col.prop && this.$scopedSlots[col.prop]))
      }
    },
    watch: {
      query: {
        immediate: true,
        handler(val) {
          this.currentQuery = val
        }
      }
    },
    methods: {
      /**
       * 打开新增弹窗
       * @method openAddDialog
       */
      openAddDialog() {
        // 必须要适配了添加方法，才能激活弹窗
        if (!this.dataAdapter.add) return
        const model = this.formOptions?.model || {}
        this.currentRow = Object.freeze({...model})
        this.isEdit = false
        this.formDialogVisible = true
      },
      emitError(type, message) {
        /**
         * 请求报错时触发
         * @event error
         * @param {string} type 请求方法名，如 fetch/get/update/remove/batch
         * @param {*} message 错误信息
         */
        this.$emit('error', type, message)
      },
      emitSuccess(type, message) {
        /**
         * 请求成功时触发
         * @event success
         * @param {string} type 请求方法名，如 fetch/get/update/remove/batch
         * @param {*} message 响应数据
         */
        this.$emit('success', type, message)
      },
      loader(page, limit) {
        if (!this.dataAdapter.fetch) {
          return Promise.reject(new Error('缺少fetch方法'))
        }
        return this.dataAdapter.fetch({
          page,
          limit,
          ...this.currentQuery
        }, this).then(res => {
          this.emitSuccess('fetch', res)
          return res
        })
          .catch(e => {
            this.emitError('fetch', e)
          })
      },
      getDetail({row, index}) {
        if (!this.dataAdapter.get) return
        this.loading = true
        this.dataAdapter.get({
          row,
          index
        })
          .then(res => {
            const model = this.formOptions?.model || {}
            this.currentRow = Object.freeze({
              ...model,
              ...row,
              ...res
            })
            this.emitSuccess('get', res)
          })
          .catch(e => {
            this.emitError('get', e)
          })
          .finally(() => {
            this.loading = false
          })
      },
      handleFilterSubmit(query) {
        this.currentQuery = Object.freeze(query)
        this.refresh()
      },
      handleFilterReset() {
        this.currentQuery = Object.freeze(this.query)
      },
      handleFormSubmit(row) {
        // 编辑
        if (this.isEdit) {
          return this.dataAdapter.update({
            row,
            index: 0
          })
            .then(res => {
              this.formDialogVisible = false
              this.currentRow = null
              this.reload()
              this.emitSuccess('update', res)
            })
            .catch(e => {
              this.emitError('update', e)
            })
        } else {
          // 新增
          return this.dataAdapter.add({
            row,
            index: 0
          })
            .then(res => {
              this.formDialogVisible = false
              this.refresh()
              this.emitSuccess('add', res)
            })
            .catch(e => {
              this.emitError('add', e)
            })
        }
      },
      handleCommand(handle, row, index) {
        this.currentRow = Object.freeze(row)

        // 查看详情
        if (handle.view) {
          this.$nextTick(() => {
            this.viewVisible = true
          })
          this.getDetail({
            row,
            index
          })
        }

        // 编辑
        if (handle.edit) {
          this.$nextTick(() => {
            this.isEdit = true
            this.formDialogVisible = true
          })
          this.getDetail({
            row,
            index
          })
        }

        // 删除
        if (handle.remove) {
          this.$confirm('此操作将删除该条数据，是否继续？', '提示', {
            type: 'warning'
          }).then(() => {
            this.dataAdapter.remove({
              row,
              index
            }).then(res => {
              this.currentRow = null
              this.reload()
              this.emitSuccess('remove', res)
            }).catch(e => {
              this.emitError('remove', e)
            })
          }).catch(e => {
          })
        }
        /**
         * 点击操作列按钮触发
         * @event command
         * @param {Object} handle 按钮配置
         * @param {Object} row 行数据
         * @param {number} index 行索引
         */
        this.$emit('command', handle, row, index)
      },
      /**
       * 重新加载表格数据，分页保持不变
       * @method reload
       */
      reload() {
        this.$refs.table.load()
      },
      /**
       * 重新加载表格数据，分页重置为第一页
       * @method refresh
       */
      refresh() {
        this.$refs.table.refresh(1)
      },
      batchRemove() {
        const elTable = this.$refs.table.$refs.elTable
        const {selection, rowKey} = elTable
        const rows = rowKey ? selection.map(item => item[rowKey]) : selection
        if (rows.length === 0) {
          this.$message.info('请勾选需要删除的数据！')
          return
        }
        const list = this.$refs.table.list
        const indexes = selection.map(row => list.findIndex(item => row === item))
        const message = this.$message({
          type: 'info',
          message: '正在执行批量删除...',
          duration: 0
        })
        this.dataAdapter.batch({
          rows,
          indexes
        }).then(res => {
          this.reload()
          this.emitSuccess('batch', res)
        }).catch(e => {
          this.emitError('batch', e)
        }).finally(() => {
          message.close()
        })
      }
    },
    created() {
      this.dataAdapter = typeof this.adapter === 'function'
        ? this.adapter(this)
        : this.adapter

    }
  }
</script>

