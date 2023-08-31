<template>
  <div class="antv-x6">
    <div class="app-stencil" id="stencilContainer" ref="stencilContainer"></div>
    <div class="app-content" ref="containerRef"></div>
    <div class="operating">
      <el-tooltip class="item" effect="light" content="撤销" placement="bottom">
        <i
          class="el-icon-refresh-left"
          :class="{ opacity: !canUndo }"
          @click="undoFn"
        ></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重做" placement="bottom">
        <i
          class="el-icon-refresh-right"
          :class="{ opacity: !canRedo }"
          @click="redoFn"
        ></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="放大" placement="bottom">
        <i class="el-icon-zoom-in" @click="zoomInFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="缩小" placement="bottom">
        <i
          class="el-icon-zoom-out"
          :class="{ opacity: !canZoomOut }"
          @click="zoomOutFn"
        ></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="重置" placement="bottom">
        <i class="el-icon-full-screen" @click="resetFn"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="清除" placement="bottom">
        <i class="el-icon-delete" @click="clearFn"></i>
      </el-tooltip>
      <span id="sp123">123</span>
      <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">hover 激活</el-button>
      </el-popover>
    </div>
    <el-tooltip content="xxx" value popper-class="tooltip-widget">
      <span style="position: relative; left: -1000px; top: -1000px" />
    </el-tooltip>
  </div>
</template>

<script>
import Vue from 'vue'
import { Graph, Shape, FunctionExt } from '@antv/x6'
import ErJson from '../data/er.json'
import { cloneDeep, random } from '$ui/utils/util'

const LINE_HEIGHT = 24
const NODE_WIDTH = 150
const defaultTableStyle = {
  id: '',
  label: '',
  ports: [],
  height: 24,
  width: 150,
  shape: 'er-rect',
  position: {
    x: '',
    y: ''
  }
}

