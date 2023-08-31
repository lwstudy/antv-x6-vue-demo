<template>
  <div :class="classes" v-on="$listeners">
    <MyAvatar v-for="(item, index) in list"
              :key="index"
              v-on="createEvents(item)"
              v-bind="mergeOptions(item)">{{item.text}}
    </MyAvatar>
    <MyAvatar v-if="count>0"
              theme="warning"
              :size="size"
              v-on="createClickMoreEvents()"
              :shape="shape">+{{count}}
    </MyAvatar>

    <MyAvatar v-if="addable"
              class="my-avatars__add"
              theme="info"
              :size="size"
              @click="handleClickAdd"
              :icon="addIcon"
              :shape="shape">
    </MyAvatar>

  </div>
</template>

<script>
  /**
   * 头像列表
   * @module $ui/components/my-avatars
   */
  import {MyAvatar} from '$ui'

  export default {
    name: 'MyAvatars',
    components: {
      MyAvatar
    },
    /**
     * 属性参数
     * @member props
     * @property {Array} [data] 头像数据数组，字段包括{text, icon, src, tooltip, theme, alt}
     * @property {Object} [tooltip] 统一 tooltip 配置
     * @property {number} [max] 最多显示几个
     * @property {string|number} 统一设置尺寸，可以选 'large', 'small', 'default'
     * @property {string} [alt] 图像无法显示时的替代文本
     * @property {string} [theme] 统一配置 颜色
     * @property {string} [shape] 统一配置 形状，可选 'circle', 'square'
     * @property {boolean} [addable] 显示添加按钮
     * @property {string} [addIcon] 添加按钮图标样式
     */
    props: {
      // 数据 {text, icon, src, tooltip, theme, alt}
      data: {
        type: Array,
        default() {
          return []
        }
      },
      tooltip: Object,
      max: {
        type: Number,
        default: Infinity
      },
      // 设置头像的大小
      size: {
        type: [String, Number],
        default: 'default',
        validator(val) {
          return ['large', 'small', 'default'].includes(val) || val > 0
        }
      },
      // 图像无法显示时的替代文本
      alt: String,
      // 颜色
      theme: {
        type: String,
        default: 'primary',
        validator(val) {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      },
      // 形状
      shape: {
        type: String,
        default: 'circle',
        validator(val) {
          return ['circle', 'square'].includes(val)
        }
      },
      // 显示增加按钮
      addable: Boolean,

      // 添加按钮图标
      addIcon: {
        type: String,
        default: 'el-icon-plus'
      }
    },
    computed: {
      list() {
        if (this.data.length > this.max) {
          return this.data.slice(0, this.max)
        }
        return this.data
      },
      count() {
        return this.max !== Infinity ? this.data.length - this.max : 0
      },
      classes() {
        return {
          'my-avatars': true,
          'is-pointer': !!this.$listeners.click
        }
      }
    },
    methods: {
      mergeOptions(item) {
        const tooltip = item.tooltip ? {...this.tooltip, content: item.tooltip} : undefined
        return {
          size: this.size,
          theme: this.theme,
          alt: this.alt,
          shape: this.shape,
          ...item,
          tooltip: tooltip
        }
      },
      createEvents(item) {
        return this.$listeners['click-item']
          ? {
            click: e => this.handleClickItem(item, e)
          }
          : {}
      },
      createClickMoreEvents() {
        return this.$listeners['click-more']
          ? {
            click: e => {
              /**
               * 点击更多按钮时触发
               * @event click-more
               */
              this.$emit('click-more', e)
            }
          }
          : {}
      },
      handleClickItem(item) {
        /**
         * 点击头像时触发
         * @event click-item
         * @param {Object} item 头像
         */
        this.$emit('click-item', item)
      },
      handleClickAdd() {
        /**
         * 点击添加按钮时触发
         * @event click-add
         */
        this.$emit('click-add')
      }
    }
  }
</script>

