<template>
  <div class="my-affix__placeholder" :style="placeholderStyle" ref="placeholderNode">
    <div :class="{'my-affix':!!affixStyle}" ref="fixedNode" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 图钉组件
   * @author chenhuachun
   *
   * @module $ui/components/my-affix
   *
   */
  import {on, off} from 'element-ui/lib/utils/dom'
  import {throttle, isEqual} from '$ui/utils/util'

  function getTargetRect(target) {
    return target !== window ? target.getBoundingClientRect() : {top: 0, left: 0, bottom: 0};
  }

  function getScroll(target, top) {
    if (typeof window === 'undefined') {
      return 0;
    }

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
      ret = window.document.documentElement[method];
    }

    return ret;
  }

  function getOffset(element, target) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top - targetRect.top + scrollTop - clientTop,
      left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    };
  }

  function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
  }

  /**
   * 插槽
   * @member slots
   * @property {string} default 默认插槽，定义内容
   */
  export default {
    name: 'MyAffix',
    /**
     * 属性参数
     * @member props
     * @property {Number} [offsetTop] 距离窗口顶部达到指定偏移量后触发
     * @property {Number} [offsetBottom] 距离窗口底部达到指定偏移量后触发
     * @property {Function} [target] 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
     */
    props: {
      // 距离窗口顶部达到指定偏移量后触发
      offsetTop: Number,
      offsetBottom: Number,
      target: Function
    },
    data() {
      this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
      this.eventHandlers = {};
      return {
        affixStyle: null,
        placeholderStyle: null
      }
    },
    watch: {
      target(val) {
        this.clearEventListeners();
        this.setTargetEventListeners(val);
        // Mock Event object.
        this.updatePosition({});
      },
      offsetTop() {
        this.updatePosition({});
      },
      offsetBottom() {
        this.updatePosition({});
      }
    },
    methods: {
      setAffixStyle(e, affixStyle) {
        const {target = getDefaultTarget} = this;
        const originalAffixStyle = this.affixStyle;
        const isWindow = target() === window;
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
          return;
        }
        if (isEqual(affixStyle, originalAffixStyle)) {
          return;
        }
        this.affixStyle = affixStyle
        /**
         * 固定状态改变时触发
         * @event change
         * @param {boolean} fixed 是否固定
         */
        this.$emit('change', !!this.affixStyle);
      },

      setPlaceholderStyle(placeholderStyle) {
        const originalPlaceholderStyle = this.placeholderStyle;
        if (isEqual(placeholderStyle, originalPlaceholderStyle)) {
          return;
        }
        this.placeholderStyle = placeholderStyle
      },
      syncPlaceholderStyle(e) {
        const {affixStyle} = this;
        if (!affixStyle) {
          return;
        }
        this.$refs.placeholderNode.style.cssText = '';
        this.setAffixStyle(e, {
          ...affixStyle,
          width: this.$refs.placeholderNode.offsetWidth + 'px'
        });
        this.setPlaceholderStyle({
          width: this.$refs.placeholderNode.offsetWidth + 'px'
        });
      },

      updatePosition(e) {
        const {offsetBottom, offset, target = getDefaultTarget} = this;
        let {offsetTop} = this;
        const targetNode = target();

        // Backwards support
        // Fix: if offsetTop === 0, it will get undefined,
        //   if offsetBottom is type of number, offsetMode will be { top: false, ... }
        offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
        const scrollTop = getScroll(targetNode, true);
        const affixNode = this.$el;
        const elemOffset = getOffset(affixNode, targetNode);
        const elemSize = {
          width: this.$refs.fixedNode.offsetWidth,
          height: this.$refs.fixedNode.offsetHeight
        };

        const offsetMode = {
          top: false,
          bottom: false
        };
        // Default to `offsetTop=0`.
        if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
          offsetMode.top = true;
          offsetTop = 0;
        } else {
          offsetMode.top = typeof offsetTop === 'number';
          offsetMode.bottom = typeof offsetBottom === 'number';
        }

        const targetRect = getTargetRect(targetNode);
        const targetInnerHeight = targetNode.innerHeight || targetNode.clientHeight;
        if (scrollTop > elemOffset.top - offsetTop && offsetMode.top) {
          // Fixed Top
          const width = `${elemOffset.width}px`;
          const top = `${targetRect.top + offsetTop}px`;
          this.setAffixStyle(e, {
            position: 'fixed',
            top,
            left: `${targetRect.left + elemOffset.left}px`,
            width
          });
          this.setPlaceholderStyle({
            width,
            height: `${elemSize.height}px`
          });
        } else if (
          scrollTop < elemOffset.top + elemSize.height + offsetBottom - targetInnerHeight &&
          offsetMode.bottom
        ) {
          // Fixed Bottom
          const targetBottomOffet =
            targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
          const width = `${elemOffset.width}px`;
          this.setAffixStyle(e, {
            position: 'fixed',
            bottom: targetBottomOffet + offsetBottom + 'px',
            left: targetRect.left + elemOffset.left + 'px',
            width
          });
          this.setPlaceholderStyle({
            width,
            height: elemOffset.height + 'px'
          });
        } else {
          const {affixStyle} = this;
          if (
            e.type === 'resize' &&
            affixStyle &&
            affixStyle.position === 'fixed' &&
            affixNode.offsetWidth
          ) {
            this.setAffixStyle(e, {...affixStyle, width: affixNode.offsetWidth + 'px'});
          } else {
            this.setAffixStyle(e, null);
          }
          this.setPlaceholderStyle(null);
        }
        if (e.type === 'resize') {
          this.syncPlaceholderStyle(e);
        }
        this.$emit('viewUpdate')
      },
      setTargetEventListeners(getTarget) {
        const target = getTarget();
        if (!target) {
          return;
        }
        this.clearEventListeners();

        this.events.forEach(eventName => {

          on(target, eventName, this.updatePosition);
          this.eventHandlers[eventName] = {
            target,
            eventName,
            handler: this.updatePosition
          }
        });
      },

      clearEventListeners() {
        this.events.forEach(eventName => {
          const handler = this.eventHandlers[eventName];
          if (handler) {
            off(handler.target, handler.eventName, handler.handler)
          }
        });
      }
    },
    beforeMount() {
      this.updatePosition = throttle(this.updatePosition, this);
    },
    mounted() {
      const target = this.target || getDefaultTarget;
      // Wait for parent component ref has its value
      this.timeout = setTimeout(() => {
        this.setTargetEventListeners(target);
        // Mock Event object.
        this.updatePosition({});
      });

    },
    beforeDestroy() {
      this.clearEventListeners();
      clearTimeout(this.timeout);
    }
  }
</script>

