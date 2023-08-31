<template>
  <div class="my-base-picker">
    <Popover v-model="visible"
             @show="handleShow"
             @hide="handleHide"
             placement="bottom-start"
             trigger="click"
             :disabled="disabled"
             :popper-class="popperClass"
             :width="popoverWidth">
      <div slot="reference" ref="reference" :class="refClass">
        <slot name="reference"></slot>
      </div>
      <slot :visible="visible"></slot>
    </Popover>
  </div>
</template>

<script>
  import {Popover} from 'element-ui'
  import PopoverMixin from './Popover'

  export default {
    mixins: [PopoverMixin],
    components: {
      Popover
    },
    props: {
      disabled: Boolean,
      popperClass: {
        type: String,
        default: 'my-base-picker__popover'
      },
      refClass: String
    }
  }
</script>

