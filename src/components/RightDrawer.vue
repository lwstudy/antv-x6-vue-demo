<template>
  <div class="right-drawer">
    <div class="tt">
      <span>任务节点设置</span>
      <i class="el-icon-circle-close" title="关闭" @click="closeFn"></i>
    </div>
    <div class="wrap">
      <el-form label-width="80px">
        <el-form-item label="节点名称">
          <el-input v-model="node.name" placeholder="请输入节点名称" @blur="inputBlur"></el-input>
        </el-form-item>
        <el-form-item label="节点描述">
          <el-input type="textarea" v-model="node.desc" placeholder="请输入节点描述" @blur="inputBlur2"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectCell: {
      default: ''
    },
    nodeData: {
      type: Object
    }
  },
  data() {
    return {
      selectedCell: '',
      node: {}
    }
  },
  created() {
    this.selectedCell = this.selectCell
    this.node = this.nodeData
  },
  methods: {
    // 关闭
    closeFn() {
      this.$emit('updateVisable', false)
    },
    inputBlur() {
      this.selectedCell.data.name = this.nodeData.name
    },
    inputBlur2() {
      this.selectedCell.data.desc = this.nodeData.desc
    }
  }
}
</script>

<style lang="scss" scoped>
.right-drawer {
  max-width: 350px;
  min-width: 350px;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99999;
  border-left: 1px solid #e8eaec;
  .tt {
    border-bottom: 1px solid #e8eaec;
    box-sizing: border-box;
    padding: 14px 16px;
    color: #333;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    .el-icon-circle-close {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #1989fa;
      }
    }
  }
  .wrap {
    box-sizing: border-box;
    padding: 20px 10px 20px 20px;
}
}
</style>
