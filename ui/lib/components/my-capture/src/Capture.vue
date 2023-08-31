<template>
  <span class="xdh-capture" @click.prevent="capture">
    <slot name="button">
      <el-button circle icon="el-icon-view"></el-button>
    </slot>
  </span>
</template>

<script>
  /**
   * capture 截取屏幕元素组件
   * @module $ui/components/my-capture
   */
  import {downloadByData} from '../../../utils/download'
  import date from '../../../utils/date'

  const h2cImport = function () {
    return import('html2canvas')
  }
  /**
   * 插槽
   * @member slot
   * @property {string} [button] 放置button 按钮的 slot
   */
  export default {
    name: 'MyCapture',
    /**
     * 参数属性
     * @member props
     * @property {HTMLElement} [dom = d.body] 需要截取的Dom节点， 默认为document.body
     * @property {Function} [beforeCapture] 截图前与执行函数，返回 Promise对象
     * @property {Object} [options] html2canvas的配置项
     * @property {Boolean} [options.async = true] 解析 html节点 并 渲染在canvas 这个过程 同步进行
     * @property {Boolean} [options.allowTaint = true] 允许跨域的图片显示在canvas中（原h2c组件默认是false，封装时定义为ture）
     * @property {Boolean} [options.useCORS = true] 是否允许开启跨域，原h2c默认为false， 封装时定义为true
     * @property {String} [options.backgroundColor = #fffff] canvas的背景颜色默认为白
     * @property {Number} [options.imageTimeout] 图片加载的等待时间， 默认是 15s
     * @property {Function} [options.ignoreElement] (element) => false
     * @property {Boolean} [options.logging = false] 是否在console中打印转化过程，h2c中默认打印，封装转为默认不打印
     * @property {Boolean} [options.removeContainer = true] 是否清除h2c组件调用时生成的临时dom节点，默认true
     * @property {Number} [options.scale = window.DPR] 图片的比例 默认为浏览器的dpr比
     * @property {Number} [width = element.width] 截取dom的width
     * @property {Number} [height = element.height] 截取dom的height
     * @property {Number} [x = ele.x-offset] canvas 的 原点 处于 dom原点的 水平距离（x距离），并在此位置开始渲染（原点为左上角）
     * @property {Number} [y = ele.y-offset] canvas 的 原点 处于 dom原点的 垂直距离（y距离），并在此位置开始渲染（原点为左上角）
     * @property {Number} [windowWidth = w.innerWidth] 在渲染dom时的实时window.innerWidth, 可以手动修改 (修改此参数会让dom内一些根据windows大小而改变布局/大小的节点以此值来改变原来的位置和大小（例如某些并列的元素会被换行）)
     * @property {Number} [windowHeight = w.innerHeight] 在渲染dom时的实时window.innerHeight, 可以手动修改
     * @property {Number} [scrollX = element.scrollX]
     */
    props: {
      dom: {
        type: HTMLElement,
        default() {
          return document.body
        }
      },
      options: {
        type: Object
      },
      beforeCapture: {
        type: Function,
        default: () => {
          return Promise.resolve()
        }
      }
    },
    data() {
      return {
        h2c: null
      }
    },
    computed: {
      h2cOpt() {
        const obj = {
          logging: false,
          allowTain: true,
          useCORS: true
        }
        return Object.assign(obj, this.options || {})
      }
    },
    methods: {
      capture() {
        /**
         * 点击抓取时派发的事件
         * @event on-capture
         * @param {HTMLElement} [dom] 抓取的dom节点
         */
        this.beforeCapture().then(() => {
          this.$emit('on-capture', this.dom)
          if (this.h2c) {
            this._renderImg(this.h2c)
          } else {
            h2cImport().then((res) => {
              if (res) {
                this.h2c = res.default || res
                this._renderImg(this.h2c)
              }
            }).catch((error) => {
              console.log(error)
              this.$alert('控件加载失败')
            })
          }
        })
        
      },
      /**
       * 内部渲染函数
       * @Function _renderImg
       * @param h2c {Function} html2canvas的功能函数
       */
      _renderImg(h2c) {
        const opt = this.h2cOpt;
        h2c(this.dom, opt).then((canvas) => {
          const imgData = canvas.toDataURL()
          const nowTime = date(new Date(), 'yyyyMMddhhmmss')
          downloadByData(null, `${nowTime}.png`, imgData)
          /**
           * 图片下载时派发的事件
           * @event on-output
           * @param {string} imgData 生成图片的Base64字符串
           */
          this.$emit('on-output', imgData)
        }).catch((error) => {
          this.$emit('on-failed', error)
        })
      }
    }

  }
</script>
