<template>
  <div class="my-card-list">
    <!-- 列表内容 -->
    <div v-if="list.length && !this.currentLoading" class="my-card-list__wrapper">
      <el-row v-bind="rowProps">
        <el-col v-for="(item, index) in list"
                :key="index"
                v-bind="colProps"
                :style="colStyle">
          <slot
            v-bind="{item, index, page:currentPage,pageSize:currentPageSize,total:currentTotal,columns:currentColumn}">
            {{item}}
          </slot>
        </el-col>
      </el-row>
    </div>

    <!-- 加载中提示 -->
    <div v-if="this.currentLoading" class="my-card-list__loading">
      <slot name="loading">正在努力加载数据...</slot>
    </div>

    <!-- 无数据提示 -->
    <div v-if="!this.currentLoading && !list.length" class="my-card-list__empty">
      <slot name="empty">暂无数据</slot>
    </div>

    <!-- 列表底部自定义内容 -->
    <div v-if="$slots.append" class="my-card-list__append">
      <slot name="append"></slot>
    </div>

    <!-- 分页 -->
    <Pagination v-if="pager && currentTotal"
                class="my-card-list__pager"
                ref="pager"
                v-bind="pagerProps"
                :total="currentTotal"
                :current-page="currentPage"
                @size-change="handlePageSizeChange"
                @current-change="handlePageChange"></Pagination>
  </div>
</template>

<script>
  /**
   * 卡片列表组件
   * @module $ui/components/my-card-list
   */
  // import responsive, {responsiveArray} from '$ui/utils/responsive'
  import responsiveCol from '$ui/utils/responsive-col'
  import {Pagination} from 'element-ui'
  // 分页组件默认配置
  const defaultPagerProps = {
    align: 'center',
    background: true,
    layout: 'prev, pager, next'
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 作用域插槽，定义卡片，参数：item 卡片数据，index 索引位置
   * @property {string} empty 无数据时显示内容
   * @property {string} loading 定义加载中提示
   * @property {string} append 列表底部自定义内容
   */
  export default {
    name: 'MyCardList',
    mixins: [responsiveCol],
    components: {
      Pagination
    },
    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 列表数据数组
     * @property {Function} [loader] 数据加载函数，loader 优先 data，函数必须要返回Promise，需要回调 {list, total}
     * @property {number|object} [columns] 显示列数，支持响应式对象设置 {xxl,xl,lg,md,sm,xs}
     * @property {boolean} [listenEl] 监听$el元素宽度实现响应布局（默认为false）
     * @property {boolean|object} [pager] 分页配置，如果不设置，不开启分页功能
     * @property {number} [page=1] 初始页码, 从1开始
     * @property {number} [pageSize=12] 每页显示几条
     * @property {number} [total=0] 数据记录数，开启分页才有效
     * @property {boolean} [auto] 初始化完成后调用loader
     * @property {number} [gutter=12] 栅格间隔
     * @property {boolean} [loading] 显示loading
     */
    props: {
      // 数据
      data: Array,
      // 数据加载函数，loader 优先 data，函数必须要返回Promise，回调{list, total}
      loader: Function,
       
      // 初始页码, 从1开始
      page: {
        type: Number,
        default: 1
      },

      // 每页显示几条
      pageSize: {
        type: Number,
        default: 12
      },

      // 记录数
      total: {
        type: Number,
        default: 0
      },

      // 分页配置
      pager: {
        type: [Boolean, Object]
      },
      // 初始化完成后调用loader
      auto: {
        type: Boolean,
        default: true
      },
      // 栅格间隔
      gutter: {
        type: Number,
        default: 12
      },
      loading: Boolean
    },
    data() {
      return {
        list: [], 
        currentPage: this.page,
        currentTotal: this.total,
        currentPageSize: this.pageSize,
        currentLoading: this.loading
      }
    },
    computed: {
      rowProps() {
        return {
          gutter: this.gutter
        }
      },
      colProps() {
        return {
          span: Math.floor(24 / this.currentColumn)
        }
      },
      colStyle() {
        return {
          paddingBottom: `${this.gutter}px`
        }
      },
      pagerProps() {
        return {
          ...defaultPagerProps,
          ...this.pager,
          pageSize: this.pageSize,
          total: this.total,
          currentPage: this.page
        }
      }
    },
    watch: {
      data: {
        immediate: true,
        handler(val = []) {
          this.list = Object.freeze(val.slice(0))
        }
      },
      loading: {
        immediate: true,
        handler(val) {
          this.currentLoading = val
        }
      }, 
      pagerProps: {
        immediate: true,
        handler(props) {
          this.currentPage = props.currentPage
          this.currentTotal = props.total
          this.currentPageSize = props.pageSize
          this.auto && this.$nextTick(this.load)
        }
      }
    },
    methods: {
      handlePageChange(page) {
        this.currentPage = page
        /**
         * 分页页码变化时触发
         * @event page-change
         * @param {number} page 页码
         * @param {number} pageSize 页大小
         */
        this.$emit('page-change', page, this.currentPageSize)
        this.load()
      },
      handlePageSizeChange(size) {
        this.currentPage = 1;
        this.currentPageSize = size
        /**
         * 页大小变化时触发
         * @event size-change
         * @param {number} pageSize 页大小
         */
        this.$emit('size-change', size)
        this.load()
      },
      load() {
        if (!this.loader) return

        this.currentLoading = true
        this.loader(this.currentPage, this.currentPageSize).then(res => {
          this.list = res.list
          this.currentTotal = res.total || 0
          this.$emit('success', res)
        }).catch(e => {
          this.$emit('error', e)
        }).finally(r => {
          this.currentLoading = false
        })

      },
      /**
       * 刷新列表
       * @method refresh
       * @param {number} [page] 刷新的页码
       */
      refresh(page) {
        this.currentPage = page || this.currentPage
        this.load()
      }
    }
  }
</script>

