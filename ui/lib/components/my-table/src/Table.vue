<template>
  <div class="my-table" :class="classes">
    <MySpin v-bind="spin" fit :loading="isPager && currentLoading">
      <Toolbar v-if="toolbar" ref="toolbar" :title="title" :size="$attrs.size">
        <slot name="title" slot="title"></slot>
        <slot name="actions" slot="actions"></slot>
      </Toolbar>
      <div class="my-table__wrapper" :style="{height:tableHeight}">
        <slot name="prepend"></slot>
        <ElTable ref="elTable"
                 v-if="rendered"
                 v-bind="$attrs"
                 v-on="$listeners"
                 :data="isVirtual ? viewItems : list"
                 :header-cell-class-name="headerCellClassName"
                 :height="tableHeight ? '100%' : null">
          <template v-if="rendered">
            <template v-for="(col, index) in displayColumns">
              <!-- col 没有children 属性 -->
              <TableColumn
                          v-if="!col.children"
                          :key="`${col.prop}_${col.type}_${index}`"
                          v-bind="col"
              >
                <template v-if="col.type==='handle' || ( col.prop && $scopedSlots[col.prop])" v-slot="scope">
                  <!-- 自定义字段 插槽-->
                  <slot :name="col.prop || '_handle'" v-bind="scope" :column="col" :startIndex="startIndex"></slot>
                </template>

                <template v-if="col.type==='handle' || (col.prop && $scopedSlots[`${col.prop}.header`])"
                          v-slot:header="scope">
                  <!-- 自定义字段表头 插槽-->
                  <slot :name="`${col.prop||'_handle'}.header`" v-bind="{column:col, $index:index, ...scope}">
                    {{col.label}}
                  </slot>
                </template> 
              </TableColumn>

              <!-- col 有children 属性， 直接返回slot插槽 -->
              <slot v-else :name="col.prop" :column="col" ></slot>
 
            </template> 

            <TableColumn v-if="columnFilter" :resizable="false" width="24px" class-name="my-table--not-drag"
                         fixed="right">
              <ColumnFilter slot="header" :columns="columns" v-model="displayColumnProps" v-bind="$attrs" @column-change-confirm="colChangeConfirm" 
              @column-change-reset="resetDisplayColumns">
                <slot name="filter-confirm"></slot>
              </ColumnFilter>
            </TableColumn>
          </template>
          <template v-slot:append>
            <!-- 表格底部内容 插槽-->
            <slot name="append"></slot>
            <!-- 滚动加载loading 插槽-->
            <div v-if="isScroll && currentLoading" class="my-table__skeleton">
              <slot name="skeleton">加载中...</slot>
            </div>

            <div v-if="isScroll && !currentLoading && isNoMore" class="my-table__complete">
              <!-- 滚动加载完成提示 插槽-->
              <slot name="complete">没有更多了</slot>
            </div>
          </template>

          <!-- 自动无数据提示 插槽-->
          <slot name="empty" slot="empty"></slot>

        </ElTable>
      </div>
      <Pagination v-if="isPager && pagination!==null && currentTotal"
                  ref="pager"
                  v-bind="pagerProps"
                  :total="currentTotal"
                  :currentPage="currentPage"
                  class="my-table__pager"
                  @size-change="handlePageSizeChange"
                  @current-change="handlePageChange"></Pagination>
    </MySpin>
  </div>
</template>

