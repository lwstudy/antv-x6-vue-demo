<template>
  <div>
    <h2>VUE-X6示例</h2>
    <el-button type="primary" @click="handleHome">Custom流程</el-button>
    <el-button type="primary" @click="handleDBer">dber</el-button>
    <el-button type="primary" @click="handleDBerLay">dber-换布局</el-button>
    <el-button type="primary" @click="handleDBERV2">dber-V2</el-button>
    <el-button type="primary" @click="handleBpmn">BPMN</el-button>
    <el-button type="primary" @click="handleBpmnDrag">BPMN-Drag（拖拽绘制流程图</el-button>
    <el-button type="primary" @click="handleUML">UML</el-button>
    <el-button type="primary" @click="handleThinking">思维导图</el-button>
    <el-button type="primary" @click="handlePoints">散点图</el-button>
    <el-button type="primary" @click="handleTech">散点关系图谱</el-button>
    <el-button type="primary" @click="handleCircle">circle图谱</el-button>
    <el-button type="primary" @click="handleParent">父子节点</el-button>
    <el-button type="primary" @click="handleHTML">HTML节点</el-button>
    <hr>
    <h2>布局</h2>
    <el-button type="primary" @click="handleCircular">Circular布局</el-button>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    handleHome() {
      this.$router.push('/home')
    },
    handleDBer() {
      this.$router.push('/dber')
    },
    handleDBerLay() {
      this.$router.push('/laydber')
    },
    handleDBERV2() {
      this.$router.push('/dberv2')
    },
    handleBpmn() {
      this.$router.push('/bpmn')
    },
    handleBpmnDrag() {
      this.$router.push('/bpmn-drag')
    },
    handleThinking() {
      this.$router.push('/thinking')
    },
    handleUML() {
      this.$router.push('/uml')
    },
    handleCircular() {
      this.$router.push('/layout/circular')
    },
    handlePoints() {
      this.$router.push('/points')
    },
    handleTech() {
      this.$router.push('/tech')
    },
    handleCircle() {
      this.$router.push('/circle')
    },
    handleParent() {
      this.$router.push('/parent')
    },
    handleHTML() {
      this.$router.push('/html')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
