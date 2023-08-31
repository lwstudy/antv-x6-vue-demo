<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer">
    </div>
    <div class="app-content" ref="containerRef">
    </div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import { CircularLayout } from '@antv/layout'


export default {
  name: 'circular',
  mounted () {
    this.init();
  },
  methods: {
    init() {
        const data = {
          nodes: []
        }
        for (let i = 1; i <= 16; i++) {
          data.nodes.push({
            id: `${i}`,
            shape: 'circle',
            width: 30,
            height: 30,
            label: `${i}`,
            attrs: {
              body: {
                stroke: 'transparent',
                fill: '#5F95FF'
              },
              label: {
                fill: '#fff'
              }
            }
          })
        }

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
        console.log('lay', data);
        const model = circularLayout.layout(data)

        graph.fromJSON(model)

    }

  }
}
</script>


<style scoped>

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
