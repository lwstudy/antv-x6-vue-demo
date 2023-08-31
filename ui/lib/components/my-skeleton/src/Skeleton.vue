<template>
  <div :class="classes">
    <template v-if="loading">
      <div class="my-skeleton__header" v-if="avatar">
        <span class="my-skeleton__avatar" :class="avatarClasses"></span>
      </div>
      <div class="my-skeleton__content" v-if="title || paragraph">
        <h3 v-if="title" class="my-skeleton__title" :style="titleStyle"></h3>
        <ul v-if="paragraph" class="my-skeleton__paragraph">
          <li v-for="(item,index) in rows" :key="index" :style="item"></li>
        </ul>
      </div>
    </template>
    <slot v-else></slot>
  </div>
</template>

<script>
  /**
   * 骨架屏效果
   * @module $ui/components/my-skeleton
   */

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义内容
   */
  export default {
    name: 'MySkeleton',
    /**
     * 属性参数
     * @member props
     * @property {boolean} [active=false] 是否展示动画效果
     * @property {boolean} [loading=false] 为 true 时，显示占位图。反之则直接展示子组件
     * @property {Boolean|Object} [avatar=false] 是否显示头像占位图, 支持对象配置
     * @property {string} [avatar.size] 头像尺寸，可选 default、large、small
     * @property {string} [avatar.shape] 头像形状，可选 circle、square
     * @property {boolean|object} [paragraph=true] 是否显示段落占位图, 支持对象配置
     * @property {string} [paragraph.width=60%] 设置段落占位图最后一行的宽度
     * @property {number} [paragraph.rows=3] 设置段落占位图的行数
     * @property {Boolean|Object} [title=true] 是否显示标题占位图,支持对象配置
     * @property {string} [title.width=50%] 设置标题占位图的宽度
     *
     */
    props: {
      // 是否展示动画效果
      active: {
        type: Boolean
      },
      // 是否显示头像占位图
      avatar: {
        type: [Boolean, Object],
        default: false
      },
      // 为 true 时，显示占位图。反之则直接展示子组件
      loading: Boolean,
      // 是否显示段落占位图
      paragraph: {
        type: [Boolean, Object],
        default: true
      },
      // 是否显示标题占位图
      title: {
        type: [Boolean, Object],
        default: true
      }
    },
    computed: {
      classes() {
        return ['my-skeleton', {
          'is-active': this.active,
          'my-skeleton--with-avatar': !!this.avatar
        }]
      },
      avatarClasses() {
        const {size, shape} = this.getAvatarProps() || {}
        return {
          [`is-avatar-${size}`]: !!size,
          [`is-avatar-${shape}`]: !!shape
        }
      },
      titleStyle() {
        const titleProps = this.getTitleProps() || {}
        return {
          width: titleProps.width
        }
      },
      rows() {
        const paragraphProps = this.getParagraphProps() || {}
        const rows = []
        for (let i = 0, len = paragraphProps.rows; i < len; i++) {
          rows.push(i === len - 1 ? {width: paragraphProps.width} : {})
        }
        return rows
      }
    },
    methods: {
      getAvatarProps() {
        return this.avatar
          ? {
            size: 'large', // large、small
            shape: 'circle',
            ...this.avatar
          }
          : null
      },
      getTitleProps() {
        return this.title
          ? {
            width: '50%',
            ...this.title
          }
          : null
      },
      getParagraphProps() {
        return this.paragraph
          ? {
            width: '61%',
            rows: 3,
            ...this.paragraph
          }
          : null
      }
    }
  }
</script>