const defalitColumnsStyle = {
  id: '',
  group: 'column',
  attrs: {
    columnCode: { text: '' },
    dataType: { text: '' },
    primaryKey: {}
  }
}
export default {
  name: 'er',
  data() {
    return {
      graph: null,
      data: [],
      selectCell: '',
      canRedo: false,
      canUndo: false,
      canZoomOut: true,
      showRight: false
    }
  },
  mounted() {
    this.init();
    this.addTable()
  },
  methods: {
    init() {
      // const that = this
      Graph.registerPortLayout(
        'erPortPosition',
        (portsPositionArgs) => {
          return portsPositionArgs.map((_, index) => {
            return {
              position: {
                x: 0,
                y: (index + 1) * LINE_HEIGHT
              },
              angle: 0
            }
          })
        },
        true
      )
      // 节点注册
      Graph.registerNode(
        'er-rect',
        {
          inherit: 'rect',
          markup: [
            {
              tagName: 'rect',
              selector: 'body'
            },
            {
              tagName: 'text',
              selector: 'label'
            }
          ],
          attrs: {
            rect: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#5F95FF'
            },
            label: {
              fontWeight: 'bold',
              fill: '#ffffff',
              fontSize: 12
            }
          },
          ports: {
            groups: {
              column: {
                markup: [
                  {
                    tagName: 'rect',
                    selector: 'portBody'
                  },
                  {
                    tagName: 'text',
                    selector: 'columnCode'
                  },
                  {
                    tagName: 'text',
                    selector: 'dataType'
                  },
                  {
                    tagName: 'image',
                    selector: 'primaryKey'
                  }
                ],
                attrs: {
                  portBody: {
                    width: NODE_WIDTH,
                    height: LINE_HEIGHT,
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                    magnet: true
                  },
                  columnCode: {
                    ref: 'portBody',
                    refX: 6,
                    refY: 6,
                    fill: '#5F95FF',
                    fontSize: 10,
                    event: 'node:port-contextmenu'
                  },
                  dataType: {
                    ref: 'portBody',
                    refX: 70,
                    refY: 6,
                    fontSize: 10,
                    event: 'node:port-contextmenu'
                  },
                  primaryKey: {
                    ref: 'portBody',
                    width: 16,
                    height: 16,
                    x: 130,
                    y: 0,
                    event: 'node:port-contextmenu'
                  }
                },
                position: 'erPortPosition'
              }
            }
          }
        },
        true
      )
      const containerRef = this.$refs.containerRef
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
        selecting: { // 选择与框选
          enabled: true,
          rubberband: true,
          movable: true,
          strict: true,
          showNodeSelectionBox: true, // 显示节点的选择框（才能进行移动）
          modifiers: ['alt']
        },
        // Scroller 使画布具备滚动、平移、居中、缩放等能力
        scroller: {
          enabled: true,
          pageVisible: true,
          pageBreak: true,
          pannable: true
        },
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'], // +按键为缩放
          minScale: 0.5,
          maxScale: 2
        },
        snapline: true, // 对齐线
        // background: '#f5f5f5', // 背景
        connecting: {
          router: {
            name: 'er',
            args: {
              offset: 25,
              direction: 'H'
            }
          },
          snap: true, // 自动吸附
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2
                }
              }
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
        },
        // onPortRendered(args) {
        //   const ab = '111'
        //   const selectors = args.contentSelectors;
        //   const container = selectors && selectors.portBody;
        //   console.log('onPortRendered', container, typeof container);
        //   if (container && document.getElementById('sp123')) {
        //     new Vue({
        //       el: '#sp123',
        //       data() {
        //         return {
        //           cot: ab
        //         }
        //       },
        //       created() {
        //         console.log('created', this.cot);
        //       },
        //       render: h => {
        //         return (
        //           <el-tooltip
        //           effect='dark'
        //           content='port'
        //           placement='right'
        //         >
        //           <div
        //             class='my-port'
        //             style='width: 100%;height:100%;border: 1px solid #5F95FF;border-radius: 100%;background: #fff;'
        //           />
        //         </el-tooltip>
        //         );
        //       }
        //     });
        //   }
        // }
        // onPortRendered({ contentContainer, port, node }) {
        // TODO:针对dom操作一个tooltip的位置与内容-----过快的移入移除多次，会导致失效
        // console.log('onPortRendered', port.attrs);
        // contentContainer.addEventListener('mouseenter', (e) => {
        //   const tooltip = document.querySelector('.tooltip-widget');
        //   if (tooltip) {
        //     tooltip.innerHTML = 'this is tooltip'
        //     setTimeout(() => {
        //       tooltip.style.left = `${e.clientX - tooltip.offsetWidth / 2 + 5
        //         }px`;
        //       tooltip.style.top = `${e.clientY}px`;
        //     }, 20);
        //   }
        // });
        // contentContainer.addEventListener('mouseleave', () => {
        //   setTimeout(() => {
        //     const tooltip = document.querySelector('.tooltip-widget');
        //     if (tooltip) {
        //       tooltip.style.left = '-1000px';
        //       tooltip.style.top = '-1000px';
        //     }
        //   }, 30);
        // });
      // }
      })
      // console.log('ErJson', ErJson, typeof ErJson);
      this.data = ErJson
      const cells = []
      ErJson.forEach((item) => {
        if (item.shape === 'edge') {
          cells.push(graph.createEdge(item))
        } else {
          cells.push(graph.createNode(item))
        }
      })
      // console.log('cells', cells);

      graph.resetCells(cells)
      graph.zoomToFit({ padding: 10, maxScale: 1 })
      this.graph = graph
      // 清除 history 版本
      // this.graph.history.redo()
      // this.graph.history.undo()
      // 监听历史版本
      // this.graph.history.on('change', () => {
      //   this.canRedo = this.graph.history.canRedo()
      //   this.canUndo = this.graph.history.canUndo()
      // })
      this.loadEvents(containerRef)
    },
    loadEvents(containerRef) {
      // 节点双击
      this.graph.on('node:dblclick', ({ node }) => {
        const data = node.store.data
        const { type, id } = data
        alert('节点双击')
        console.log('node:dbclick', node);
        if (type === 'taskNode') {
          this.nodeId = id
          this.showRight = true
        } else {
          this.nodeId = ''
          this.showRight = false
        }
      })
      // 连线双击
      this.graph.on('edge:dblclick', ({ edge }) => {
        const data = edge.store.data
        const { type, id } = data
        alert('连线双击')
        console.log('edge:dbclick', edge);
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
        // console.log('鼠标移入', node);
        // node.attr('body/stroke', 'red')
        // 添加删除
        node.addTools({
          name: 'button-remove',
          args: {
            x: 0,
            y: 0,
            offset: { x: 140, y: 10 }
          }
        })
      }),
        500
      )
      this.graph.on('node:port-contextmenu', ({ e }) => {
        console.log('ports', e, e.currentTarget.parentElement.getAttribute('port'))
      })
      // 连接线鼠标移入
      this.graph.on('edge:mouseenter', ({ edge }) => {
        edge.addTools([
          'source-arrowhead',
          'target-arrowhead',
          {
            name: 'button-remove',
            args: {
              distance: '50%'
            }
          }
        ])
      })
      // 节点鼠标移出
      this.graph.on('node:mouseleave', ({ node }) => {
        // 移除删除
        node.removeTools()
      })
      this.graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
      })
      this.graph.on('edge:connected', ({ isNew, edge }) => {
        console.log('connected', edge.source, edge.target);
        if (isNew) {
          // 对新创建的边进行插入数据库等持久化操作
        }
      })
    },
    addTable() {
      const nodes = []
      for (let index = 0; index < 1500; index++) {
        const table = { id: `t${index}`, label: `test${index}` }
        const node = Object.assign(cloneDeep(defaultTableStyle), table)
        // console.log('for-',index, node)
        node.position.x = random(0, index*10)
        node.position.y = random(0, index*10)

        const columns = [{ id: `t${index}`+'c1', columnCode: `t${index}`+'id', dataType: 'int', primaryKey: true }, { id: `t${index}`+'c2', columnCode: `t${index}`+'name', dataType: 'varchar', primaryKey: false }]

        columns.forEach(e => {
          const item = cloneDeep(defalitColumnsStyle)
          item.id = e.id
          item.attrs.columnCode.text = e.columnCode
          item.attrs.dataType.text = e.dataType
          item.attrs.primaryKey['xlink:href'] = e.primaryKey ? 'https://antv-x6.gitee.io/icons/icon-144x144.png' : ''
          node.ports.push(item)
        });
        nodes.push(node)
      }
      console.log('nodes', nodes)

      const graph = this.graph
      graph.addNodes(nodes)
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
    }

  }
  // beforeDestroy() {
  //   this.graph.dispose()
  // }
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
