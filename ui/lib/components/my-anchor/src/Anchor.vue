<template>
  <MyAffix v-bind="affix" @viewUpdate="handleViewUpdate">
    <div class="my-anchor__wrapper">
      <div class="my-anchor">
        <div class="my-anchor__ink">
          <span class="my-anchor__ball" :class="ballClass" :style="ballStyle"></span>
        </div>
        <MyAnchorLink v-for="(item, index) in data"
                      v-bind="item"
                      :key="index"
                      :active="activeLink"
                      @click="handleClick">
          <template v-if="$scopedSlots.title" v-slot:title="props">
            <slot name="title" v-bind="props">{{props.title}}</slot>
          </template>
        </MyAnchorLink>
      </div>
    </div>
  </MyAffix>
</template>

<script>
  /**
   * 锚菜单组件
   * @author chenhuachun
   *
   * @module $ui/components/my-anchor
   *
   */
  import {MyAffix} from '$ui'
  import MyAnchorLink from './Link'
  import {scrollTop} from '$ui/utils/dom'

  /**
   * 插槽
   * @member slots
   * @property {string} title 作用域插槽，参数：菜单数据项对象
   */
  export default {
    name: 'MyAnchor',
    components: {
      MyAffix,
      MyAnchorLink
    },
    /**
     * 属性参数
     * @member props
     * @property {Object} [affix] MyAffix组件配置项 {offsetTop, offsetBottom, target}
     * @property {Array} [data] 菜单数据数组，数据项 {title, icon, href, anchor}
     * @property {string} [data.title] 菜单标题文本
     * @property {string|Object} [data.icon] 标题前面的图标
     * @property {string} [data.href] 菜单链接地址
     * @property {string} [data.anchor] 菜单锚位置id，href 与 anchor 二选一
     *
     */
    props: {
      affix: Object,
      data: Array
    },
    provide() {
      return {
        myAnchor: this
      }
    },
    data() {
      return {
        activeLink: null,
        top: 0,
        links: []
      }
    },
    computed: {
      ballClass() {
        return {
          'is-visible': this.top > 0
        }
      },
      ballStyle() {
        return {
          top: `${this.top}px`
        }
      }
    },
    watch: {
      activeLink(link) {
        if (!link) return
        const title = link.$refs.title
        if (title) {
          this.top = title.$el.offsetTop + (title.$el.clientHeight / 2) - 4.5
        }
      }
    },
    methods: {
      getContainer() {
        if (!this.affix || !this.affix.target) {
          return window
        }
        return this.affix.target()
      },
      scrollTo(anchor) {
        if (!anchor) return
        const el = document.querySelector(anchor)
        if (!el) return

        const wrapper = this.getContainer()
        if (!wrapper) return
        scrollTop(wrapper, wrapper.scrollY || wrapper.scrollTop, el.offsetTop)
      },
      handleClick(vm) {
        this.activeLink = vm
        const anchor = vm.anchor
        if (anchor) {
          this.scrollTo(anchor)
        }
        /**
         * 点击菜单项时触发
         * @event click
         * @param {VueComponent} vm 菜单项实例
         */
        this.$emit('click', vm)
      },
      setCurrentAnchor(container) {
        const viewOffsetTop = container.offsetTop || document.documentElement.scrollTop
        const viewScrollTop = container.scrollTop || document.documentElement.scrollTop
        let matchScrollTop = 0
        this.links.forEach(link => {
          const el = document.querySelector(link.anchor)
          if (!el) return
          const realOffsetTop = el.offsetTop - viewOffsetTop
          // 确保从上到下找
          if (el && realOffsetTop >= matchScrollTop && viewScrollTop >= realOffsetTop) {
            matchScrollTop = realOffsetTop
            this.activeLink = link
          }
        })
      },
      handleViewUpdate() {
        const wrapper = this.getContainer()
        if (!wrapper) return
        this.setCurrentAnchor(wrapper)
      }
    }
  }
</script>


