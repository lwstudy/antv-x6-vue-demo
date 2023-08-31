<template>
 
  <Horizontal v-if="isHorizontal" ref="imgWall" v-bind="$attrs">
    <template v-slot:image="{scope}"> 
      <slot name="image" :scope="scope.item"></slot>
    </template>
    <template v-slot:content="{scope}"> 
      <slot name="content" :scope="scope.item"></slot>
    </template> 
  </Horizontal>

  <Vertical v-else ref="imgWall" v-bind="$attrs">
    <template v-slot:image="{scope}"> 
      <slot name="image" :scope="scope"></slot>
    </template>
    <template v-slot:content="{scope}"> 
      <slot name="content" :scope="scope"></slot>
    </template> 
  </Vertical>
 
</template>
<style lang="scss" scope>
</style>
<script>
/**
 * 图片墙组件
 * @module $ui/components/my-im-wall
 */
import Horizontal from './Horizontal'
import Vertical from './Vertical'
import DefaultImg from '$ui/assets/img/PRESENTED_IMAGE_DEFAULT.png'
/**
 * 插槽
 * @member slots
 * @property {string} image 图片插槽
 * @property {string} content 内容插槽
 */
export default {
  name: 'MyImgWall',
  mixins: [],
  components: {
    Horizontal,
    Vertical
  },
  /**
   * 属性参数
   * @member props
   * @property {Boolean} [isHorizontal] 是否横向布局，默认true， false 为纵向布局
   * @property {Object} [keyMap] 字段映射, 用于映射加载数组对象中的 图片链接字段
   * @property {Function} [loadData] 加载图片方法，返回promise， promise 中返回数组， 数组元素图片链接（Promise.resolve([{src: xxxx}, {src: xxxx}])）
   * @property {Number} [imgHeight] 横向布局时 图片基础高度（此参数为横向布局的图片最小高度）
   * @property {Number} [margin] 图片间距，横向布局时为图片四边margin，纵向布局时为图片下边距
   * @property {Object} [columns] 纵向布局时 显示列数，支持响应式对象设置 {xxl,xl,lg,md,sm,xs}
   */
  props: {
    isHorizontal: {
      type: Boolean,
      default: true
    },
    // 字段映射
    keyMap: {
      type: Object,
      default() {
        return {
          src: 'src'
        }
      }
    },
    // 加载函数
    loadData: {
      type: Function
    }
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
    imgPreload(data) {
      const imgData = data
      const loadPromise = imgData.map((data) => {
        return new Promise((resolve, reject) => {
          const imgObj = new Image()
          imgObj.src = data[this.keyMap.src]
          imgObj.onload = (e) => {
            resolve({
              _img: imgObj,
              ...data
            })
          }
          imgObj.onerror = () => {
            resolve({
              _img: {
                src: DefaultImg,
                width: 184,
                height: 152
              },
              ...data
            })
          }
        })
      })
      Promise.all(loadPromise).then((res) => { 
        this.$refs.imgWall.addImgData(res)
        const allImgs = this.getImages()
        /**
         * 数据插入事件
         * @event on-added
         * @param {array} 当前插入图片
         * @param {array} 全部图片
         */
        this.$emit('on-added', res, allImgs)
      }) 
    },
    loadMore() {
      this.loadData().then((res) => {
        this.imgPreload(res)
      })
    },
    getImages() {
      return this.$refs.imgWall.imgData.concat([])
    },
    setImages(arr) {
      this.$refs.imgWall.addImgData(arr)
    },
    clearImages() {
      this.$refs.imgWall.imgData = []
    }
  },
  created() {},
  mounted() {
    if (this.loadData) {
      this.loadMore()
    }
  }
}
</script>