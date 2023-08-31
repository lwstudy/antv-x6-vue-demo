<template>
  <div class="antv-x6">
    <div class="app-mini" ref="minimapContainer"></div>
    <div class="app-content" ref="containerRef"></div>
    <el-button-group key="scale-control" class="operating">
      <slot name="buttonLeft"></slot>
      <el-tooltip class="item" effect="light" content="撤销" placement="bottom">
        <el-button size="small" icon="el-icon-refresh-left" @click="undoFn" />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重做" placement="bottom">
        <el-button size="small" icon="el-icon-refresh-right" @click="redoFn" />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <el-button size="small" icon="el-icon-zoom-in" @click="zoomInFn" />
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <el-button size="small" icon="el-icon-zoom-out" @click="zoomOutFn" />
      </el-tooltip>
      <slot name="buttonRight"></slot>
    </el-button-group>
  </div>
</template>

<script>
import { Graph, FunctionExt } from '@antv/x6'
import { CircularLayout, ForceLayout, GridLayout, DagreLayout } from '@antv/layout'


export default {
  data() {
    return {
      graph: null,
      data: [],
      circularLayout: null,
      dagreLayout: null,
      gridLayout: null,
      forceLayout: null
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const containerRef = this.$refs.containerRef
      const minimapContainer = this.$refs.minimapContainer
      const graph = new Graph({
        container: containerRef,
        history: true, // 启动历史记录
        background: {
          color: '#ffffff'
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
          type: 'doubleMesh',
          args: [
            {
              color: '#eee', // 主网格线颜色
              thickness: 1 // 主网格线宽度
            },
            {
              color: '#ddd', // 次网格线颜色
              thickness: 1, // 次网格线宽度
              factor: 4 // 主次网格线间隔
            }
          ]
        },
        selecting: { // 选择与框选
          enabled: true,
          rubberband: true,
          movable: true,
          strict: true,
          showNodeSelectionBox: true, // 显示节点的选择框（才能进行移动）
          modifiers: ['alt']
        },
        minimap: {
          enabled: true,
          container: minimapContainer
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          // modifiers: ['ctrl', 'meta'], // +按键为缩放
          minScale: 0.5,
          maxScale: 2
        }
      })
      this.graph = graph
      /**
       * 布局设置
       */
      const circularLayout = new CircularLayout({
        type: 'circular',
        center: [350, 250]
      })
      const gridLayout = new GridLayout({
        type: 'grid',
        width: 738,
        height: 360,
        sortBy: 'label',
        rows: 3,
        cols: 7
      })
      const forceLayout = new ForceLayout({
        type: 'force',
        center: [369, 180],
        preventOverlap: true
      })
      const dagreLayout = new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UR',
        ranksep: 35,
        nodesep: 15
      })
      this.circularLayout = circularLayout
      this.dagreLayout = dagreLayout
      this.gridLayout = gridLayout
      this.forceLayout = forceLayout

      // 节点鼠标点击
      graph.on('node:click', FunctionExt.debounce(({ e, node }) => {
        console.log('click', node);
        const data = node.store.data
        // const data = this.loadData(node)
        // console.log('data', data);
        // const a = dagreLayout.layout(data)

        // graph.fromJSON(a)
        this.$emit('nodeClick', e, data)
      }),
        500
      )
      this.$emit('init')

    },
    formatNode(e) {
      const { id, label, fill, value, rank, ...other } = e
      return {
        id,
        shape: 'circle',
        width: 40,
        height: 40,
        value,
        label,
        rank,
        other,
        attrs: {
          body: {
            fill,
            stroke: 'transparent'
          }
        }
      }
    },
    formatEdge(e) {
      const {source, target} = e
      return {
          source,
          target,
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: null
            }
          }
        }
    },
    loadData(source) {
      for (let i = 1; i < 10; i++) {
        this.data.nodes.push({
          id: `${i}`,
          shape: 'circle',
          width: 40,
          height: 40,
          label: `${i}`,
          value: `${i}`,
          attrs: {
            body: {
              fill: '#5F95FF',
              stroke: 'transparent'
            }
          }
        })
        this.data.edges.push({
          source: `${source.id}`,
          target: `${i}`,
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: null
            }
          }
        })
      }
      console.log('load', this.data);

      return this.data

    },
    // 放大
    zoomInFn() {
      this.graph.zoom(0.1)
      this.canZoomOut = true
    },
    // 缩小
    zoomOutFn() {
      if (!this.canZoomOut) return
      const Num = Number(this.graph.zoom().toFixed(1))

      if (Num > 0.1) {
        this.graph.zoom(-0.1)
      } else {
        this.canZoomOut = false
      }
    },
    addTable() {
      console.log('addTable');
      this.$emit('add')
    },
    // 重做
    redoFn() {
      if (!this.canRedo) return
      this.graph.history.redo()
    },
    // 撤消
    undoFn() {
      if (!this.canUndo) return
      this.graph.history.undo()
    },
    // 清空
    clearFn() {
      this.graph.clearCells()
    }

  }
}
</script>


<style lang="scss" scoped>
.antv-x6 {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .node-c {
    width: 200px;
    border-right: 1px solid #eee;
    padding: 20px;
    dl {
      margin-bottom: 20px;
      line-height: 30px;
      display: flex;
      cursor: move;
      dt {
        &.circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          &.start {
            border: 1px solid green;
            background: greenyellow;
          }
          &.end {
            border: 1px solid salmon;
            background: red;
          }
        }
        &.rect {
          width: 30px;
          height: 30px;
          border: 1px solid #ccc;
        }
      }
      dd {
        font-size: bold;
        font-size: 14px;
        padding: 0 0 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .template-c {
    padding: 10px 0;
    li {
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #dcdfe6;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      span {
        flex: 1;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        font-size: 14px;
        color: #2d8cf0;
        width: 20px;
        line-height: 40px;
      }
    }
  }
  .container {
    flex: 1;
  }
  .operating {
    position: absolute;
    z-index: 999;
    background-color: #ffffff;
    padding: 10px;
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
.content {
  font-family: sans-serif;
  display: flex;
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
  height: 520px;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
/deep/.x6-graph-scroller {
  height: 100% !important;
  width: 100% !important;
  border: 1px solid #f0f0f0;
  margin-left: -1px;
}
</style>
