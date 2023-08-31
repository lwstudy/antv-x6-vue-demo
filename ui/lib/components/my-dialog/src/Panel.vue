<template>
  <MyLayout class="my-dialog-panel"
            :class="classes"
            :style="styles"
            :north="{height:headerHeight}"
            :south="{height:footerHeight}">
    <template v-slot:north>
      <div ref="header" class="my-dialog-panel__header">
        <div class="my-dialog-panel__title">
          <span v-if="icon" class="my-dialog-panel__icon">
            <!-- icon 插槽 -->
            <slot name="icon">
              <MyIcon v-bind="icon"></MyIcon>
            </slot>
          </span>
          <!-- title 插槽 -->
          <slot name="title">
            {{title}}
          </slot>
        </div>
        <div class="my-dialog-panel__tool">
          <slot name="tool"></slot>
          <MyIcon v-if="minimizable" @click="handleMinimized" class="icon-minimize" name="icon-dialog-minimize"
                  svg></MyIcon>
          <MyIcon v-if="maximizable && !maximized" @click="handleMaximized(true)" class="icon-maximize"
                  name="icon-dialog-maximize" svg></MyIcon>
          <MyIcon v-if="maximizable && maximized" @click="handleMaximized(false)" class="icon-window"
                  name="icon-dialog-window"
                  svg></MyIcon>
          <MyIcon v-if="closable" @click="handleClose" class="icon-close" name="icon-dialog-close" svg ></MyIcon>
        </div>
      </div>

    </template>
    <div class="my-dialog-panel__main" :class="classes">
      <slot></slot>
    </div>
    <template v-if="footer" v-slot:south>
      <div class="my-dialog-panel__footer">
        <slot name="footer">
          <ElButton type="primary"
                    size="medium"
                    @click="handleSubmit"
                    :loading="submitLoading">{{submitText}}
          </ElButton>
          <ElButton size="medium" @click="handleCancel">{{cancelText}}</ElButton>
        </slot>
      </div>
    </template>
  </MyLayout>
</template>

<script>
  import {MyLayout, MyIcon} from '$ui'
  import {Button} from 'element-ui'
  import '$ui/icons/dialog-close'
  import '$ui/icons/dialog-maximize'
  import '$ui/icons/dialog-window'
  import '$ui/icons/dialog-minimize'

  export default {
    components: {
      MyLayout,
      MyIcon,
      ElButton: Button
    },
    props: {
      width: Number,
      height: Number,
      theme: String,
      title: String,
      icon: Object,
      footer: Boolean,
      submitText: {
        type: String,
        default: '确定'
      },
      submitLoading: Boolean,
      cancelText: {
        type: String,
        default: '取消'
      },
      headerHeight: {
        type: Number,
        default: 46
      },
      footerHeight: {
        type: Number,
        default: 54
      },
      closable: {
        type: Boolean,
        default: true
      },
      beforeClose: Function,
      maximizable: Boolean,
      maximized: Boolean,
      minimizable: Boolean,
      minimized: Boolean
    },
    computed: {
      styles() {
        return {
          width: this.width ? `${this.width}px` : 'auto',
          height: this.height ? `${this.height}px` : 'auto'
        }
      },
      classes() {
        return {
          [`is-${this.theme}`]: !!this.theme,
          'is-has-height': !!this.width
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit')
      },
      handleCancel() {
        this.$emit('cancel')
      },
      handleClose() {
        if (this.beforeClose) {
          this.beforeClose().then(r => {
            this.$emit('close')
          })
        } else {
          this.$emit('close')
        }
      },
      handleMaximized(maximized) {
        this.$emit('update:maximized', maximized)
      },
      handleMinimized() {
        this.$emit('update:minimized', true)
      }
    }
  }
</script>