<script>
  /**
   * 表格组件, 扩展el-table
   * @module $ui/components/my-table
   */


  import {Table, TableColumn, Pagination} from 'element-ui'
  import {getStyle} from 'element-ui/lib/utils/dom'
  import {MySpin} from '$ui'
  import Pager from './Pager'
  import Scroll from './Scroll'
  import Virtual from './Virtual'
  import Toolbar from './Toolbar'
  import ColumnFilter from './ColumnFilter'
  import Sortable from './Sortable'

  /**
   * 插槽
   * @member slots
   * @property {string} title 定义标题
   * @property {string} actions 定义操作区工具按钮
   * @property {string} toolbar 定义工具区内容，设置toolbar， title和actions将失效
   * @property {string} prepend 定义表格前的内容
   * @property {string} append 定义表格底部内容，与el-table append 插槽一致
   * @property {string} empty 定义无数据是显示内容，与与el-table empty 插槽一致
   * @property {string} $prop 作用域插槽，自定义列显示内容，$prop是动态值，表示字段名称，即el-table-column组件的prop参数值，与el-table-column的默认插槽一致
   * @property {string} $prop.header 作用域插槽 定义列头显示，与el-table-column的header插槽一致
   * @property {string} skeleton 定义滚动加载表格的loading效果
   * @property {string} complete 定义滚动加载表格加载到没有更多时的效果
   */

  export default {
    name: 'MyTable',
    mixins: [Pager, Scroll, Virtual, Sortable],
    components: {
      ElTable: Table,
      TableColumn: TableColumn,
      Pagination: Pagination,
      MySpin,
      Toolbar,
      ColumnFilter
    },
    /**
     * 属性参数
     * @member props
     * @property {string} [title] 表格标题
     * @property {boolean} [toolbar] 显示工具条，需要开启toolbar， title才有效
     * @property {boolean} [headerBackground] 表格头显示背景色
     * @property {Array} [data] 表格数据，可通过data 或 loader 参数为表格加载数据
     * @property {Array} [columns] 表格列配置，支持全部el-table-column组件的参数，扩展支持设置 display 默认位true，在columnFilter=true时有效 如果要用插槽定义内容，必须要设置prop
     * @property {boolean} [columnFilter] 开启列筛选功能
     * @property {string} [mode=pager] 模式，支持页码分页、滚动分页、虚拟列表 三种，可选值：'pager', 'scroll', 'virtual'
     * @property {boolean} [loading] 显示加载中
     * @property {Object} [spin] 加载中的MySpin组件配置参数
     * @property {boolean} [fit] 适应父容器
     * @property {number} [page=1] 初始页码
     * @property {number} [pageSize=10] 初始每页显示几条
     * @property {number} [total=0] 记录总数
     * @property {Object} [pagination] 分页组件el-pagination的其他配置
     * @property [Function] [loader] 数据加载函数，参数：page，pageSize, 必须返回Promise
     * @property {boolean} [auto] 初始化是否自动调用loader，如果需要手动调用设置为false
     * @property {number} [scrollDelay=200] 滚动加载节流时延，单位为ms
     * @property {number} [scrollDistance=0] 滚动加载模式，触发加载的距离阈值，单位为px
     * @property {number} [itemHeight] 虚拟列表模式，行的高度
     * @property {Object | Boolean} [columnSortable = false] 是否启用列拖拽排序, 可以配置Sortable个性化参数
     * @property {Object | Boolean} [rowSortable = false] 是否启用行拖拽排序, 可以配置Sortable个性化参数
     * @property {Boolean} [freeze=true] 冻结列表数据数组，如果需要对列表数据进行双向绑定，需要设置为false
     * @property {Boolean} [filterConfirm=false] 列表筛选组件是否使用确认按钮（默认为false）
     */

    props: {
      // 标题
      title: String,
      // 工具区
      toolbar: Boolean,
      // 表头加背景色
      headerBackground: Boolean,
      // 表格数据
      data: {
        type: Array,
        default() {
          return []
        }
      },
      // 列配置
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      // 开启列筛选
      columnFilter: Boolean,

      // 模式：页码分页、滚动分页、虚拟列表
      mode: {
        type: String,
        default: 'pager',
        validator(val) {
          return ['pager', 'scroll', 'virtual'].includes(val)
        }
      },
      // 显示loading
      loading: Boolean,

      // loading配置
      spin: {
        type: Object,
        default() {
          return {
            tip: '正在拼命加载...'
          }
        }
      },

      // 适应父容器
      fit: Boolean,

      // 初始页码
      page: {
        type: Number,
        default: 1
      },

      // 初始页大小
      pageSize: {
        type: Number,
        default: 10
      },
      // 数组总数
      total: {
        type: Number,
        default: 0
      },
      // 分页组件其他配置
      pagination: {
        type: [Object, Boolean],
        default() {
          return {
            background: true,
            layout: 'total, ->, prev, pager, next'
          }
        }
      },
      // 加载数据函数
      loader: Function,

      // 实例化自动调用加载函数
      auto: {
        type: Boolean,
        default: true
      },
      // 节流时延，单位为ms
      scrollDelay: {
        type: Number,
        default: 200
      },
      // 触发加载的距离阈值，单位为px
      scrollDistance: {
        type: Number,
        default: 0
      },
      // 行的高度， 虚拟列表专用，默认按表格size计算
      itemHeight: Number,
      // 冻结列表数据数组
      freeze: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        list: [],
        currentPage: this.page,
        currentTotal: this.total,
        currentPageSize: this.pageSize,
        errorMessage: null,
        toolbarHeight: 0,
        pagerHeight: 0,
        currentLoading: this.loading,
        displayColumnProps: [],
        columnsProxy: []
      }
    },
    computed: {
      classes() {
        return {
          'is-fit': this.fit,
          [`my-table--${this.mode}`]: !!this.mode,
          'my-table--header-bg': this.headerBackground,
          'is-row-sortable': (!!this.rowSortable && !this.rowSortable?.disabled)
        }
      },
      tableHeight() {
        if (!this.fit) return null
        return `calc(100% - ${this.toolbarHeight + this.pagerHeight}px)`
      },
      displayColumns() {
        return this.columnsProxy.filter(col => {
          // 有type的字段 或 没设置属性名称的列固定显示
          if (col.type || !col.prop) return true
          return this.displayColumnProps.includes(col.prop)
        })
      }
    },
    watch: {
      loading: {
        immediate: true,
        handler(val) {
          this.currentLoading = val
        }
      },
      // 初始化数据
      data: {
        immediate: true,
        handler(val) {
          this.list = this.freeze ? Object.freeze(val.slice(0)) : val.slice(0)
        }
      },
      columns: {
        immediate: true,
        handler() {
          this.columnsProxy = [...this.columns]
          this.resetDisplayColumns()
        }
      },
      list() {
        this.startRowIndex = 0
        this.startOffset = 0
        this.$nextTick(() => {
          this.updateView()
          this.scrollTop()
        })
      },
      displayColumnProps(val) {
        /**
         * 列筛选改变时触发
         * @event column-change
         * @param {String[]} columnPropNames
         */
        this.$emit('column-change', val)
      }
    },
    methods: {
      resetDisplayColumns() {
        this.displayColumnProps = this.columnsProxy.filter(col => {
          if (!col.prop || col.type) return false
          return col.display !== false
        }).map(col => col.prop)
      },
      updateView() {
        if (this.$refs.toolbar) {
          const el = this.$refs.toolbar.$el
          const marginBottom = parseInt(getStyle(el, 'margin-bottom')) || 0
          this.toolbarHeight = el.getBoundingClientRect().height + marginBottom
        }

        if (this.$refs.pager) {
          this.pagerHeight = this.$refs.pager.$el.getBoundingClientRect().height
        }
      },
      load() {
        if (!this.loader) return
        const loaders = {
          pager: this.pagerLoaded,
          scroll: this.scrollLoaded,
          virtual: this.virtualLoaded
        }
        this.currentLoading = true
        this.errorMessage = null
        this.loader(this.currentPage, this.currentPageSize).then(res => {
          const loaded = loaders[this.mode]
          loaded && loaded(res)
          this.currentTotal = res.total || 0
          /**
           * 请求成功时触发
           * @event success
           * @param {object} [res] 请求响应数据
           */
          this.$emit('success', res)
        }).catch(e => {
          this.errorMessage = e;
          /**
           * 请求失败时触发
           * @event error
           * @param {*} e 错误信息
           */
          this.$emit('error', e)
        }).finally(() => {
          this.currentLoading = false
        })
      },
      /**
       * 刷新列表
       * @method refresh
       * @param {number} [page=1] 刷新的页码
       */
      refresh(page) {
        this.currentPage = page || this.currentPage
        this.load()
      },

      // 继承el-table组件的方法
      extendMethods(ref, names = []) {
        if (!ref) return

        names.forEach(name => {
          // 子组件的方法加到实例
          this[name] = (...args) => {
            ref[name].apply(ref, args)
          }
        })

      },

      colChangeConfirm() {
        /**
         * 列表筛选点击确定时触发
         * @event column-change-confirm
         * @param {Array[]} columnPropNames
         */
        this.$emit('column-change-confirm', this.displayColumnProps)
      }
             
      
    },
    mounted() {
      this.updateView()
      // 支持el-table的全部方法
      this.extendMethods(this.$refs.elTable, [
        'clearSelection',
        'toggleRowSelection',
        'toggleAllSelection',
        'toggleRowExpansion',
        'setCurrentRow',
        'clearSort',
        'clearFilter',
        'doLayout',
        'sort'
      ])
    }
  }
</script>
