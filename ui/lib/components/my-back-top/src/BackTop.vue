<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="el-icon-arrow-up"></i>
      </div>
    </slot>
  </div>
</template>
<script>
  import {scrollTop} from '../../../utils/dom';
  import {on, off} from 'element-ui/lib/utils/dom';

  const prefixCls = 'my-back-top';

  /**
   * MyBackTop
   * @module $ui/components/my-back-top
   */
  export default {
    name: 'MyBackTop',
    /**
     * props
     * @member
     * @property {object} props
     * @property {number} [props.height=400] 页面滚动高度达到该值时才显示组件
     * @property {number} [props.bottom=30] 组件距离底部的距离
     * @property {number} [props.right=30] 组件距离右部的距离
     * @property {number} [props.duration=1000] 滚动动画持续时间，单位 毫秒
     * @property {html} [props.container=window] 滚动容器
     */
    props: {
      height: {
        type: Number,
        default: 400
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      },
      container: {
        default: window
      }
    },
    data() {
      return {
        backTop: false
      };
    },
    mounted() {
      on(this.container, 'scroll', this.handleScroll);
      on(this.container, 'resize', this.handleScroll);
    },
    beforeDestroy() {
      off(this.container, 'scroll', this.handleScroll);
      off(this.container, 'resize', this.handleScroll);
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            'is-show': this.backTop
          }
        ];
      },
      styles() {
        return {
          bottom: `${this.bottom}px`,
          right: `${this.right}px`
        };
      },
      innerClasses() {
        return `${prefixCls}__inner`;
      }
    },
    methods: {
      handleScroll() {
        let sTop
        if (this.container === window) {
          sTop = document.documentElement.scrollTop || document.body.scrollTop
        } else {
          sTop = this.container.scrollTop
        }
        this.backTop = sTop >= this.height;
      },
      back() {
        let sTop
        if (this.container === window) {
          sTop = document.documentElement.scrollTop || document.body.scrollTop
        } else {
          sTop = this.container.scrollTop
        }
        scrollTop(this.container, sTop, 0, this.duration);
        /**
         * 点击事件
         * @event module:widgets/my-back-top#click
         */
        this.$emit('click');
      }
    }
  };
</script>

