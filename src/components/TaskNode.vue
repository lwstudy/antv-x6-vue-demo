<template>
  <el-card class="task-node">
    <div slot="header" class="clearfix">
      <span>{{nodeInfo.name}}</span>
    </div>
    <div class="content">{{nodeInfo.desc}}</div>
  </el-card>
</template>

<script>
export default {
  props: {
    nodeData: Array
  },
  inject: ['getGraph', 'getNode'],
  data() {
    return {
      nodeInfo: {
        name: '任务节点',
        desc: '节点内容'
      }
    }
  },
  created() {
    const node = this.getNode()
    const data = node.store.data.data

    if (data) {
      this.nodeInfo = data
    }
  }
}
</script>
