<template>
  <div>
    <el-tooltip v-if="toolTip" effect="dark" :content="text" placement="top-start">
      <div>
        <div class="circle" :style="'background-color:'+ color"></div>
        <div :style="'text-align: center;font-size: '+size">{{text}}</div>
      </div>
    </el-tooltip>
    <div v-if="!toolTip">
      <div class="circle" :style="'background-color:'+ color"></div>
      <div :style="'text-align: center;font-size: '+size">{{text}}</div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
  },
  inject: ['getGraph', 'getNode'],
  data() {
    return {
      color: 'white',
      text: '',
      size: 'small',
      node: '',
      toolTip: false,
      data: {}
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.size = val.size
        this.color = val.color
      }
    }
  },
  mounted() {
    this.node = this.getNode();
    this.data = this.node.getData();
    const { color, text, size, toolTip } = this.node.getData();
    this.color = color
    this.text = text
    this.size = size
    this.toolTip = toolTip
  }
}

</script>

<style lang="scss" scoped>
.circle {
  width: 30px;
  height: 30px;
  -webkit-border-radius: 30px;
  display: inline-block;
  /*-webkit-border-radius: 100%;*/
}
</style>
