<template>
  <div class="my-list" :class="classes">
    <!--头部-->
    <div v-if="$slots.header"
         ref="header"
         class="my-list__header"
         :style="headerStyle">
      <slot name="header"></slot>
    </div>

    <!-- 列表内容 -->
    <div ref="viewport"
         class="my-list__wrapper"
         @scroll="handleVirtualScroll"
         :class="wrapperClass"
         :style="wrapperStyle">
      <!-- 内容 -->
      <MySpin v-bind="spin" :fit="isFit" :loading="(isPager || isVirtual) && currentLoading">

        <!-- 无数据 -->
        <div v-if="!list.length && !errorMessage" class="my-list__empty">
          <slot name="empty">
            暂无数据
          </slot>
        </div>

        <div v-if="error && errorMessage" class="my-list__error">
          <slot name="error" :message="errorMessage">
            抱歉！发生异常错误，请稍后重试。
          </slot>
        </div>

        <!-- 虚拟列表占位容器，为了撑开内容出现滚动条 -->
        <div v-if="isVirtual" class="my-list__placeholder" :style="{height:`${contentHeight}px`}"></div>

        <ul ref="list"
            class="my-list__content"
            v-if="list.length && !errorMessage"
            v-infinite-scroll="load"
            :infinite-scroll-immediate="auto"
            :infinite-scroll-delay="scrollDelay"
            :infinite-scroll-distance="scrollDistance"
            :infinite-scroll-disabled="scrollDisabled"
            :style="contentStyle">
          <li v-for="(item, index) in (isVirtual ? viewItems : list)"
              :key="`item_${index}`"
              class="my-list__item"
              :class="createItemClass(index)"
              :style="itemStyle">
            <slot :item="item"
                  :index="startIndex + index"
                  :page="currentPage"
                  :pageSize="currentPageSize"
                  :total="currentTotal">
              {{item}}
            </slot>
          </li>
          <li v-for="n in fixItemCount"
              :key="n"
              class="my-list__item"
              :class="createItemClass((isVirtual ? viewItems : list).length + n - 1)"
              :style="itemStyle"></li>
        </ul>

        <!-- 骨架 -->
        <div v-if="isScroll && !isNoMore && currentLoading" class="my-list__scroll-loading">
          <slot name="skeleton">
            <MySpin loading></MySpin>
          </slot>
        </div>

        <!-- 没有更多提示 -->
        <div v-if="isScroll && isNoMore && currentPage>1" class="my-list__complete">
          <slot name="complete">
            没有更多了
          </slot>
        </div>


      </MySpin>
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer"
         ref="footer"
         class="my-list__footer"
         :style="footerStyle">
      <slot name="footer"></slot>
    </div>

    <!-- 分页 -->
    <Pagination v-if="isPager && currentTotal"
                ref="pager"
                v-bind="pagerProps"
                :total="currentTotal"
                :currentPage="currentPage"
                :class="pagerClass"
                @size-change="handlePageSizeChange"
                @current-change="handlePageChange"></Pagination>
  </div>

</template>

