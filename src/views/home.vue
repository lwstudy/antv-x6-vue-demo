<template>
  <div class="antv-x6">
    <div class="node-c">
      <dl @mousedown="startDragToGraph('startNode', $event)">
        <dt class="circle start"></dt>
        <dd>开始节点</dd>
      </dl>
      <dl @mousedown="startDragToGraph('endNode', $event)">
        <dt class="circle end"></dt>
        <dd>结束节点</dd>
      </dl>
      <dl @mousedown="startDragToGraph('taskNode', $event)">
        <dt class="rect end"></dt>
        <dd>任务节点</dd>
      </dl>
      <dl>
        <el-button @click="getData">获取数据</el-button>
      </dl>
      <el-divider></el-divider>
      <div>
        <b>模板列表</b>
      </div>
      <div class="template-c">
        <ul>
          <li
            v-for="item in templateLists"
            :key="item.name">
            <span>{{item.name}}</span>
            <i class="el-icon-plus" title="添加" @click="addTemplateNode(item)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
    <div class="operating">
      <el-tooltip class="item" effect="light" content="撤销" placement="bottom">
        <i class="el-icon-refresh-left" :class="{opacity: !canUndo}" @click="undoFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重做" placement="bottom">
        <i class="el-icon-refresh-right" :class="{opacity: !canRedo}" @click="redoFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="zoomInFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <i class="el-icon-zoom-out" :class="{opacity: !canZoomOut}" @click="zoomOutFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="导出PNG" placement="bottom">
        <i class="el-icon-picture-outline" @click="exportPNGFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重置" placement="bottom">
        <i class="el-icon-full-screen" @click="resetFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="清除" placement="bottom">
        <i class="el-icon-delete" @click="clearFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="保存" placement="bottom">
        <i class="el-icon-document-add" @click="saveFn"></i>
      </el-tooltip>
    </div>
    <right-drawer v-if="showRight" @updateVisable="updateVisableFn" :node-data="filterFn(nodeData)" :select-cell="selectCell"></right-drawer>
  </div>
</template>

