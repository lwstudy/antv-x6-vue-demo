<template>
  <div class="antv-x6">
    <div class="app-mini" ref="minimapContainer"></div>
    <div class="app-content" ref="containerRef">
    </div>
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
import { CircularLayout } from '@antv/layout'
import NodeCircle from '@/components/NodeCircle'
import * as htmlToImage from 'html-to-image';
import { downloadByData } from '$ui/utils/download'

export default {
  name: 'circular',
  mounted () {
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
          nodes: []
        }
        for (let i = 1; i <= 16; i++) {
          data.nodes.push({
            id: `${i}`,
            type: 'nodeCircle',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 30,
            height: 30,
            data: {
              baseColor: i > 10 ? 'red' : 'green',
              color: i > 10 ? 'red' : 'green',
              text: `${i}`,
              size: 'small',
              toolTip: true,
              highlight: 'yellow'
            },
            component: 'node-circle-component'
          })
        }
        this.data = data

        const containerRef = this.$refs.containerRef
            const graph = new Graph({
            container: containerRef
        })
        /**
         * 布局设置
         */
        const circularLayout = new CircularLayout({
          type: 'circular',
          center: [350, 250]
        })
        const model = circularLayout.layout(this.data)

        graph.fromJSON(model)

      // 节点鼠标移入
      graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
          const data = Object.assign(node.data, {size: 'xx-large', color: node.data.highlight})
          node.setData(data, { overwrite: true })
        }),
        500
      )
      // 节点鼠标移出
      graph.on('node:mouseleave', FunctionExt.debounce(({ node }) => {
          const data = Object.assign(node.data, {size: 'small', color: node.data.baseColor})
          node.setData(data, { overwrite: true })
        }),
        500
      )

      // 节点鼠标点击
      graph.on('node:click', FunctionExt.debounce(({ node }) => {
        console.log('click', node);
          this.data.nodes.push({
            id: (new Date()).getTime(),
            type: 'nodeCircle',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 30,
            height: 30,
            data: {
              color: 'green',
              text: `${(new Date()).getTime()}`,
              size: 'small',
              toolTip: true
            },
            component: 'node-circle-component'
          })
          const a = circularLayout.layout(this.data)

          graph.fromJSON(a)
        }),
        500
      )

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
