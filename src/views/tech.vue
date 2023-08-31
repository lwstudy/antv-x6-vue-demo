<template>
  <div class="antv-x6">
    <div class="app-mini" ref="minimapContainer"></div>
    <div class="container" ref="containerRef"></div>
    <div class="operating">
      <el-tooltip
        class="item"
        effect="light"
        content="导出PNG"
        placement="bottom"
      >
        <i class="el-icon-picture-outline" @click="exportPNGFn"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { Graph, FunctionExt } from '@antv/x6'
import { CircularLayout, ForceLayout, GridLayout, DagreLayout } from '@antv/layout'
import NodeCircle from '@/components/NodeCircle'
import * as htmlToImage from 'html-to-image';
import { downloadByData } from '$ui/utils/download'

export default {
  name: 'tech',
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
      // 注册 vue 组件
      Graph.registerVueComponent('node-circle-component', {
        template: '<node-circle :color="color"></node-circle>',
        data() {
          return {
            color: self.nodeData
          }
        },
        components: {
          NodeCircle
        }
      }, true)
      const data = {
        nodes: [],
        edges: []
      }
      data.nodes.push({
        id: '0',
        type: 'nodeCircle',
        shape: 'vue-shape',
        x: 300,
        y: 300,
        width: 30,
        height: 30,
        data: {
          baseColor: 'black',
          color: 'black',
          text: '0',
          size: 'small',
          toolTip: true,
          highlight: 'yellow'
        },
        component: 'node-circle-component'
      })
      this.data = data

      const containerRef = this.$refs.containerRef
      const minimapContainer = this.$refs.minimapContainer
      const graph = new Graph({
        container: containerRef,
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
        },
        // 高亮
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: '#6a6c8a'
              }
            }
          }
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
      graph.fromJSON(this.data)

      // 节点鼠标移入
      graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
        const data = Object.assign(node.data, { size: 'xx-large', color: node.data.highlight })
        node.setData(data, { overwrite: true })
      }),
        500
      )
      // 节点鼠标移出
      graph.on('node:mouseleave', FunctionExt.debounce(({ node }) => {
        const data = Object.assign(node.data, { size: 'small', color: node.data.baseColor })
        node.setData(data, { overwrite: true })
      }),
        500
      )

      // 节点鼠标点击
      graph.on('node:click', FunctionExt.debounce(({ node }) => {
        const data = this.loadData(node)
        const a = dagreLayout.layout(data)

        graph.fromJSON(a)
      }),
        500
      )

    },
    graphLayout(layouts) {
      // 各种布局
      const a = layouts.layout(this.data)
      this.graph.fromJSON(a)
    },
    loadData(source) {
      for (let i = 1; i < 10; i++) {
        this.data.nodes.push({
          id: `${i}`,
          width: 30,
          height: 30,
          type: 'nodeCircle',
          shape: 'vue-shape',
          data: {
            baseColor: 'green',
            color: 'green',
            text: `${Math.random() * (new Date())}`,
            size: 'small',
            toolTip: true,
            highlight: 'yellow'
          },
          component: 'node-circle-component'
        })
        this.data.edges.push({
          source: `${source.id}`,
          target: `${i}`
        })
      }

      return this.data

    },
    // 导出PNG
    exportPNGFn() {
      this.$nextTick(() => {
        const el = document.getElementsByClassName('x6-graph-svg')[1]
        htmlToImage.toPng(el).then(function (dataUrl) {
          console.log('dataUrl', el, dataUrl);
          downloadByData(null, 'my-node.png', dataUrl);
        })
      })

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
    position: fixed;
    top: 0;
    left: 241px;
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

.app-stencil {
  width: 250px;
  border: 1px solid #f0f0f0;
  position: relative;
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

.x6-graph-scroller {
  border: 1px solid #f0f0f0;
  margin-left: -1px;
}
</style>