<script>

  /**
   * 列表组件
   * @module $ui/components/my-list
   */

  import {Pagination} from 'element-ui'
  import {MySpin} from '$ui'

  import Style from './Style'
  import Pager from './Pager'
  import Scroll from './Scroll'
  import Virtual from './Virtual'

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认作用域插槽，参数：item 列表， index 数据索引, page 当前页码，pageSize 页面大小，total 数据总数
   * @property {string} header 定义头部
   * @property {string} footer 定义底部
   * @property {string} skeleton 定义骨架加载效果，对滚动加载模式有效
   * @property {string} empty 定义无数据显示效果
   * @property {string} error 定义异常显示效果，参数error为true才有效
   * @property {string} complete 定义滚动加载到底时显示内容
   */
  export default {
    name: 'MyList',
    mixins: [Style, Pager, Scroll, Virtual],
    components: {
      Pagination,
      MySpin
    },

    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 静态数据
     * @property {Function} [loader] 加载数据回调函数，参数：page 页码，pageSize 页大小，必须返回Promise，数据格式：{list, total}
     * @property {Number|Object} 显示列数，支持响应式,响应式设置对象 {xxl,xl,lg,md,sm,xs}
     * @property {boolean} [fixColumns] 修正不够一行的列， columns > 1 才有效
     * @property {boolean} [border] 显示边框
     * @property {boolean} [split] 显示分隔线
     * @property {boolean} [stripe] 斑马条纹
     * @property {boolean} [size] 尺寸, 可选 'large', 'small', 'mini', ''
     * @property {Object} [headerStyle] 头部样式
     * @property {Object} [footerStyle] 底部样式
     * @property {Object} [spin] 分页模式的加载中组件配置 {tip, size}，参考MySpin组件
     * @property {Boolean} [loading] 显示 加载中
     * @property {string} [mode=pager] 列表模式，支持页码分页、滚动分页、虚拟列表，可选值：'pager', 'scroll', 'virtual'
     * @property {number} [page=1] 初始加载页码， 从1开始
     * @property {number} [pageSize=10] 每页显示几条
     * @property {number} [total=0] 数据条数
     * @property {Object} [pagination] 分页其他配置, 如 {layout, background, small}，参考ElPagination组件
     * @property {boolean} [auto=true] 初始化完成后调用loader
     * @property {boolean} [error] 显示请求错误
     * @property {number} [scrollDelay=200] 节流时延，单位为ms, 对滚动加载模式有效
     * @property {number} [scrollDistance=0] 触发加载的距离阈值，单位为px, 对滚动加载模式有效
     * @property {object} [skeleton] 加载中提示，对滚动加载模式有效
     * @property {boolean} [fit] 适配父容器，虚拟列表默认自动要设置true
     * @property {number} [itemHeight] 列表项高度，虚拟列表必须要设置
     *
     */
    props: {
      // 数据
      data: {
        type: Array,
        default() {
          return []
        }
      },
      // 加载数据回调函数
      loader: {
        type: Function
      },
      // 显示列数，支持响应式
      columns: {
        type: [Number, Object],
        default: 1
      },
      // 修正不够一行的列， columns > 1 才有效
      fixColumns: Boolean,
      // 显示边框
      border: Boolean,
      // 显示分隔线
      split: Boolean,
      // 斑马条纹
      stripe: Boolean,
      // 尺寸
      size: {
        type: String,
        default: '',
        validator(val) {
          return ['large', 'small', 'mini', ''].includes(val)
        }
      },
      // 头部样式
      headerStyle: Object,
      // 底部样式
      footerStyle: Object,

      // loading配置
      spin: {
        type: Object,
        default() {
          return {
            tip: '正在拼命加载...'
          }
        }
      },

      // 显示 加载中
      loading: Boolean,

      // 模式：页码分页、滚动分页、虚拟列表
      mode: {
        type: String,
        default: 'pager',
        validator(val) {
          return ['pager', 'scroll', 'virtual'].includes(val)
        }
      },

      // 初始页码, 从1开始
      page: {
        type: Number,
        default: 1
      },

      // 每页显示几条
      pageSize: {
        type: Number,
        default: 10
      },

      // 记录数
      total: {
        type: Number,
        default: 0
      },

      // 分页其他配置, 如 layout, background, small
      pagination: {
        type: Object,
        default() {
          return {}
        }
      },
      // 初始化完成后调用loader
      auto: {
        type: Boolean,
        default: true
      },
      // 请求错误时显示
      error: {
        type: Boolean
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
      // 加载提示
      skeleton: {
        type: Object,
        default() {
          return {
            active: true,
            title: true,
            paragraph: {
              rows: 1,
              width: '100%'
            }
          }
        }
      },
      // 适配父容器，默认自动要设置true
      fit: Boolean,

      // 列表项高度，虚拟列表必须要设置
      itemHeight: Number
    },
    data() {
      return {
        list: [],
        currentPage: this.page,
        currentTotal: this.total,
        currentPageSize: this.pageSize,
        currentLoading: false,
        errorMessage: null
      }
    },
    computed: {
      pageCount() {
        return Math.ceil(this.currentTotal / this.currentPageSize)
      }
    },
    watch: {
      // 初始化数据
      data: {
        immediate: true,
        handler(val) {
          this.list = Object.freeze(val.slice(0))
        }
      },

      list() {
        // 列表变化后，滚动条重置，只对 virtual 模式处理
        if (!this.isVirtual) return
        this.$nextTick(() => {
          this.scrollTop()
        })
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
      /**
       * 调用loader加载数据
       * @method load
       */
      load() {
        if (!this.loader) return

        const loadedMap = {
          pager: this.pagerLoaded,
          scroll: this.scrollLoaded,
          virtual: this.virtualLoaded
        }

        this.currentLoading = true
        this.errorMessage = null
        this.loader(this.currentPage, this.currentPageSize).then(res => {
          const loaded = loadedMap[this.mode]
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
        if (this.mode === 'scroll') {
          this.list = []
          this.scrollTop(0)
          this.currentPage = 1
        }
        this.load()
      },
      /**
       * 滚到到顶部，fit=true 或 mode=virtual时有效
       * @method scrollTop
       */
      scrollTop(val = 0) {
        if (this.$refs.viewport) {
          this.$refs.viewport.scrollTop = val
        }
      },
      /**
       * 重置滚动条，当元素隐藏后再显示，滚动条位置会丢失，可以调用该方法重置
       * @method reset
       */
      reset() {
        this.scrollTop(this.startOffset)
      }
    }
  }
</script>