<script>
import '@antv/x6-vue-shape'
import { Graph, Shape, FunctionExt, Addon } from '@antv/x6'
import { ports } from './graph/methods'
import StartNode from '@/components/StartNode'
import EndNode from '@/components/EndNode'
import TaskNode from '@/components/TaskNode'
import RightDrawer from '@/components/RightDrawer'
import * as htmlToImage from 'html-to-image';
import {downloadByData} from '$ui/utils/download'
export default {
  components: {
    RightDrawer
  },
  data() {
    return {
      graph: null,
      selectCell: '',
      canRedo: false,
      canUndo: false,
      canZoomOut: true,
      showRight: false,
      nodeData: [],
      nodeId: '',
      templateLists: []
    }
  },
  mounted() {
    this.initAntvX6()
  },
  methods: {
    initAntvX6() {
      const self = this
      const containerRef = this.$refs.containerRef
      const miniMapContainerRef = this.$refs.miniMapContainerRef
      const graph = new Graph({
        container: containerRef, // 画布的容器
        selecting: true,
        snapline: true, // 对齐线
        history: true, // 启动历史记录
        background: {
          color: '#ffffff'
        },
        // 网格
        grid: {
          size: 10,
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: '#E7E8EA',
              thickness: 1
            },
            {
              color: '#CBCED3',
              thickness: 1,
              factor: 5
            }
          ]
        },
        // Scroller 使画布具备滚动、平移、居中、缩放等能力
        scroller: {
          enabled: true,
          // pageVisible: true,
          // pageBreak: true,
          pannable: true
        },
        // Scroller 后可开启小地图
        minimap: {
          enabled: true,
          container: miniMapContainerRef
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
          minScale: 0.5,
          maxScale: 2
        },
        // 节点连接
        connecting: {
          anchor: 'center',
          connectionPoint: 'anchor',
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
          createEdge () {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#1890ff',
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  },
                  strokeDasharray: 0, // 虚线
                  style: {
                    animation: 'ant-line 30s infinite linear'
                  }
                }
              },
              label: {
                text: ''
              },
              connector: 'normal',
              router: {
                name: 'manhattan'
              },
              zIndex: 0
            })
          }
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
      // 注册 vue 组件
      Graph.registerVueComponent('start-node-component', {
        template: '<start-node></start-node>',
        components: {
          StartNode
        }
      }, true)
      Graph.registerVueComponent('end-node-component', {
        template: '<end-node></end-node>',
        components: {
          EndNode
        }
      }, true)
      Graph.registerVueComponent('task-node-component', {
        template: '<task-node :node-data="nodeData"></task-node>',
        data() {
          return {
            nodeData: self.nodeData
          }
        },
        components: {
          TaskNode
        }
      }, true)

      this.graph = graph
      // 清除 history 版本
      this.graph.history.redo()
      this.graph.history.undo()
      // 监听历史版本
      this.graph.history.on('change', () => {
        this.canRedo = this.graph.history.canRedo()
        this.canUndo = this.graph.history.canUndo()
      })
      // 是否显示右则菜单
      this.graph.on('blank:click', () => {
        this.nodeId = ''
        this.showRight = false
      })
      // 节点点击
      this.graph.on('node:click', ({ node }) => {
        const data = node.store.data
        const { type, id } = data

        if (type === 'taskNode') {
          this.nodeId = id
          this.showRight = true
        } else {
          this.nodeId = ''
          this.showRight = false
        }
      })
      // 节点鼠标移入
      this.graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
          // 添加连接点
          const ports = containerRef.querySelectorAll('.x6-port-body')
          this.showPorts(ports, true)

          // 添加删除
          const type = node.store.data.type
          const x = type === 'taskNode' ? 300 : 60
          node.addTools({
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: x, y: 10 }
            }
          })
        }),
        500
      )
      // 节点鼠标移出
      this.graph.on('node:mouseleave', ({ node }) => {
        // 添加连接点
        const ports = containerRef.querySelectorAll('.x6-port-body')
        this.showPorts(ports, false)

        // 移除删除
        node.removeTools()
      })
      // 连接线鼠标移入
      this.graph.on('edge:mouseenter', ({ edge }) => {
        edge.addTools([
          'source-arrowhead',
          'target-arrowhead',
          {
            name: 'button-remove',
            args: {
              distance: -30
            }
          }
        ])
      })
      // 连接线鼠标移出
      this.graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
      })
      // cell 节点时才触发
      this.graph.on('node:added', ({ node }) => {
        const data = node.store.data

        if (data.type === 'taskNode') {
          const obj = {
            id: data.id,
            name: '任务节点',
            desc: '节点内容'
          }
          this.nodeData.push(obj)
        }
      })
      this.graph.on('node:removed', ({ node }) => {
        const data = node.store.data

        if (data.type === 'taskNode') {
          const posIndex = this.nodeData.findIndex((item) => item.id === data.id)
          this.nodeData.splice(posIndex, 1)
        }
      })
      this.graph.on('selection:changed', (args) => {
        args.added.forEach(cell => {
          console.log(cell)
          this.selectCell = cell
        })
      })
    },
    // 显示连线节点
    showPorts (ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    // 拖拽节点新增
    startDragToGraph(type, e) {
      const graph = this.graph
      let node = null
      this.showRight = false
      this.nodeId = ''

      // 验证 startNode endNode 是否已存在，只能添加一个
      if (['startNode', 'endNode'].includes(type)) {
        const graphData = this.graph.toJSON()
        const posIndex = graphData.cells.findIndex((item) => item.type === type)

        if (posIndex >= 0) return
      }

      switch(type) {
        case 'startNode':
          node = graph.createNode({
            type: 'startNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 60,
            height: 60,
            ports,
            component: 'start-node-component'
          })
          break
        case 'endNode':
          node = graph.createNode({
            type: 'endNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 60,
            height: 60,
            ports,
            component: 'end-node-component'
          })
          break
        case 'taskNode':
          node = graph.createNode({
            type: 'taskNode',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 300,
            height: 121,
            ports,
            data: {
              name: '任务节点',
              desc: '节点内容'
            },
            component: 'task-node-component'
          })
          break
      }

      const dnd = new Addon.Dnd({ target: graph })
      dnd.start(node, e)
    },
    // 添加模板
    addTemplateNode(templateData) {
      const graph = this.graph
      const { data } = JSON.parse(JSON.stringify(templateData))
      const createLists = {}

      if (data.cells && Array.isArray(data.cells) && data.cells.length > 0) {
        // 新增节点
        const nodeList = data.cells.filter(item => item.shape === 'vue-shape')
        nodeList.forEach(item => {
          const id = item.id
          delete item.id
          delete item.zIndex
          item.shape = 'base64'
          item.ports = ports
          const node = graph.addNode(item)
          createLists[id] = { ...node }
        })
        // 新增边
        const edgeList = data.cells.filter(item => item.shape === 'edge')
        edgeList.forEach(item => {
          delete item.id
          delete item.zIndex
          item.source = {
            ...item.source,
            cell: createLists[item.source.cell].id
          }
          item.target = {
            ...item.target,
            cell: createLists[item.target.cell].id
          }
          graph.addEdge(item)
        })
      }
    },
    // 获取数据
    getData() {
      console.log(this.nodeData)
      console.log(this.graph)
      console.log(this.graph.toJSON())
    },
    // 更新 RightDrawer visable
    updateVisableFn(val) {
      this.nodeData.taskId = ''
      this.showRight = val
    },
    // 过滤任务节点数据
    filterFn(data) {
      const nodeId = this.nodeId
      let result = {}

      if (nodeId && data.length > 0) {
        const posIndex = data.findIndex(item => item.id === nodeId)
        if (posIndex >= 0) {
          result = data[posIndex]
        }
      }

      return result
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

      if(Num > 0.1) {
        this.graph.zoom(-0.1)
      } else {
        this.canZoomOut = false
      }
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
    // 重置
    resetFn() {
      this.graph.centerContent()
      this.graph.zoom(0)
    },
    // 清除
    clearFn() {
      this.graph.clearCells()
    },
    // 保存模板文件
    saveFn() {
      const data = this.graph.toJSON()
      const len = this.templateLists.length
      this.templateLists.push({
        name: `模板${len + 1}`,
        data
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
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
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
      border-bottom: 1px solid #DCDFE6;
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
        opacity: .5;
      }
    }
  }
}
.mini-map-container {
  position: fixed;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}
</style>
