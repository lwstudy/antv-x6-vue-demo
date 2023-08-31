<template>
  <div class="antv-x6" id="dber">
    <!-- 缩略图 -->
    <div class="app-mini" ref="minimapContainer"></div>
    <div class="app-content" ref="containerRef"></div>
    <!-- 操作区 -->
    <div class="operating">
      <slot name="titleLeft"></slot>
      <div>

        <el-input-number
          v-model="nodeNum"
          :min="10"
          :max="3000"
          label="描述文字"
        ></el-input-number>
      </div>
      <el-button-group key="scale-control">
        <slot name="buttonLeft"></slot>
        <el-tooltip
          code="layout"
          class="item"
          effect="light"
          content="画布移动"
          placement="bottom"
        >
          <el-button size="small" icon="el-icon-money" @click="togglePanning" />
        </el-tooltip>
        <el-tooltip
          code="layout"
          class="item"
          effect="light"
          content="布局"
          placement="bottom"
        >
          <el-button size="small" icon="el-icon-rank" @click="layout" />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          content="放大"
          placement="bottom"
        >
          <el-button
            code="zoomIn"
            size="small"
            icon="el-icon-zoom-in"
            @click="zoomInFn"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          content="缩小"
          placement="bottom"
        >
          <el-button
            code="zoomOut"
            size="small"
            icon="el-icon-zoom-out"
            @click="zoomOutFn"
          />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          content="新增"
          placement="bottom"
        >
          <el-button size="small" icon="el-icon-files" @click="addTable" />
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="light"
          content="删除"
          placement="bottom"
        >
          <el-button size="small" icon="el-icon-delete" @click="clearFn" />
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="light"
          content="全屏"
          placement="bottom"
        >
          <el-button size="small" icon="el-icon-full-screen" @click="toggle" />
        </el-tooltip>
      </el-button-group>
    </div>

    <RightMenu
      :visible.sync="menu.visible"
      :position.sync="menu.position"
      :mark="menu.mark"
      @close="close"
      @closeOther="closeOther"
      @closeAll="closeAll"
    />

    <PortToolTip
      :visible.sync="tooltip.visible"
      :position.sync="tooltip.position"
      :content="tooltip.content"
    />
  </div>
</template>
<script>
import dber from "./index";
export default dber;
</script>

<style lang="scss" scoped>
::v-deep .el-button-group > .el-button:not(:last-child) {
  margin-right: -1px;
}
::v-deep .el-button--small {
  padding: 9px 10px !important;
}
::v-deep .iconfont {
  font-size: 10px !important;
}

.antv-x6 {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .container {
    flex: 1;
  }
  .operating {
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 999;
    background-color: #ffffff;
    padding: 10px;
    width: 100%;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    i {
      font-size: 24px;
      cursor: pointer;
      margin: 0 10px;
      color: #515a6e;
      &:hover {
        color: #2d8cf0;
      }
      &.opacity {
        opacity: 0.5;
      }
    }
  }
}
.app-mini {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.app-content {
  flex: 1;
  height: 100% !important;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
/deep/.x6-graph-scroller {
  border: 1px solid #f0f0f0;
  margin-left: -1px;
  width: 100% !important;
  height: 100% !important;
}
</style>
